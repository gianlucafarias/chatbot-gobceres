const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
const RESPONSES_SHEET_ID = '1eqgDBQtHqHmZcBF7IzK7-GgOQBSMBlmI9ZR667v4UF8'; //Aquí pondras el ID de tu hoja de Sheets
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
let STATUS = {}

const flowCrearTurno = addKeyword('turno')


        .addAnswer(['¿A qué especialidad desea atenderse?\n',
            '1. 👉 Odontología',
            '2. 👉 Ginecología',
            '3. 👉 Médica clínica',
            '4. 👉 Obstetricia',
            '5. 👉 Pediatría',
            '6. 👉 Servicio de enfermería',
            '7. 👉 Volver',


            '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',

            ], { capture: true }, async (ctx, { flowDynamic }) => {
                telefono = ctx.from;
                const option = ctx.body.toLowerCase().trim();
                switch (option)
                {
                    case '1': especialidad = STATUS[telefono] = {...STATUS[telefono], especialidad : 'Odontología'}                //➡️ Variable del STATUS
                    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
                    break;
                    case '2': especialidad = STATUS[telefono] = {...STATUS[telefono], especialidad : 'Ginecología'}                //➡️ Variable del STATUS
                    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
                    break;
                    case '3': especialidad = STATUS[telefono] = {...STATUS[telefono], especialidad : 'Médica clínica'}                //➡️ Variable del STATUS
                    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
                    break;
                    case '4': especialidad = STATUS[telefono] = {...STATUS[telefono], especialidad : 'Obstetricia'}                //➡️ Variable del STATUS
                    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
                    break;
                    case '5': especialidad = STATUS[telefono] = {...STATUS[telefono], especialidad : 'Pediatría'}                //➡️ Variable del STATUS
                    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
                    break;
                    case '6': especialidad = STATUS[telefono] = {...STATUS[telefono], especialidad : 'Servicio de enfermería'}                //➡️ Variable del STATUS
                    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
                    break;
                    case '7': return gotoFlow(flowConsultar)
                }                     
                console.log(STATUS[telefono]) 
                flowDynamic();
        })

        .addAnswer('¿En qué día desea el turno? (Por favor, introduzca la fecha en formato DD/MM/YYYY)', { capture: true }, async (ctx, { flowDynamic }) => {
            telefono = ctx.from;
            cita.fecha = STATUS[telefono] = { ...STATUS[telefono], fecha: ctx.body };
            flowDynamic();
        })
module.exports = flowCrearTurno;