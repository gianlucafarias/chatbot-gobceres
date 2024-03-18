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

const flowCIC = addKeyword(['CIC', 'centro integrador comunitario', 'salud', 'telefono cic'])
        .addAnswer('El Centro de Integración Comunitaria se encuentra en Avenida Perón y Pasaje Melián. Te envío la ubicación:', )
        .addAction(async (ctx, { provider }) => {
            startInactividad(ctx, gotoFlow, 120000)
            const id = ctx.key.remoteJid;
            await provider.sendLocation(id, -29.8807488, -61.9510042)
        })
        .addAnswer(['Acá brindamos un montón de servicios, por ejemplo: ',
        '1. 👉 Salud 👩‍⚕️',
        '2. 👉 Acción social 🤝',
        '3. 👉 Género y diversidad 💜',
        '4. 👉 Cambiar de tema 🔄',

        '\n\n Elegí alguna de esas opciones y te ayudo.',

        ],{delay: 3000})
        
        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1", "2", "3", "4", "menu", "menú", "x"].includes(opcion)) {
                errores++;
                resetInactividad(ctx, gotoFlow, 90000)
                if (errores > 3 )
                {
                    
                    return gotoFlow(require('./flowAyuda'));
                }
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
        
                await gotoFlow(flowCIC);
                return;
            }
            switch (opcion) {
            case '1': {
                stopInactividad(ctx)
                    return flowDynamic('En el CIC ofrecemos los siguientes servicios de salud 🩺\n\n Odontología \n Ginecología \n Médica clínica \n Obstetricia \n Pediatría \n Servicio de enfermería\n\n Escribí *CIC* para volver al menú anterior o *Menú* para volver al menú principal.');
                }
                case '2': {
                    stopInactividad(ctx)
                    return flowDynamic('Si necesitas ayuda con trámites, en el CIC te orientamos en: \n\n Retención del 20% de AUH \n Tarifa social \n Tarifa de servicio \n Becas Progresar \n Adultos 2000, plan para finalizar la secundaria \n Asesoramiento e inicio de trámites previsionales\n\n Para más info, acercate a Avenida Perón y Pje. Melián 📍\n\n Escribí *CIC* para volver al menú anterior o *Menú* para volver al menú principal.');
                }
                case '3': {
                    stopInactividad(ctx)
                    return gotoFlow(require('./flowGenero'));
                }
                case '4': {
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


module.exports = flowCIC;