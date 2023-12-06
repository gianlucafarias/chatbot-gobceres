
const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
const RESPONSES_SHEET_ID = '1eqgDBQtHqHmZcBF7IzK7-GgOQBSMBlmI9ZR667v4UF8'; //Aquí pondras el ID de tu hoja de Sheets
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'));
const { addKeyword, addAnswer, gotoFlow } = require("@bot-whatsapp/bot");


let STATUS = {}
const flowCrearReclamo = addKeyword('console')

.addAnswer(['Contame, ¿Que tipo de Reclamo es?\n',
'1. 👉 Higiene urbana 🗑',
'2. 👉 Árboles 🌳',
'3. 👉 Arreglos 🚧',
'4. 👉 Consultar solicitud',

'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
],
{capture:true},
async (ctx,{flowDynamic}) =>{

telefono = ctx.from
const option = ctx.body.toLowerCase().trim();
if (!["1"].includes(option)) {
    reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : 'Higiene Urbana'}                //➡️ Variable del STATUS
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
}
else if (!["2"].includes(option)) {
    reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : 'Arboles'}                //➡️ Variable del STATUS
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
}
else if (!["3"].includes(option)) {
    reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : 'Arreglos'}                //➡️ Variable del STATUS
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
} 
else if (!["4"].includes(option)) {
   return gotoFlow(flowConsultar)
}                                                                                 // Ejemplo // NOMBRE VARIABLE = TATUS[telefono], NOMBRE VARIABLE : ctx.body

flowDynamic()
})
.addAnswer(
'¿Podes decirme donde está ubicado?',
{capture:true},
async (ctx,{flowDynamic}) =>{
   
telefono = ctx.from
ubicacion = STATUS[telefono] = {...STATUS[telefono], ubicacion : ctx.body}
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
});


module.exports = flowCrearReclamo;