const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');


function leerCredenciales() {
    try {
      // Leer el contenido del archivo
      const credencialesJson = fs.readFileSync('./credenciales-calendar.json', 'utf8');
      
      // Parsear el contenido JSON a un objeto JavaScript
      const credenciales = JSON.parse(credencialesJson);
      return credenciales;
    } catch (error) {
      console.error('Error al leer las credenciales:', error);
      return null;
    }
  }

  const credenciales = leerCredenciales();
  if (!credenciales) {
    console.error('No se pudieron leer las credenciales.');
    return;
  }
  
  // Crea un cliente de autenticación OAuth2 con las credenciales del archivo JSON
  const auth = new google.auth.OAuth2({
    clientId: credenciales.client_id,
    clientSecret: credenciales.client_secret,
    redirectUri: credenciales.redirect_uris[0], // Si tienes múltiples URI de redireccionamiento, elige el primero
  });
  
  
  // Crea una instancia de la API de Google Calendar
  const calendar = google.calendar({ version: 'v3', auth });


  // Obtiene los eventos del calendario
calendar.events.list({
    calendarId: 'comgobceres@gmail.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.error('Error al obtener eventos:', err);
    const events = res.data.items;
    if (events.length) {
      console.log('Próximos eventos:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No se encontraron eventos.');
    }
  });

  module.exports = calendar;