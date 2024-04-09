const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    pushName
    
} = require('@bot-whatsapp/bot')

const { flowInactividad, startInactividad, resetInactividad, stopInactividad,
} = require("./idleCasero"); 

const flowHistoriaGpt = require('./flowHistoriaGpt')

let errores = 0;

const flowMenu = addKeyword(['menu', 'menú'])
.addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, 800000); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })        
.addAnswer(['No soy un superhéroe pero puedo ayudarte de muchas maneras 🦸‍♀️',
            'Contame, ¿Sobre qué necesitas saber?',
            '1. 👉 Trámites 🗃️',
            '2. 👉 Licencia de conducir 🪪',
            '3. 👉 Información sobre el CIC 🫂',
            '4. 👉 Turismo 📸',
            '5. 👉 Historia de Ceres 🏛',
            '6. 👉 Separación y recolección de residuos ♻',
            '7. 👉 Educación 📚',
            '8. 👉 Actividades para adultos mayores 👵👴',
            '9. 👉 Prevención del dengue 🦟',
            '10. 👉 Cómo usar Ceresito 🤖',
            '11. 👉 Quiero hacer un reclamo',
            '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],

        { delay: 1000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic  }) => {

            const option = ctx.body.toLowerCase().trim();

            if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "hola", "genero", "género", "menú", "menu", "peligro", "tramites", "tramite", "licencia", "cic", "turismo", "educacion", "historia", "separacion", "adultos mayores", "actividades", "reclamo","dengue", "ayuda"].includes(option)) {
                resetInactividad(ctx, gotoFlow, 90000); // ⬅️⬅️⬅️  REINICIAMOS LA CUENTA ATRÁS
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

                await fallBack();
                errores++;

            if (errores > 2 )
            {
                stopInactividad(ctx)
                return gotoFlow(flowAyuda);

            }
                return;
            }
        
            if (option === "1") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowTramites'));
            }
        
            if (option === "2") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowLicencias'));
            }
            if (option === "3") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowCic'));
            }
            if (option === "4") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowTurismo'));
            }
            if (option === "5") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowHistoria'));
            }
            if (option === "6") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowResiduos'));
            }
            if (option === "7") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowEducacion'));
            }
            if (option === "8") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowAdultosmayores'));
            }
            if (option === "9") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowDengue'));
            }
            if (option === "10") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./flowCeresito'));
            }
            if (option === "11") {
                stopInactividad(ctx); // ⬅️⬅️⬅️  HEMOS LLEGADO AL FINAL DEL FLUJO, ASI QUE PARO LA CUENTA ATRÁS
                return gotoFlow(require('./crearReclamo'));
            }
        }
    )

module.exports = flowMenu;