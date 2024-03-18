const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
require('dotenv').config();
const RESPONSES_SHEET_ID = process.env.RESPONSES_SHEET_ID
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'));
const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')

const {
    startInactividad,
    resetInactividad,
    stopInactividad,
    flowInactividad,
  } = require('../idleCasero'); 

let errores = 0;

let STATUS = {}

const flowCrearReclamo = addKeyword('Quiero hacer un reclamo')
.addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, 80000); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  }) 
.addAnswer(['Contame, ¿Que tipo de Reclamo es?\n',
'1. 👉 Higiene urbana 🗑',
'2. 👉 Árboles 🌳',
'3. 👉 Arreglos 🚧',
'4. 👉 Consultar mi reclamo',

'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
'\nPara volver atrás escribí la palabra *Menú*'
])

.addAction( { capture: true }, async (ctx, { flowDynamic, gotoFlow })=>{
    console.log(option)
const option = ctx.body.toLowerCase().trim();
telefono = ctx.from;
if (!["1", "2", "3", "4", "menu", "menú"].includes(opcion)) {
    errores++;
    resetInactividad(ctx, gotoFlow, 90000)
    if (errores > 2 )
    {
        stopInactividad(ctx)
        return gotoFlow(require('./flowAyuda'));
    }
    await flowDynamic('⚠️ Opción no encontrada, por favor seleccione una opción válida.');
    await gotoFlow(flowCrearReclamo);
    return;
}
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
    case '4': {
         stopInactividad(ctx)
        return gotoFlow(require('./flowConsultar'))
    }
}                     
console.log(STATUS[telefono])
                                                           // Ejemplo // NOMBRE VARIABLE = TATUS[telefono], NOMBRE VARIABLE : ctx.body

// flowDynamic()
})
.addAnswer(
'¿Podes decirme donde está ubicado?',
{capture:true},
async (ctx,{flowDynamic}) =>{
   
telefono = ctx.from
ubicacion = STATUS[telefono] = {...STATUS[telefono], ubicacion : ctx.body}
nombre = STATUS[telefono] = {...STATUS[telefono], nombre : ctx.pushName}
flowDynamic()
})
.addAnswer(
'¿Podes especificarme en que barrio se encuentra?',
{capture:true},
async (ctx,{flowDynamic}) =>{


telefono = ctx.from
barrio = STATUS[telefono] = {...STATUS[telefono], barrio : ctx.body}      //Variable del STATUS
flowDynamic()
           //Variable del STATUS
/////////////////////       ESTA FUNCION AÑADE UNA FILA A SHEETS    /////////////////////////
   ingresarDatos();  
   async function ingresarDatos(){
    console.log(STATUS[telefono].sexo)
    let rows = [{
   // Ejemplo: // CABECERA DE SHEET : VARIABLE        //                             ➡️   Paso 3 - Aquí añades las variables creadas
    Nombre: STATUS[telefono].nombre,
    Reclamo: STATUS[telefono].reclamo,    
    Ubicacion: STATUS[telefono].ubicacion,
    Barrio: STATUS[telefono].barrio,
    Telefono: STATUS[telefono].telefono,
    Estado: 'PENDIENTE'
   
        }];
   
    await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByIndex[0];
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            await sheet.addRow(row);}
}

await flowDynamic (['Perfecto, espero que te haya parecido sencillo el formulario 😁', 
                    'Podes consultar el estado de tu reclamo escribiendo *Consultar mis datos*'])
return gotoFlow((require("./flowLlamarMenu")))
});

module.exports = flowCrearReclamo;