require('dotenv').config();
const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')
const adapterDB = require('../database/database')


const { flowInactividad, startInactividad, resetInactividad, stopInactividad,
} = require("./idleCasero"); 

let errores = 0;

let STATUS = {}

const flowCrearReclamo = addKeyword('console')
.addAction(async (ctx, { gotoFlow }) => {

    adapterDB.contadorFlujos(11) // reclamo
        .then(() => {
            console.log('Contador del flujo incrementado correctamente');
        })
        .catch((error) => {
            console.error('Error al incrementar el contador del flujo:', error);
        });
    startInactividad(ctx, gotoFlow, 300000)
  })  
.addAnswer(['Contame, ¿Que tipo de Reclamo es?\n',
'1. 👉 Higiene urbana 🗑',
'2. 👉 Árboles 🌳',
'3. 👉 Arreglos 🚧',
'4. 👉 Consultar solicitud',

'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
],
{capture:true},
async (ctx,{flowDynamic, gotoFlow}) =>{
telefono = ctx.from
const option = ctx.body.toLowerCase().trim();

if (!["1", "2", "3", "4"].includes(option)) {
    resetInactividad(ctx, gotoFlow, 300000); // ⬅️⬅️⬅️  REINICIAMOS LA CUENTA ATRÁS
    await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

    await fallBack();
    errores++;

if (errores > 2 )
{
    stopInactividad(ctx)
    return gotoFlow(flowAyuda);

}
    return;
}
stopInactividad(ctx)
switch (option)
{
    case '1': reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : 'Higiene Urbana'}                //➡️ Variable del STATUS
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
    break;
    case '2': reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : 'Arboles'}                //➡️ Variable del STATUS
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
    break;
    case '3': reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : 'Arreglos'}                //➡️ Variable del STATUS
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
    break;
    case '4': return gotoFlow(require('./reclamos/flowConsultar'))
}                     
console.log(STATUS[telefono])
                                                           // Ejemplo // NOMBRE VARIABLE = TATUS[telefono], NOMBRE VARIABLE : ctx.body
flowDynamic()
})
.addAnswer(
'¿Podes decirme donde está ubicado?',
{capture:true},
async (ctx,{flowDynamic, gotoFlow}) =>{
resetInactividad(ctx, gotoFlow, 300000); // ⬅️⬅️⬅️  REINICIAMOS LA CUENTA ATRÁS
telefono = ctx.from
ubicacion = STATUS[telefono] = {...STATUS[telefono], ubicacion : ctx.body}
nombre = STATUS[telefono] = {...STATUS[telefono], nombre : ctx.pushName}
flowDynamic()
})
.addAnswer(
'¿Podes especificarme en que barrio se encuentra?',
{capture:true},
async (ctx,{flowDynamic, gotoFlow, addAction, provider}) =>{


telefono = ctx.from
barrio = STATUS[telefono] = {...STATUS[telefono], barrio : ctx.body}      //Variable del STATUS
flowDynamic()
})
.addAnswer(
    'Por ultimo, ¿Podes darme mas detalles sobre el reclamo?',
    {capture:true},
    async (ctx,{flowDynamic, gotoFlow, addAction, provider}) =>{
    
    
    telefono = ctx.from
    detalle = STATUS[telefono] = {...STATUS[telefono], detalle : ctx.body}      //Variable del STATUS
    flowDynamic()
try {
    await adapterDB.ingresarDatos({
        fecha: new Date(), // Ejemplo de fecha actual
        nombre: STATUS[telefono].nombre,
        reclamo: STATUS[telefono].reclamo,
        ubicacion: STATUS[telefono].ubicacion,
        barrio: STATUS[telefono].barrio,
        telefono: telefono, // Puedes obtener el teléfono del contexto
        estado: 'PENDIENTE',
        detalle: STATUS[telefono].detalle,
    });
    console.log('Datos de reclamo ingresados correctamente en la base de datos');
} catch (error) {
    console.error('Error al ingresar los datos del reclamo en la base de datos:', error);
}

const sock = await provider.getInstance();
const msgPoll = {
sticker: {
url:
"./media/exito.webp"
}
};
sock.sendMessage(ctx.key.remoteJid, msgPoll)

await flowDynamic (['Perfecto, espero que te haya parecido sencillo el formulario 😁', 
                    'Podes consultar el estado de tu reclamo en el menú de Reclamos.'], {delay:4000})
                    stopInactividad(ctx)
                    return gotoFlow((require("./flowLlamarMenu")))             
}

);




module.exports = flowCrearReclamo;