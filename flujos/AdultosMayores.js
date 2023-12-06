const { addKeyword, addAction, addAnswer, gotoFlow } = require("@bot-whatsapp/bot");

const flowAdultosmayores = addKeyword('actividades adultos mayores')
    .addAnswer('Desde el Gobierno de la Ciudad de Ceres impulsamos un montón de actividades para los adultos mayores 🤩')
    .addAnswer(['¿Sobre qué queres saber? 👇',
    '1. 👉 Consejo de Adultos Mayores 📣',
    '2. 👉 Actividades recreativas para adultos mayores 🧑‍🦳',
    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)

    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow, provider }) => {
        const opcion = parseInt(ctx.body);

        if (![1, 2].includes(opcion)) {
            errores++;

            if (errores > 2 )
            {
                return gotoFlow(flowAyuda);
            }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowAdultosmayores);
            return;
        }

        errores = 0;
        switch (opcion) {
        case 1: return gotoFlow(flowConsejoAdultos);              
        case 2: return gotoFlow(flowActividadesAdultos);
        }
    }, 
    );

    module.exports = flowAdultosmayores;