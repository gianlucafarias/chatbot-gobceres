
const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
const RESPONSES_SHEET_ID = '1eqgDBQtHqHmZcBF7IzK7-GgOQBSMBlmI9ZR667v4UF8'; //Aquí pondras el ID de tu hoja de Sheets
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'));
const { addKeyword, addAnswer, gotoFlow } = require("@bot-whatsapp/bot");


let STATUS = {}
telefono = ctx.from

