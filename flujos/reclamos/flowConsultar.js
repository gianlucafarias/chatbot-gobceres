const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')
const { GoogleSpreadsheet } = require('google-spreadsheet')
    const fs = require('fs')
    require('dotenv').config();
    const RESPONSES_SHEET_ID = process.env.RESPONSES_SHEET_ID
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
    const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'));
    const adapterDB = require('../../database/database')
    
    async function consultarDatos(telefono) {
        try {
            const reclamo = await adapterDB.obtenerReclamoPorTelefono(telefono);
            return reclamo;
        } catch (error) {
            console.error('Error al consultar datos:', error);
            throw error;
        }
    }


const flowConsultar = addKeyword(['Consultar mis datos','🔍 Consultar mis datos 🔍'])
.addAnswer(['Dame unos segundos, estoy buscando tus datos dentro del sistema... 🔍'],{delay:2000}, async (ctx, {flowDynamic, gotoFlow, provider}) =>{
    const sock = await provider.getInstance();
    const msgPoll = {
    sticker: {
    url:
    "./media/buscando.webp"
    }
    };
    sock.sendMessage(ctx.key.remoteJid, msgPoll)
    try
        {
            const telefono = ctx.from;
            const reclamo = await consultarDatos(telefono);

            if (!reclamo) {
                await flowDynamic(`No encontré solicitudes registradas con tu número de teléfono.`);
                return gotoFlow((require("../flowLlamarMenu")));
            }

            await flowDynamic(`RECLAMO REALIZADO EL  ${reclamo.fecha}\n\n *Reclamo*: ${reclamo.reclamo}\n- *Ubicación*: ${reclamo.ubicacion}\n- *Barrio*: ${reclamo.barrio}\n- *Estado del reclamo*: ${reclamo.estado}`);

            if (reclamo.estado === 'PENDIENTE') {
                await flowDynamic(`El estado de tu solicitud es *PENDIENTE*. Hemos cargado tu reclamo en nuestra base de datos y está pendiente de aprobación. Recuerda que completar tu solicitud puede llevar un tiempo.`, { delay: 2000 });
            } else if (reclamo.estado === 'COMPLETADO') {
                await flowDynamic(`El estado de tu solicitud es *COMPLETADO*. Hemos resuelto tu solicitud.`);
            }

            return gotoFlow((require("../flowLlamarMenu")));
        } catch (error) {
            console.error('Error al manejar el caso de Teléfono indefinido:', error);
            // Puedes manejar el error de la manera que prefieras
        }
})
/*
/////////////////////       ESTA FUNCION CONSULTA LOS DATOS DE UNA FILA !SEGÚN EL TELÉFONO!    ////////////////////////
async function consultarDatos(telefono){
    try {
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle['Hoja 1'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA  
        consultados = [];
        let rows = await sheet.getRows();
        try {
            for (let index = 0; index < rows.length; index++) {
                const row = rows[index];
                if (row.Telefono === telefono) {
                    consultados['Fecha'] = row.Fecha
                    consultados['Reclamo'] = row.Reclamo                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:
                    consultados['Ubicacion'] = row.Ubicacion        
                    consultados['Barrio'] = row.Barrio                  // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
                    consultados['Telefono'] = row.Telefono
                    consultados['Edad'] = row.Edad
                    consultados['Estado'] = row.Estado
                }
        
        }
        }catch (error) {
            console.error('Error al manejar el caso de Teléfono indefinido:', error);
        }
            
    return consultados
    } catch (error) {
        console.error('Error al consultar datos:', error);
        throw error; // Vuelve a lanzar el error para que pueda ser manejado más arriba
    }
    
};
*/
module.exports = flowConsultar;