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

const flowLlamarMenu = addKeyword(['$menu'])
.addAnswer('Querés hacer otra consulta? Escribí la palabra *Menú* para volver al menú principal. También podes escribir *Trámites*, *CIC*, *Género* o *Licencias* para otras opciones.',
{delay: 4000}, async (ctx, {gotoFlow}) => {
    startInactividad(ctx, gotoFlow, 120000)
  })


  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
    const opcion = ctx.body.toLowerCase().trim();
    if (!["tramites", "trámites", "cic", "género", "genero", "licencia", "licencias", "menu", "menú"].includes(opcion)) {
        errores++;
        resetInactividad(ctx, gotoFlow, 90000)
            if (errores > 2 )
            {
                stopInactividad(ctx)
                return gotoFlow(require('./flowAyuda'));

            }
        await flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
        await fallBack();

    }
    switch (opcion) {
    case 'cic': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowCic'))
    }
    case 'tramites': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowTramites'))
    }
    case 'tramite': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowTramites'))
    }
    case 'trámite': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowTramites'))
    }
    case 'trámites': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowTramites'))
    }
    case 'genero': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowGenero'))
    }
    case 'género': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowGenero'))
    }
    case 'licencia': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowLicencias'))
    }
    case 'licencias': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowLicencias'))
    }
    case 'menú': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowMenu'))
    }
    case 'menu': {
        stopInactividad(ctx)
        return gotoFlow(require('./flowMenu'))
    }
    default: return flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
    }
});


module.exports = flowLlamarMenu;
