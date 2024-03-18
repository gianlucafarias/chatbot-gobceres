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

const flowEducacion = addKeyword('educacion')
.addAnswer('¿Querés estudiar? ¡Te felicitamos! En Ceres podes capacitarte en dos carreras universitarias y también en robótica 🤓')
.addAnswer(['¿Sobre qué queres saber? 👇',
'1. 👉 Tecnicaturas de la UTN en Ceres',
'2. 👉 Robótica y Club de Ciencias',
'3. 👉 Cambiar de tema 🔄',
'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
], {delay: 4000}, async (ctx, {gotoFlow}) => {
    startInactividad(ctx, gotoFlow, 120000)
  })

.addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    const opcion = ctx.body.toLowerCase().trim();
    if (!["1", "2", "3", "menu", "menú"].includes(opcion)) {
        errores++;
        resetInactividad(ctx, gotoFlow, 90000)
        if (errores > 2 )
        {
            stopInactividad(ctx)
            return gotoFlow(require('./flowAyuda'));
        }
        await flowDynamic('⚠️ Opción no encontrada, por favor seleccione una opción válida.');
        await gotoFlow(flowEducacion);
        return;
    }
    switch (opcion) {
    case '1': {
        return flowDynamic('¡Genial! En Ceres podes cursar dos carreras con mucha salida laboral \n\n Tecnicatura en Administración Rural 📚 \n Tecnicatura en Programación 📚 \n\n Toda la información sobre estas carreras pertenecientes a la UTN, la encontras en este instagram 👇 https://instagram.com/utnceresextension');
    }
    case '2': {
        stopInactividad(ctx)
        await flowDynamic('El Club de Ciencias fue una gestión realizada por el municipio y permite que niños, jóvenes y adolescentes puedan capacitarse en robótica 🤖 \n\n Si queres más información, contactate al 03491-421990 📞 \n\nEscribí *Educación* para volver al menú anterior o *Menú* para volver al menú principal.');
        return gotoFlow((require("./flowLlamarMenu")))
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
});

module.exports = flowEducacion;