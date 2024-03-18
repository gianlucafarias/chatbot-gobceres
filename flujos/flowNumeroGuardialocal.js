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

const flowNumeroGuardialocal = addKeyword('guardia local')
.addAnswer("Te paso el contacto de la guardia local.", null, async (ctx, { provider }) => {
    const vcard =
    'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    'FN:Guardia Local\n' + 
    'ORG:gobceres;\n' +
    'TEL;type=CELL;type=VOICE;waid=543491560835:+54543491560835\n' +
    'END:VCARD' 
    const id = ctx.key.remoteJid
    const sock = await provider.getInstance()
    await sock.sendMessage(id, {
    contacts: {
        displayName: 'Guardia Local',
        contacts: [{ vcard }],
    },
    })
})
.addAction({ delay: 9000 }, async (ctx, { flowDynamic, gotoFlow }) => {
    return gotoFlow((require("./flowLlamarMenu")))
})





module.exports = flowNumeroGuardialocal;