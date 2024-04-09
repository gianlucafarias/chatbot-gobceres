const { addKeyword, addAction, addAnswer, gotoFlow, flowDynamic, EVENTS } = require("@bot-whatsapp/bot");

const { flowInactividad, startInactividad, resetInactividad, stopInactividad,
} = require("./idleCasero"); 

  const flowPrimeraVez = addKeyword(['$primera_vez'])
.addAnswer('¡Bienvenido! Estoy acá para ayudarte 24/7 con cualquier pregunta o información que necesites.', {delay: 1000}, async (ctx, {gotoFlow}) => {
    startInactividad(ctx, gotoFlow, 800000)
})
.addAnswer(['Para que sea más facil entenderte, solo tenes que escribir el *número* de la opción que te interese. Si es la primera vez que hablas conmigo, te recomiendo ir a la opción *1* para conocerme. Si queres hacerme una consulta, podés ir al Menú Principal en la opción *2*.\n',
'\n¿Cómo seguimos?',
'1. 👉 ¿Cómo se usa Ceresito?',
'2. 👉 Quiero hacer una consulta'],

{ delay: 2000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic  }) => {

    const option = ctx.body.toLowerCase().trim();

    if (!["1", "2"].includes(option)) {
        resetInactividad(ctx, gotoFlow, 800000); // ⬅️⬅️⬅️  REINICIAMOS LA CUENTA ATRÁS
        await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción dentro del menú.");

        await fallBack();
        errores++;

    if (errores > 2 )
    {
        stopInactividad(ctx)
        return gotoFlow(require('./flowAyuda'));

    }
        return gotoFlow(flowPrimeraVez) ;
    }

    if (option === "1") {
        stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
        return gotoFlow(require('./flowCeresito'));
    }

    if (option === "2") {
        stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
        return gotoFlow(require('./flowMenu'));
    }
  })


module.exports = flowPrimeraVez;