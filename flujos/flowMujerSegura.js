const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    endFlow,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')

const flowMujerSegura = addKeyword('programa mujer segura')
.addAnswer('Este programa fue una iniciativa de la actual gestión que tiene como fin prevenir la violencia de género y asistir en caso de ser necesario 🙌')
.addAnswer(['Entre las acciones que se plantean en este programa, nombramos las siguientes:',
            'Capacitación en Ley Micaela a todos los agentes municipales así como capacitaciones en los clubes y a jóvenes en los colegios',
            'Taller “Un taller para repensar las masculinidades” que tiene como fin facilitar un espacio de reflexión sobre género, masculinidad y violencia',
            'Puesta en marcha y capacitación para su instrumentación de los siguientes protocolos',
            '- Protocolo de atención integral a víctimas de violencia de género del municipio',
            '- Protocolo de abordaje de las violencias y acoso en el mundo del trabajo',
            '- Herramienta para las familias y amigos de víctimas de violencia',
            'Parada segura: se trata de puntos en zonas estratégicas de la ciudad con carteles con información sobre teléfonos de emergencia y protocolos',
            'Red de atención a mujeres (RAM): atención integral y especializada asesoramiento, acompañamiento y asistencia integral'              
            ])
.addAnswer('Si queres más información, hace clic acá 👇 https://ceres.gob.ar/programamujersegura/ ')

.addAction({ delay: 9000 }, async (ctx, { flowDynamic, gotoFlow }) => {
    return gotoFlow((require("./flowLlamarMenu")))
})


module.exports = flowMujerSegura;