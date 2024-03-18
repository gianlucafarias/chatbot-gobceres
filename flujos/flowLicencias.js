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
  } = require('./idleCasero'); 

  const adapterDB = require('../database/database')

  let errores = 0;

const flowLicencias = addKeyword(['Licencias', 'licencia', 'como sacar mi licencia'])

    .addAction(async (ctx, { gotoFlow }) => {
        adapterDB.contadorFlujos(2)
        .then(() => {
            console.log('Contador del flujo incrementado correctamente');
            // Continúa con el resto de la lógica del flujo aquí
        })
        .catch((error) => {
            console.error('Error al incrementar el contador del flujo:', error);
            // Maneja el error de alguna manera apropiada
        });        startInactividad(ctx, gotoFlow, 80000); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
    })   
    .addAnswer('Si vas a conducir un vehículo, sí o sí necesitas contar con una licencia de conducir 🚗🚙🛵🚚🚜', 
    {delay:2000}, async (ctx, { provider } ) => {
        const sock = await provider.getInstance();
        const msgPoll = {
        sticker: {
        url:
        "media/licencia.webp"
        }
        };
        sock.sendMessage(ctx.key.remoteJid, msgPoll)
        })
    .addAnswer([
        'Elegí una de estas opciones y seguimos:',
        '1. 👉 Requisitos para sacar la licencia de conducir',
        '2. 👉 Sacar turno',
        '3. 👉 Cambiar de tema 🔄',
        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ], {delay:2000})

        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1","2", "3", "menú", "menu"].includes(opcion)) {
                errores++;
                resetInactividad(ctx, gotoFlow, 90000)
                if (errores > 2 )
                {
                    stopInactividad(ctx)
                    return gotoFlow(require('./flowAyuda'));

                }
                await flowDynamic("⚠️Opción no encontrada, por favor seleccione una opción válida.");
        
                await gotoFlow(flowLicencias);
                return;
            }
            switch (opcion) {
            case '1': {
                stopInactividad(ctx)
                return flowDynamic('Toda la info sobre licencias, como tipo de licencias, requisitos, renovación, pérdida y más, lo encontras acá 👇 https://ceres.gob.ar/turnos/ \n\n Escribí *Licencias* para volver al menú anterior o *Menú* para volver al menú principal.');
            }
            case '2': {
                stopInactividad(ctx)
                return flowDynamic('Ahora podes sacar tu turno desde acá 👇 https://ceres.gob.ar/turnos/ \n\n Escribí *Licencias* para volver al menú anterior o *Menú* para volver al menú principal.');
            }
            case '3': {
                stopInactividad(ctx)
                return gotoFlow(require('./flowMenu'))
            }
            case 'menu': {
                stopInactividad(ctx)
                return gotoFlow(require('./flowMenu'))
            }
            case 'menú': {
                stopInactividad(ctx)
                return gotoFlow(require('./flowMenu'))
            }
            default: {
                stopInactividad(ctx)
                return flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
            }
            }
        });

module.exports = flowLicencias;