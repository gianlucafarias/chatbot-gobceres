const { addKeyword, addAction, addAnswer, gotoFlow } = require("@bot-whatsapp/bot");

const { flowInactividad, startInactividad, resetInactividad, stopInactividad,
} = require("./idleCasero"); 


let errores = 0;

const flowTurismo = addKeyword(['Turismo', 'hoteles', 'bares'])
.addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, 80000); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })  
.addAnswer('¡Nuestra ciudad tiene un montón de cosas para disfrutar! 🤩',
null, async (ctx, { provider } ) => {
    const sock = await provider.getInstance();
    const msgPoll = {
    sticker: {
    url:
    "./media/turismo.webp"
    }
    };
    sock.sendMessage(ctx.key.remoteJid, msgPoll)
    })
.addAnswer(['¿Sobre qué queres saber? 👇',
'1. 👉 Hoteles',
'2. 👉 Bares y restaurantes',
'3. 👉 Atractivos turísticos',
'4. 👉 Programación Usina cultural Ceres',
'5. 👉 Cambiar de tema 🔄',
'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
], {delay: 4000})
.addAction({ capture: true }, async (ctx, { flowDynamic, provider, gotoFlow, endFlow}) => {
    const id = ctx.key.remoteJid;
    const opcion = ctx.body.toLowerCase().trim();
    if (!["1", "2", "3", "4", "5", "menu", "menú"].includes(opcion)) {
        errores++;
        resetInactividad(ctx, gotoFlow, 90000)
        if (errores > 2 )
        {
            stopInactividad(ctx)
            return gotoFlow(require('./flowAyuda'));

        }
        await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.", {delay: 3000});

        await gotoFlow(flowTurismo);
        return;
    }
    switch (opcion) {
    case '1': {
        stopInactividad(ctx)
        await provider.sendImage(id, './media/hoteles.png', 'Todos los hoteles y hospedajes de Ceres, en esta placa 🏨');
        return gotoFlow(require('./flowLlamarMenu'));
    }
        case '2': {
            stopInactividad(ctx)
            await provider.sendImage(id, './media/comedores.png', 'Todos los bares y restaurantes de Ceres, en esta placa 🍹');
            return gotoFlow(require('./flowLlamarMenu'));
        }
        case '3': {
            stopInactividad(ctx)
            await provider.sendImage(id, './media/atractivos.png', 'Todos los puntos turísticos y recreativos de Ceres, en esta placa 📸');
            return gotoFlow(require('./flowLlamarMenu'));
        }
        case '4': {
            stopInactividad(ctx)
            await flowDynamic('🎬 Para conocer qué hay este fin de semana en la Usina cultural Ceres, entrá a las redes sociales oficiales\n\nInstagram: https://instagram.com/ceresturismo \nFacebook: https://facebook.com/ceresturismo');
            return gotoFlow(require('./flowLlamarMenu'));
        }
        case '5': {
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

module.exports = flowTurismo;