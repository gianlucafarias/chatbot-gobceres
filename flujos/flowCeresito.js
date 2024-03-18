const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')


const flowCeresito = addKeyword(['ceresito', 'como usar ceresito'])
.addAnswer('Si es la primera vez que chateás conmigo, te cuento algo de mí así me conocés mejor.')
.addAnswer(['¿Sabías que soy un chatbot? Eso significa que:\n',
'🤖 Podés hablarme cuando quieras porque estoy siempre en línea.\n',
'🤖 Mis respuestas son automáticas, y todo el tiempo aprendo cosas nuevas.\n'],)
.addAnswer(['Para hablar conmigo lo mejor es usar frases simples, con pocas palabras.\n',
'Mientras más corto sea el mensaje, mejor lo voy a entender. Por ejemplo:\n❌ No me escribas ‘Hola, es para preguntar si puedo sacar un turno el día martes’.\n\n✅ Mejor decime *Turnos* o escribí el número que le corresponda a la opción del menú que te interese.',
])

.addAnswer(['¿Estás listo para charlar?\n',
            'Recordá que si no te entiendo o estás perdido, en todo momento podes escribir la palabra *Menú* para volver al menú principal.\n',
])

.addAction({ delay: 9000 }, async (ctx, { flowDynamic, gotoFlow }) => {
    return gotoFlow((require("./flowLlamarMenu")))
})


module.exports = flowCeresito;
