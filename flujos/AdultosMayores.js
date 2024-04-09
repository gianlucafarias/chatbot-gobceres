const { addKeyword, addAction, addAnswer, gotoFlow } = require("@bot-whatsapp/bot");

let errores = 0;

const {
    startInactividad,
    resetInactividad,
    stopInactividad,
    flowInactividad,
  } = require('./idleCasero'); 

const flowAdultosmayores = addKeyword('actividades adultos mayores')
    .addAnswer('Desde el Gobierno de la Ciudad de Ceres impulsamos un montón de actividades para los adultos mayores 🤩', {delay: 1000}, async (ctx, {gotoFlow}) => {
        const adapterDB = require('../database/database')
    
        adapterDB.contadorFlujos(6) //residuos
            .then(() => {
                console.log('Contador del flujo incrementado correctamente');
            })
            .catch((error) => {
                console.error('Error al incrementar el contador del flujo:', error);
            });
        startInactividad(ctx, gotoFlow, 800000)
      })
    .addAnswer(['¿Sobre qué queres saber? 👇',
    '1. 👉 Consejo de Adultos Mayores 📣',
    '2. 👉 Actividades recreativas para adultos mayores 🧑‍🦳',
    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)

    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow, provider }) => {
        const opcion = parseInt(ctx.body);

        if (![1, 2].includes(opcion)) {
            errores++;
            resetInactividad(ctx, gotoFlow, 800000)
            if (errores > 2 )
            {
                return gotoFlow(require('./flowAyuda'));
            }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowAdultosmayores);
            return;
        }

        errores = 0;
        switch (opcion) {
        case 1: {
            stopInactividad(ctx)
            return gotoFlow(require('./flowConsejoAdultos'))
        }
        case 2: {
            stopInactividad(ctx)
            return gotoFlow(require('./flowActividadesAdultos'));
        }
        }
    }, 
    );

    module.exports = flowAdultosmayores;