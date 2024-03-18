const { addKeyword, addAction, addAnswer, gotoFlow } = require("@bot-whatsapp/bot");

const {
    startInactividad,
    resetInactividad,
    stopInactividad,
    flowInactividad,
  } = require('./idleCasero'); 

  let errores = 0;

const flowTramites = addKeyword(['Trámites', 'tramite', 'trámite', 'trámites', 'quiero hacer un tramite'])
        .addAction(async (ctx, { gotoFlow }) => {
            const adapterDB = require('../database/database')
            adapterDB.contadorFlujos(1) // tramites
            .then(() => {
                console.log('Contador del flujo incrementado correctamente');
            })
            .catch((error) => {
                console.error('Error al incrementar el contador del flujo:', error);
            });
            startInactividad(ctx, gotoFlow, 80000); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
        }) 
    .addAnswer('Hacer trámites puede ser muy aburrido y estresante, por eso quiero facilitarte las cosas 💪' )
    .addAnswer([
        'Ahora puedes hacer lo siguiente desde acá:',
        'Contame, ¿sobre qué necesitas saber?',
        'Escribí el número del menú sobre el tema que te interese para continuar.\n\n',
        '1. 👉 Camino rural',
        '2. 👉 Moratorias',
        '3. 👉 Cambiar de tema 🔄',
    ], { delay:1000, capture: true }, async (ctx, { flowDynamic, gotoFlow, endFlow }) => {
        const opcion = ctx.body.toLowerCase().trim();
        if (!["1", "2", "3", "menu", "menú"].includes(opcion)) {
            errores++;
                resetInactividad(ctx, gotoFlow, 90000)
                if (errores > 2 )
                {
                    stopInactividad(ctx)
                    return gotoFlow(require('./flowAyuda'));
                }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowTramites);
            return;
        }
        switch (opcion) {
            
        case '1': {
            stopInactividad(ctx)
            return endFlow('Si queres pagar este impuesto, hace clic acá 👇https://bit.ly/pagarimpuestosceres \n\n Volvé a escribir *Tramites* para volver al menú anterior o *Menú* para volver al menú principal.');
        }
        case '2': {
            stopInactividad(ctx)
            return endFlow('Si estás adherido a una moratoria y queres pagarla, hace clic acá 👇 https://bit.ly/pagarimpuestosceres \n\n Volvé a escribir *Tramites* para volver al menú anterior o *Menú* para volver al menú principal.');
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

module.exports = flowTramites;