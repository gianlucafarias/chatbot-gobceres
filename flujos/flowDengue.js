const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')

const flowDengue = addKeyword('dengue')
.addAnswer('Al dengue lo frenamos trabajando en equipo 💪')
.addAnswer(['Toda la info sobre esta enfermedad, cómo se trasmite y cómo prevenirlo, lo encontras en nuestra página haciendo clic acá 👇 https://ceres.gob.ar/dengue/\n\n',
            '¡Necesitamos de tu colaboración y acción para prevenirlo! 🦟🚫',
           ]
        )

.addAction({ delay: 9000 }, async (ctx, { flowDynamic, gotoFlow }) => {
    return gotoFlow((require("./flowLlamarMenu")))
})
        

module.exports = flowDengue;