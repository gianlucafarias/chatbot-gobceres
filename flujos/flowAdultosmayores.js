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

  let errores = 0;

const flowAdultosmayores = addKeyword('actividades adultos mayores')
        .addAction(async (ctx, { gotoFlow }) => {
            const adapterDB = require('../database/database')
            adapterDB.contadorFlujos(8) // adultos mayores
            .then(() => {
                console.log('Contador del flujo incrementado correctamente');
            })
            .catch((error) => {
                console.error('Error al incrementar el contador del flujo:', error);
            });
            startInactividad(ctx, gotoFlow, 80000); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
        }) 
        .addAnswer('Desde el Gobierno de la Ciudad de Ceres impulsamos un montón de actividades para los adultos mayores 🤩',{delay: 1000})
        .addAnswer(['¿Sobre qué queres saber? 👇',
        '1. 👉 Consejo de Adultos Mayores 📣',
        '2. 👉 Actividades recreativas para adultos mayores 🧑‍🦳',
        '3. 👉 Cambiar de tema 🔄',
        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],{delay: 3000})

        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1", "2", "3","menu", "menú"].includes(opcion)) {
                resetInactividad(ctx, gotoFlow, 90000)
                errores++;
                if (errores > 2 )
                {
                    stopInactividad(ctx)
                    return gotoFlow(require('./flowAyuda'));
                }
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

                await gotoFlow(flowAdultosmayores);
                return;
            }

            errores = 0;
            switch (opcion) {
            case '1': {
                stopInactividad(ctx)
                return gotoFlow(require('./flowConsejoAdultos'))
            }      
            case '2': {
                stopInactividad(ctx)
                return gotoFlow(require('./flowActividadesAdultos'))
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
            }
        }, 
        );

module.exports = flowAdultosmayores;