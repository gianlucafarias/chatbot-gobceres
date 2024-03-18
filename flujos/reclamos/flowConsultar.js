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

const flowConsultar = addKeyword(['Consultar mis datos','🔍 Consultar mis datos 🔍'])
.addAnswer(['Dame unos segundos, estoy buscando tus datos dentro del sistema... 🔍'],{delay:6000}, async (ctx, {flowDynamic, gotoFlow, provider}) =>{
    const sock = await provider.getInstance();
    const msgPoll = {
    sticker: {
    url:
    "./media/buscando.webp"
    }
    };
    sock.sendMessage(ctx.key.remoteJid, msgPoll)
try {
    telefono = ctx.from

    const consultados = await consultarDatos(telefono)
    const Fecha = consultados['Fecha'] // Fecha y hora en una sola columna
    const Reclamo = consultados['Reclamo']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
    const Ubicacion = consultados['Ubicacion']
    const Barrio = consultados['Barrio']
    const Telefono = consultados['Telefono']
    const Estado = consultados['Estado']
    
    if (Telefono === undefined)
    {
        await flowDynamic(`No encontré solicitudes registradas con tu numero de teléfono.`, {delay:2000})
        return gotoFlow((require("../flowLlamarMenu")))  
    }
    else await flowDynamic(`RECLAMO REALIZADO EL  ${Fecha}\n\n *Reclamo*: ${Reclamo}\n- *Ubicación*: ${Ubicacion}\n- *Barrio*: ${Barrio}\n- *Estado del reclamo*: ${Estado}`)
    if (Estado == 'PENDIENTE')
            {
                await flowDynamic(`El estado de tu solicitud es *PENDIENTE*. Hemos cargado tu reclamo en nuestra base de datos y está pendiente a aprobación. Recordá que completar tu solicitud puede llevar un tiempo.`), {delay:2000}   
                return gotoFlow((require("../flowLlamarMenu")))  
            }
            else if (Estado == 'COMPLETADO')
            {
                await flowDynamic(`El estado de tu solicitud es *COMPLETADO*. Resolvimos tu solicitud.`)
                return gotoFlow((require("../flowLlamarMenu")))  
            }
} catch (error) {
    console.error('Error al manejar el caso de Teléfono indefinido:', error);
    // Puedes manejar el error de la manera que prefieras
}

})
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

module.exports = flowConsultar;