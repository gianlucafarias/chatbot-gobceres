const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')

const flowReclamo = addKeyword('console')
    .addAnswer('Queremos que nuestra Ciudad esté cada vez más linda. 🌈\n\nPor eso, si ves algo que necesite arreglo o se pueda mejorar, podés hacer tu solicitud desde acá.')
    .addAnswer([
        'Ahora podés solicitar un reclamo y consultar el estado de tu solicitud acá:',
        'Contame, ¿que necesitás?',
        '1. 👉 Quiero hacer un reclamo',
        '2. 👉 Ya hice un reclamo, quiero ver el estado de mi solicitud.',
        '\n\nEscribí el número del menú sobre el tema que te interese para continuar.',
    ],
    )
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2].includes(opcion)) {
            errores++;

                if (errores > 2 )
                {
                    return gotoFlow(require('../flowAyuda)'));

                }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowReclamo);
            return;
        }
        switch (opcion) {
            
        case 1: return gotoFlow(require('../crearReclamo'));
        case 2: return gotoFlow(require('./flowConsultar'));
        default: return flowDynamic('No te entiendo 😢 ¿Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
        }
    });

module.exports = flowReclamo;