const { addKeyword, addAction, addAnswer, gotoFlow, endFlow } = require("@bot-whatsapp/bot");

const { flowInactividad, startInactividad, resetInactividad, stopInactividad,
} = require("./idleCasero"); 


let errores = 0;

const flowResiduos = addKeyword(['separacion', 'residuos', 'separación residuos', 'separación'])
.addAnswer('Separar los residuos es fundamental para el cuidado de nuestro planeta. Selecciona qué info necesitas saber 🌎', {delay: 1000}, async (ctx, {gotoFlow}) => {
    startInactividad(ctx, gotoFlow, 120000)
  })
.addAnswer(['¿Sobre qué queres saber? 👇',
'1. 👉 Separación y recolección residuos domiciliarios ♻️',
'2. 👉 Separación y recolección residuos de patio 🍂',
'3. 👉 Info sobre la Cooperativa de Trabajo “Reciclar Ceres” 💪',
'4. 👉 Cambiar de tema 🔄',

'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
], {delay: 3000})

.addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow,  }) => {
    const opcionresiduos = ctx.body.toLowerCase().trim();
    if (!["1", "2", "3", "4", "menu", "menú"].includes(opcionresiduos)) {
        resetInactividad(ctx, gotoFlow, 90000)
        errores++;

        if (errores > 2 )
        {
            stopInactividad(ctx)
            return gotoFlow(require('./flowAyuda'));
        }
        await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
        await gotoFlow(flowResiduos);
        return;
    }
    switch (opcionresiduos) {
        case '1': {
            const diasSemana = ["*Domingo*", "*Lunes*", "*Martes*", "*Miércoles*", "*Jueves*", "*Viernes*", "*Sábado*"];
            const diaActual = new Date().getDay(); // Obtener el día de la semana actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
            const diaSemana = diasSemana[diaActual];
            stopInactividad(ctx)
            switch (diaActual) {
                case 0: {  // Domingo
                    await flowDynamic("Hoy es Domingo, los residuos no se recogen hoy. Pero podes sacar tus residuos humedos esta noche para que sean recolectados.", {delay: 2000});
                    break;
                }
                case 1:  // Lunes
                    
                case 3:   // Miércoles
                    
                case 4:  // Jueves
                    
                case 6:  // Sábado
                    await flowDynamic("Los días " + diaSemana + " se recogen *residuos húmedos*. ", {delay: 2000});
                    break;
                
                case 2:   // Martes
                    
                case 5:   // Viernes
                    await flowDynamic("Los días " + diaSemana + " se recogen *residuos secos*. ", {delay: 2000});
                    break;
                
            }
            await flowDynamic('*Algo muy importante: ¡no dejes tus residuos en los pilares de luz porque no podremos recogerlos!*', {delay: 2000});      
            return gotoFlow(require('./flowLlamarMenu'))        
        }
        case '2': {
                stopInactividad(ctx)
                return gotoFlow(require('./flowSeccionesPatio'));
            }
        case '3': {
            stopInactividad(ctx)
            return flowDynamic('Hace muy poco, en nuestra ciudad se conformó legalmente, gracias al acompañamiento del municipio, la cooperativa de trabajo “Reciclar Ceres” ♻️\n\n Se trata de un paso súper importante ya que les brinda nuevas oportunidades para su desarrollo y crecimiento económico y profesional. Con su constitución tienen más independencia en sus acciones, podrán acceder a créditos y subsidios; contar con más estabilidad laboral, entre otras cuestiones 💪\n\n Cuando separas los residuos correctamente, colaboras con las personas de esta cooperativa, que trabajan diariamente en el Centro de Disposición Final. ¡Hacelo por el planeta, por vos y por ellos! 💚 \n\nEscribí *Residuos* para volver al menú anterior o *Menú* para volver al menú principal.');
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

module.exports = flowResiduos;