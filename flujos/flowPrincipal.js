const { addKeyword, addAction, addAnswer, gotoFlow, flowDynamic, EVENTS } = require("@bot-whatsapp/bot");
const {consultarContactos} = require('../consultarContactos')
const contadorConversacion = require('../utils/contadorConversacion')

const flowPrincipal = addKeyword(["hola","buenas tardes", "buenos dias", EVENTS.WELCOME])
            .addAction(
                async (ctx, { flowDynamic, state, provider, gotoFlow }) => {
                    contadorConversacion.iniciarContadorConversacion(ctx);
                    const nombre = ctx.pushName
                    const telefono = ctx.from
                    try {await flowDynamic(`¡Hola ${nombre}! Soy Ceresito, el Chatbot del Gobierno de la Ciudad de Ceres`)
                    console.log(nombre)
                    const sock = await provider.getInstance();
                    const msgPoll = {
                    sticker: {
                    url:
                    "./media/ceresito.webp"
                    }
                    };
                    sock.sendMessage(ctx.key.remoteJid, msgPoll)
                 //   await consultarContactos(nombre, telefono)
                    const existeContacto = await consultarContactos(nombre, telefono);
                    
                    if (existeContacto) {
                        // Si el contacto existe, ir al flujoMenu
                        await gotoFlow((require("./flowMenu")));
                    } else {
                        // Si el contacto no existe, ir al flujo de bienvenida
                        await gotoFlow((require("./flowPrimeraVez")));
                    }
                    
                }
            
                    catch(error) {
                        console.log(error)
                    }
                }
            )
            
module.exports = flowPrincipal;