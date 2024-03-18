const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')
const flowAgente = addKeyword('PELIGRO', {sensitive: true})
.addAnswer('Estamos creando una conexion con un agente local...')
.addAction(async (ctx, {provider}) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Guardia Local (${ID_GROUP})`,[
        `${ctx.from}@s.whatsapp.net`
    ])
})

module.exports = flowAgente;