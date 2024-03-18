const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')


let errores = 0;

const flowAyuda = addKeyword('ayuda')
.addAnswer('Parece que no encuentro la opción que buscas. ¿Necesitas ayuda?')
.addAction({ delay: 9000 }, async (ctx, { flowDynamic, gotoFlow }) => {
    return gotoFlow((require("./flowLlamarMenu")))
})

module.exports = flowAyuda;