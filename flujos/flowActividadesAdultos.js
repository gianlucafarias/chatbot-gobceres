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
        addAction,
        EVENTS,
        pushName
        
    } = require('@bot-whatsapp/bot')

    const { flowInactividad, startInactividad, resetInactividad, stopInactividad,
    } = require("./idleCasero"); 

    let errores = 0;
    

const flowActividadesAdultos = addKeyword('actividades adultos mayores')   
        .addAnswer('Si querés sumarte a las actividades para adultos mayores, contame cual te interesa y te mando información 👇',
        {delay: 1000}, async (ctx, { provider, gotoFlow } ) => {
        startInactividad(ctx, gotoFlow, 800000); 
            const sock = await provider.getInstance();
            const msgPoll = {
            sticker: {
            url:
            "./media/actividades.webp"
            }
            };
            sock.sendMessage(ctx.key.remoteJid, msgPoll)
            })
        .addAnswer(['1. 👉 Ajedrez ♟️',
                    '2. 👉 Taller Cognitivo "Reactiva" 🧠',
                    '3. 👉 Folclore 💃',
                    '4. 👉 Cuerpo y movimiento 🤸‍♀️',
                    '5. 👉 Tejo 🥏',
                    '6. 👉 Yoga 🧘\n',
                    '7. 👉 Cambiar de tema 🔄'
                ],

                { delay: 3000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic  }) => {
        
                    const opcion = ctx.body.toLowerCase().trim();
        
                    if (!["1", "2", "3", "4", "5", "6", "7"].includes(opcion)) {
                        resetInactividad(ctx, gotoFlow, 90000); // ⬅️⬅️⬅️  REINICIAMOS LA CUENTA ATRÁS
                        await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
                        await gotoFlow(flowActividadesAdultos)
                    //    await fallBack();
                        errores++;
                    
                    if (errores > 2 )
                    {
                        stopInactividad(ctx)
                        return gotoFlow(require('./flowAyuda'));
        
                    }
                   }
                else {
                   try {
                        stopInactividad(ctx)
                        if (opcion === '2'){
                                const consultados = await consultarDatos('2-1')
                                const Opcion = consultados['Opcion']
                                const Actividad = consultados['Actividad'] // Fecha y hora en una sola columna
                                const Dias = consultados['Dias']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
                                const Horario = consultados['Horario']
                                const Ubicacion = consultados['Ubicacion']
                                const Dicta = consultados['Dicta']
                                
                                await flowDynamic(`*${Actividad}*\n📆 ${Dias}\n⌚ ${Horario}\n📍 ${Ubicacion}\nDicta: ${Dicta}`)
                
                                const consultados2 = await consultarDatos('2-2')
                                const Opcion2 = consultados2['Opcion']
                                const Actividad2 = consultados2['Actividad'] // Fecha y hora en una sola columna
                                const Dias2 = consultados2['Dias']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
                                const Horario2 = consultados2['Horario']
                                const Ubicacion2 = consultados2['Ubicacion']
                                const Dicta2 = consultados2['Dicta']
                                
                                await flowDynamic(`*${Actividad2}*\n📆 ${Dias2}\n⌚ ${Horario2}\n📍 ${Ubicacion2}\nDicta: ${Dicta2}`)
                                await flowDynamic('Para participar, agenda día y horario y acercate directamente a la actividad 😊', {delay: 4000})
                                await gotoFlow((require("./flowLlamarMenu")))

                        }
                        else {
                                const consultados = await consultarDatos(opcion)
                                const Opcion = consultados['Opcion']
                                const Actividad = consultados['Actividad'] // Fecha y hora en una sola columna
                                const Dias = consultados['Dias']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
                                const Horario = consultados['Horario']
                                const Ubicacion = consultados['Ubicacion']
                                const Dicta = consultados['Dicta']
                                
                                await flowDynamic(`*${Actividad}*\n📆 ${Dias}\n⌚ ${Horario}\n📍 ${Ubicacion}\nDicta: ${Dicta}`)
                                await flowDynamic('Para participar, agenda día y horario y acercate directamente a la actividad 😊', {delay: 4000})
                                await gotoFlow((require("./flowLlamarMenu")))
                        
                        }
                      
                        
                    } catch (error) {
                        console.error('Error al manejar el caso de Teléfono indefinido:', error);
                        // Puedes manejar el error de la manera que prefieras
                    }
                }})

        async function consultarDatos(opcion){
                try {
                    await doc.useServiceAccountAuth({
                        client_email: CREDENTIALS.client_email,
                        private_key: CREDENTIALS.private_key
                    });
                    await doc.loadInfo();
                    let sheet = doc.sheetsByTitle['Actividades-adultos-mayores'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA  
                    consultados = [];
                    let rows = await sheet.getRows();
                    try {
                        for (let index = 0; index < rows.length; index++) {
                            const row = rows[index];
                            if (row.Opcion === opcion) {
                                consultados['Opcion'] = row.Opcion
                                consultados['Actividad'] = row.Actividad                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:
                                consultados['Dias'] = row.Dias        
                                consultados['Horario'] = row.Horario                  // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
                                consultados['Ubicacion'] = row.Ubicacion
                                consultados['Dicta'] = row.Dicta
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
module.exports = flowActividadesAdultos;