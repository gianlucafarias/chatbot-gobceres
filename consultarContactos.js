const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
const RESPONSES_SHEET_ID = '1eqgDBQtHqHmZcBF7IzK7-GgOQBSMBlmI9ZR667v4UF8'; //Aquí pondras el ID de tu hoja de Sheets
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'));
const moment = require('moment');  // Importar la biblioteca moment

const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')


async function cargarHoja() {
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    await doc.loadInfo();
}

function obtenerFechaHoraActual() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

// Buscar nombre y teléfono en la hoja
async function consultarContactos(nombre, telefono) {
    await cargarHoja();
    let sheet = doc.sheetsByTitle['Usuarios']
    let rows = await sheet.getRows();

    let consultados = {};

    // Buscar coincidencias en la columna Telefono
    const coincidencia = rows.find(row => row.Telefono === telefono);

    if (!coincidencia) {
        // Si no hay coincidencia, agregar una nueva fila
        await sheet.addRow({
            Nombre: nombre,
            Telefono: telefono,
            Registro: obtenerFechaHoraActual()  // Nueva columna para la fecha y hora de registro

        });
        consultados = { Nombre: nombre, Telefono: telefono };
    return false;

    } else {
        // Si hay coincidencia, no hacer nada
        consultados = { Nombre: coincidencia.Nombre, Telefono: coincidencia.Telefono }; 
    }

    return consultados;
}

module.exports = {consultarContactos};