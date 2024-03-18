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

const {
    startInactividad,
    resetInactividad,
    stopInactividad,
    flowInactividad,
  } = require('./idleCasero'); 
  const { runChat } = require("../services/langchain/chat");

  const {comprobarhistory} = require('../services/langchain/history.layer')

  const flowHistoriaGpt = addKeyword('historia')
        .addAction(async (ctx, { gotoFlow }) => { 
            startInactividad(ctx, gotoFlow, 120000)
        })
        .addAnswer('Con la ayuda de un modelo de Inteligencia Artificial, estudié mucho sobre la historia de nuestra ciudad',
{delay:2000}, async (ctx, { provider } ) => {
    const sock = await provider.getInstance();
    const msgPoll = {
    sticker: {
    url:
    "./media/historia.webp"
    }
    };
    sock.sendMessage(ctx.key.remoteJid, msgPoll)
    })
        .addAnswer([
            'Podés preguntarme lo que quieras, y si lo sé te lo respondo',
            '¿Sobre qué te gustaría conocer? Preguntame 👇'] ,

        { delay: 2000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic, state  }) => {
            
            try {
                stopInactividad(ctx)
                const history = state.getMyState()?.history ?? []
                const question = ctx?.body
    
                console.log(`[QUESTION]:`,question)
            //    console.log(`[HISTORY]:`,history)
            
                
                history.push({
                    role: 'user',
                    content: question
                })
                
                /** preguntar LLM */
                const { response } = await runChat(history, question)
    
                /** dividir respuesta por puntos seguidos y espacios saltos de linea */
                const chunks = response.split(/(?<!\d)\.\s+/g);
    
                history.push({
                    role: 'assistant',
                    content: response
                })
                await flowDynamic([{ body: response, delay:2000 }])
                
                    await flowDynamic('¿Cómo querés seguir?\n\n1. Volver a preguntar.\n2. Volver al *Menú* Principal', { delay: 1000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic, state  }) => {
                        const opcion = ctx.body.toLowerCase().trim();
                        if (!["1", "2", "menú"].includes(opcion)) {
                            errores++;
                    //        resetInactividad(ctx, gotoFlow, 90000)
                            if (errores > 3 )
                            {
                                
                                return gotoFlow(require('./flowAyuda'));
                            }
                            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
                    
                            return (require('./flowAyuda'));
                        }
                        switch (opcion) {
                            case '1': {
                                stopInactividad(ctx)
                                    return gotoFlow(flowHistoriaGpt)
                                }
                                case '2': {
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
                    }
                )       
                await state.update({ history })
            } catch (err) {
                console.log(`[ERROR]:`, err)
            }
        })






module.exports = flowHistoriaGpt;