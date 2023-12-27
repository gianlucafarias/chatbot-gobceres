    const flowCrearReclamo = require("./flujos/crearReclamo")
    // const flowAdultosmayores = require("./flujos/AdultosMayores")
    const QRPortalWeb = require('@bot-whatsapp/portal')
    const BaileysProvider = require('@bot-whatsapp/provider/baileys')
    const MockAdapter = require('@bot-whatsapp/database/mock')
    let errores = 0;
    const { GoogleSpreadsheet } = require('google-spreadsheet')
    const fs = require('fs')
    const RESPONSES_SHEET_ID = '1eqgDBQtHqHmZcBF7IzK7-GgOQBSMBlmI9ZR667v4UF8'; //Aquí pondras el ID de tu hoja de Sheets
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
    const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'));
    const {
        createBot,
        createProvider,
        createFlow,
        addKeyword,
        addAnswer,
        EVENTS,
        pushName
        
    } = require('@bot-whatsapp/bot')




    const flowAyuda = addKeyword('ayuda')
        .addAnswer('Parece que no encuentro la opción que buscas. ¿Necesitas ayuda?')
        .addAnswer(['Escribí la palabra *Menú* para volver al menú principal. También podes escribir *Trámites*, *CIC*, *Género* o *Licencias* para otras opciones'])
        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["tramites", "trámites", "cic", "género", "genero", "licencia", "licencias", "menu", "menú"].includes(opcion)) {
                errores++;
        
                    if (errores > 2 )
                    {
                        return gotoFlow(flowAyuda);
        
                    }
                await flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
                await fallBack();

            }
            switch (opcion) {
                
            case 'cic': return gotoFlow(flowCIC)
            case 'tramites': return gotoFlow(flowTramites)
            case 'tramite': return gotoFlow(flowTramites)
            case 'trámite': return gotoFlow(flowTramites)
            case 'trámites': return gotoFlow(flowTramites)
            case 'genero': return gotoFlow(flowGenero)
            case 'género': return gotoFlow(flowGenero)
            case 'licencia': return gotoFlow(flowLicencias)
            case 'licencias': return gotoFlow(flowLicencias)
            case 'menú': return gotoFlow(flowMenu)
            default: return flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
            }
        });

        errores= 0;

        const flowMenu = addKeyword(['menu', 'menú'])
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
                    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
                ],
        
                { delay: 1000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic }) => {
                    const option = ctx.body.toLowerCase().trim();
                
                    if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", , "11", "hola", "genero", "género", "menú", "menu", "peligro", "tramites", "tramite", "licencia", "cic", "turismo", "educacion", "historia", "separacion", "adultos mayores", "actividades", "reclamo","dengue", "ayuda"].includes(option)) {
                        await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
                
                        await fallBack();
                        errores++;
        
                    if (errores > 2 )
                    {
                        return gotoFlow(flowAyuda);
        
                    }
                        return;
                    }
                
                    if (option === "1") {
                        return gotoFlow(flowTramites);
                    }
                
                    if (option === "2") {
                        return gotoFlow(flowLicencias);
                    }
                
                    if (option === "3") {
                        return gotoFlow(flowCIC);
                    }
                    if (option === "4") {
                        return gotoFlow(flowTurismo);
                    }
                    if (option === "5") {
                        return gotoFlow(flowHistoria);
                    }
                    if (option === "6") {
                        return gotoFlow(flowResiduos);
                    }
                    if (option === "7") {
                        return gotoFlow(flowEducacion);
                    }
                    if (option === "8") {
                        return gotoFlow(flowAdultosmayores);
                    }
                    if (option === "9") {
                        return gotoFlow(flowDengue);
                    }
                    if (option === "10") {
                        return gotoFlow(flowCeresito);
                    }
                    if (option === "11") {
                        return gotoFlow(flowReclamo);
                    }
                    
                }
            )
            
            const flowPrincipal = addKeyword(["hola","buenas tardes", "buenos dias", EVENTS.WELCOME])
            .addAnswer('🙌 ¡Hola! Soy Ceresito, el chatbot del Gobierno de la Ciudad de Ceres 🍒', null, async (ctx, { provider } ) => {
                const nombre = ctx.pushName
                console.log(nombre)
                const sock = await provider.getInstance();
                const msgPoll = {
                sticker: {
                url:
                "media/ceresito.webp"
                }
                };
                sock.sendMessage(ctx.key.remoteJid, msgPoll)
                })
            
            .addAnswer(['No soy un superhéroe pero puedo ayudarte de muchas maneras 🦸‍♀️',
                    'Contame, ¿sobre qué necesitas saber?',
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
                    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
                ],
        
                { delay: 2000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic }) => {
                    const option = ctx.body.toLowerCase().trim();
                
                    if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "hola", "menu", "genero", "género", "peligro", "tramites", "tramite", "licencia", "cic", "turismo", "educacion", "historia", "separacion", "adultos mayores", "actividades", "reclamo","dengue", "ayuda"].includes(option)) {
                        await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
                
                        await fallBack();
                        return;
                    }
                
                    if (option === "1") {
                        return gotoFlow(flowTramites);
                    }
                
                    if (option === "2") {
                        return gotoFlow(flowLicencias);
                    }
                
                    if (option === "3") {
                        return gotoFlow(flowCIC);
                    }
                    if (option === "4") {
                        return gotoFlow(flowTurismo);
                    }
                    if (option === "5") {
                        return gotoFlow(flowHistoria);
                    }
                    if (option === "6") {
                        return gotoFlow(flowResiduos);
                    }
                    if (option === "7") {
                        return gotoFlow(flowEducacion);
                    }
                    if (option === "8") {
                        return gotoFlow(flowAdultosmayores);
                    }
                    if (option === "9") {
                        return gotoFlow(flowDengue);
                    }
                    if (option === "10") {
                        return gotoFlow(flowCeresito);
                    }
                    
                }
            )
        
            const flowPrincipalNombre = addKeyword(["nombre"])
            .addAction (async (ctx, { state, provider } ) => {
              try  {const myState = state.getMyState(); 
                state.update({name: ctx.pushName})
                .flowDynamic(`🙌 ¡Hola ${ctx.pushName}! Soy Ceresito, el chatbot del Gobierno de la Ciudad de Ceres 🍒`)}
                catch(error){
                    console.log(error)
                    }
            })

    const flowConsultar = addKeyword(['Consultar mis datos','🔍 Consultar mis datos 🔍'])
    .addAnswer(['Dame unos segundo, estoy buscando tus datos dentro del sistema... 🔍'],{delay:1000}, async (ctx, {flowDynamic}) =>{

    try {
        telefono = ctx.from

        const consultados = await consultarDatos(telefono)
        
        const Reclamo = consultados['Reclamo']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
        const Ubicacion = consultados['Ubicacion']
        const Barrio = consultados['Barrio']
        const Telefono = consultados['Telefono']
        const Estado = consultados['Estado']
        
        if (Telefono === undefined)
        {
            await flowDynamic(`No encontré solicitudes registradas con tu numero de teléfono.`)
        }
        else await flowDynamic(`- *Reclamo*: ${Reclamo}\n- *Ubicación*: ${Ubicacion}\n- *Barrio*: ${Barrio}\n- *Estado del reclamo*: ${Estado}`)
        if (Estado == 'PENDIENTE')
                {
                    await flowDynamic(`El estado de tu solicitud es *PENDIENTE*. Hemos cargado tu reclamo en nuestra base de datos y está pendiente a aprobación. Recordá que completar tu solicitud puede llevar un tiempo.`)
                }
                else if (Estado == 'COMPLETADO')
                {
                    await flowDynamic(`El estado de tu solicitud es *COMPLETADO*. Resolvimos tu solicitud.`)
        
                }
    } catch (error) {
        console.error('Error al manejar el caso de Teléfono indefinido:', error);
        // Puedes manejar el error de la manera que prefieras
    }

    })
    /////////////////////       ESTA FUNCION CONSULTA LOS DATOS DE UNA FILA !SEGÚN EL TELÉFONO!    ////////////////////////
    async function consultarDatos(telefono){
        try {
            await doc.useServiceAccountAuth({
                client_email: CREDENTIALS.client_email,
                private_key: CREDENTIALS.private_key
            });
            await doc.loadInfo();
            let sheet = doc.sheetsByTitle['Hoja 1'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA  
            consultados = [];
            let rows = await sheet.getRows();
            try {
                for (let index = 0; index < rows.length; index++) {
                    const row = rows[index];
                    if (row.Telefono === telefono) {
                    
                        consultados['Reclamo'] = row.Reclamo                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:
                        consultados['Ubicacion'] = row.Ubicacion        
                        consultados['Barrio'] = row.Barrio                  // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
                        consultados['Telefono'] = row.Telefono
                        consultados['Edad'] = row.Edad
                        consultados['Estado'] = row.Estado
                    }
            
            }
            }catch (error) {
                console.error('Error al manejar el caso de Teléfono indefinido:', error);
                // Puedes manejar el error de la manera que prefieras
            }
                
        return consultados
        } catch (error) {
            console.error('Error al consultar datos:', error);
            throw error; // Vuelve a lanzar el error para que pueda ser manejado más arriba
        }
        
    };

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
                    return gotoFlow(flowAyuda);

                }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowTramites);
            return;
        }
        switch (opcion) {
            
        case 1: return gotoFlow(flowCrearReclamo);
        case 2: return gotoFlow(flowConsultar);
        default: return flowDynamic('No te entiendo 😢 ¿Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
        }
    });



    const flowCeresito = addKeyword(['ceresito', 'como usar ceresito'])
    .addAnswer('Si es la primera vez que chateás conmigo, te cuento algo de mí así me conocés mejor.')
    .addAnswer(['¿Sabías que soy un chatbot? Eso significa que:\n',

    '🤖 Podés hablarme cuando quieras porque estoy siempre en línea.\n',
    '🤖 Mis respuestas son automáticas, y todo el tiempo aprendo cosas nuevas.\n'], {delay: 1000})

    .addAnswer(['Para hablar conmigo lo mejor es usar frases simples, con pocas palabras.\n',

    'Mientras más corto sea el mensaje, mejor lo voy a entender. Por ejemplo:\n❌ No me escribas ‘Hola, es para preguntar si puedo sacar un turno el día martes’.\n\n✅ Mejor decime *Turnos* o escribí el número que le corresponda a la opción del menú que te interese.',
    ],{delay: 2000})

    .addAnswer(['¿Estás listo para charlar?\n',
                'Recordá que si no te entiendo o estás perdido, en todo momento podes escribir la palabra *Menú* para volver al menú principal.\n',
                '1. 👉 Si. ¡Comencemos!',
                '2. 👉 Todavía tengo dudas, ¿Podrías darme más información?'
    ],
    )
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = ctx.body.toLowerCase().trim();
        if (!["1", "2", "menu", "menú"].includes(opcion)) {
            errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);

                }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowCeresito);
            return;
        }
        switch (opcion) {
        case '1': return gotoFlow(flowMenu);
        case '2': return gotoFlow(flowCeresito);
        case 'menu': return gotoFlow(flowMenu)
        case 'menú': return gotoFlow(flowMenu)
        default: return flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
        }
    });



    const flowAgente = addKeyword('PELIGRO', {sensitive: true})
    .addAnswer('Estamos creando una conexion con un agente local...')
    .addAction(async (ctx, {provider}) => {
        const nanoid = await import('nanoid')
        const ID_GROUP = nanoid.nanoid(5)
        const refProvider = await provider.getInstance()
        await refProvider.groupCreate(`Guardia Local (${ID_GROUP})`,[
            `${ctx.from}@s.whatsapp.net`
        ])
    })


    const flowTramites = addKeyword(['Trámites', 'tramite', 'trámite', 'trámites', 'quiero hacer un tramite'])
    .addAnswer('Hacer trámites puede ser muy aburrido y estresante, por eso quiero facilitarte las cosas 💪')
    .addAnswer([
        'Ahora puedes hacer lo siguiente desde acá:',
        'Contame, ¿sobre qué necesitas saber?',
        'Escribí el número del menú sobre el tema que te interese para continuar.\n\n',
        '1. 👉 Camino rural',
        '2. 👉 Moratorias',
        '3. 👉 Cambiar de tema 🔄',
    ],
    )
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = ctx.body.toLowerCase().trim();
        if (!["1", "2", "3", "menu", "menú"].includes(opcion)) {
            errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);

                }
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

            await gotoFlow(flowTramites);
            return;
        }
        switch (opcion) {
            
        case '1': return flowDynamic('Si queres pagar este impuesto, hace clic acá 👇https://bit.ly/pagarimpuestosceres \n\n Volvé a escribir *Tramites* para volver al menú anterior o *Menú* para volver al menú principal.');
        case '2': return flowDynamic('Si estás adherido a una moratoria y queres pagarla, hace clic acá 👇 https://bit.ly/pagarimpuestosceres \n\n Volvé a escribir *Tramites* para volver al menú anterior o *Menú* para volver al menú principal.');
        case '3': return gotoFlow(flowMenu)
        case 'menu': return gotoFlow(flowMenu)
        case 'menú': return gotoFlow(flowMenu)
        default: return flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Menú* para volver a empezar')
        }
    });

        const flowLicencias = addKeyword(['Licencias', 'licencia', 'como sacar mi licencia'])
    .addAnswer('Si vas a conducir un vehículo, sí o sí necesitas contar con una licencia de conducir 🚗🚙🛵🚚🚜', 
    null, async (ctx, { provider } ) => {
        const sock = await provider.getInstance();
        const msgPoll = {
        sticker: {
        url:
        "media/licencia.webp"
        }
        };
        sock.sendMessage(ctx.key.remoteJid, msgPoll)
        })
    .addAnswer([
        'Elegí una de estas opciones y seguimos:',
        '1. 👉 Requisitos para sacar la licencia de conducir',
        '2. 👉 Sacar turno',
        '3. 👉 Cambiar de tema 🔄',
        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ])

        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1","2", "3", "menú", "menu"].includes(opcion)) {
                errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);

                }
                await flowDynamic("⚠️Opción no encontrada, por favor seleccione una opción válida.");
        
                await gotoFlow(flowLicencias);
                return;
            }
            switch (opcion) {
            case '1': return flowDynamic('Toda la info sobre licencias, como tipo de licencias, requisitos, renovación, pérdida y más, lo encontras acá 👇 https://ceres.gob.ar/turnos/ \n\n Escribí *Licencias* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '2': return flowDynamic('Ahora podes sacar tu turno desde acá 👇 https://ceres.gob.ar/turnos/ \n\n Escribí *Licencias* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '3': return gotoFlow(flowMenu)
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
            }
        });
        

        const flowCIC = addKeyword(['CIC', 'centro integrador comunitario', 'salud', 'telefono cic'])
        .addAnswer('El Centro de Integración Comunitaria se encuentra en Avenida Perón y Pasaje Melián. Te envío la ubicación:', )
        .addAction(async (ctx, { provider }) => {
            const id = ctx.key.remoteJid;
            await provider.sendLocation(id, -29.8802023, -61.9544215)
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

                if (errores > 3 )
                {
                    return gotoFlow(flowAyuda);
                }
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
        
                await gotoFlow(flowCIC);
                return;
            }
            switch (opcion) {
            case '1': return flowDynamic('En el CIC ofrecemos los siguientes servicios de salud 🩺\n\n Odontología \n Ginecología \n Médica clínica \n Obstetricia \n Pediatría \n Servicio de enfermería\n\n Escribí *CIC* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '2': return flowDynamic('Si necesitas ayuda con trámites, en el CIC te orientamos en: \n\n Retención del 20% de AUH \n Tarifa social \n Tarifa de servicio \n Becas Progresar \n Adultos 2000, plan para finalizar la secundaria \n Asesoramiento e inicio de trámites previsionales\n\n Para más info, acercate a Avenida Perón y Pje. Melián 📍\n\n Escribí *CIC* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '3': return gotoFlow(flowGenero);
            case '4': return gotoFlow(flowMenu);
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
            }
        });

        const flowMujerSegura = addKeyword('programa mujer segura')
        .addAnswer('Este programa fue una iniciativa de la actual gestión que tiene como fin prevenir la violencia de género y asistir en caso de ser necesario 🙌', {delay: 4000})
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
        
        
        const flowGenero = addKeyword(['Genero', 'género'])
        .addAnswer(['Decime qué necesitas saber 👇',
        '1. 👉 Información del área',
        '2. 👉 Información del programa “Mujer segura”',
        '3. 👉 Guardia 24 horas equipo local',
        '4. 👉 Volver al menú anterior 🔄',

        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],)
        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow, provider }) => {
            const opcion = ctx.body.toLowerCase().trim();

            
            if (!["1", "2", "3", "4", "menu", "menú"].includes(opcion)) {
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
        
                await gotoFlow(flowGenero);
                return;
            }
            switch (opcion) {
            case '1': return flowDynamic('Desde el área de género y diversidad, brindamos ayuda y asesoramiento a personas que sufren algún tipo de violencia por su género y/o condición 💜\n\nTenemos como fin la creación y puesta en acción de políticas públicas orientadas a promover, prevenir y erradicar cualquier tipo y todas las vulneraciones de derechos en infancias, adolescencias, familias, mujeres y diversidades sexuales \n Si queres conocer más sobre esta área o si necesitas ayuda, podes acercarte al CIC (Avenida Perón y Pje. Melián) o contactate al 3491560492 / 03491422353 🤳 \n\nEscribí *Genero* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '2': return gotoFlow(flowMujerSegura)
            case '3': return gotoFlow(flowNumeroGuardialocal)
            case '4': return gotoFlow(flowCIC)
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
            }
        });

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
        });
        
        const flowTurismo = addKeyword(['Turismo', 'hoteles', 'bares'])
        .addAnswer('¡Nuestra ciudad tiene un montón de cosas para disfrutar! 🤩',
        null, async (ctx, { provider } ) => {
            const sock = await provider.getInstance();
            const msgPoll = {
            sticker: {
            url:
            "media/turismo.webp"
            }
            };
            sock.sendMessage(ctx.key.remoteJid, msgPoll)
            })
        .addAnswer(['¿Sobre qué queres saber? 👇',
        '1. 👉 Hoteles',
        '2. 👉 Bares y restaurantes',
        '3. 👉 Atractivos turísticos',
        '4. 👉 Programación Usina cultural Ceres',
        '5. 👉 Cambiar de tema 🔄',
        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],)
        .addAction({ capture: true }, async (ctx, { flowDynamic, provider, gotoFlow, endFlow}) => {
            const id = ctx.key.remoteJid;
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1", "2", "3", "4", "5", "menu", "menú"].includes(opcion)) {
                errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);

                }
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.", {delay: 3000});
        
                await gotoFlow(flowTurismo);
                return;
            }
            switch (opcion) {
            case '1': return provider.sendImage(id, 'media/hoteles.png', 'Todos los hoteles y hospedajes de Ceres, en esta placa 🏨 \n\nEscribí *Turismo* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '2': return provider.sendImage(id, 'media/comedores.png', 'Todos los bares y restaurantes de Ceres, en esta placa 🍹 \n\nEscribí *Turismo* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '3': return provider.sendImage(id, 'media/atractivos.png', 'Todos los puntos turísticos y recreativos de Ceres, en esta placa 📸 \n\nEscribí *Turismo* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '4': return flowDynamic('🎬 Para conocer qué hay este fin de semana en la Usina cultural Ceres, entrá a las redes sociales oficiales\n\nInstagram: https://instagram.com/ceresturismo \nFacebook: https://facebook.com/ceresturismo\n\nEscribí *Turismo* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '5': return gotoFlow(flowMenu)
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
            }
            return endFlow(flowAyuda)
        });


        const flowHistoria = addKeyword('historia')
        .addAnswer('Acá te dejamos un pequeño resumen sobre la historia de nuestra querida ciudad 👇', {delay: 4000})
        .addAnswer(['El 1 de julio de 1892 Ceres se constituía como colonia gracias al decreto del entonces gobernador de Santa Fe, Juan M. Cafferata, en un momento de plena expansión del país.',
                    'Sin embargo, estas tierras se vieron habitadas varios años antes. En 1888, durante la presidencia del Dr. Miguel Juárez Celman y en un contexto de gran expansión de las redes ferroviarias, se estableció el kilómetro 125 en el actual territorio ceresino. ¿Qué significaba esto? Así se denominó a la estación ferroviaria de nuestra ciudad por ser la distancia que nos separaba de Sunchales, punta de riel hasta entonces. ',
                    'Es así que un 8 de abril de 1888 llegó el primer tren con materiales y personas que levantarían las instalaciones del nuevo punto. Sin embargo, ya había dos pobladores en las tierras de lo que hoy es Ceres: Don Gregorio Luna y Don Pedro Córdoba. Para el Cincuentenario de la ciudad, Luna había fallecido hacía muy poco y Córdoba se encontraba todavía vivo. En el libro de ese aniversario, se sostiene que estas dos personas “ayudaron en la tarea de amojonamiento del pueblo y de la colonia”.',
                    'Volviendo a la instalación del ferrocarril en la zona, esta acción generó que una gran cantidad de empleados se radicaran acá, lo que provocó que también se instalaran negocios para proveer de mercancía a los ferroviarios. Las tierras del km 125 pertenecían a la Sociedad Colonizadora Argentina, creada por Vicente Casares y Tristán Malbrán, quienes donaron los terrenos para la instalación de las vías y estaciones.',
                    'Con el correr de los años siguió incrementándose la cantidad de habitantes del kilómetro 125, principalmente con colonos de distintos puntos del país e inmigrantes, en su mayoría italianos, atraídos por las facilidades que se otorgaban para comprar tierras y con la comprobación de que eran sumamente aptas para el ganado y la agricultura. Por este motivo se comenzó a hacer referencia a la Diosa Ceres, diosa romana de la agricultura, las cosechas y la fecundidad.',
                    'Luego de 73 años de existencia y con 9.588 habitantes, sin haber llegado a las 10.000 requeridos, el gobernador Carlos S. Begnis declaró oficialmente ciudad a Ceres en el año 1961. Se trataron de más de 70 años caracterizados por una gran expansión cultural, social y económica: florecieron instituciones y la actividad económica creció a grandes ritmos, principalmente por el sector agropecuario. Ese mismo año, nuestra ciudad contabilizaba 120 tambos, 221 establecimientos agrícolas y 425 negocios.',
                    'Este año, la ciudad cumplió 131 años y según los últimos datos, estamos cerca de los 20.000 habitantes. Ceres se constituye como el centro comercial y de servicios más importante de la zona, teniendo un radio de influencia muy importante en toda el área.',
    ])
        .addAnswer('Escribí *Menú* para volver al menú principal.')

        const flowSeccionesPatio = addKeyword('Secciones patio')
        .addAnswer('Los residuos de patio se recogen una vez al mes y según las secciones de nuestra ciudad')
        .addAnswer(['Sección 1 ➡️ 1ra semana del mes',
                    'Sección 2 ➡️ 2da semana del mes',
                    'Sección 3 ➡️ 3ra semana del mes',
                    'Sección 4 ➡️ 4ta semana del mes'])
        .addAction(async (ctx, { provider }) => {
            const id = ctx.key.remoteJid;
            return provider.sendImage(id, 'media/secciones.png', 'Acá podes ver cuál es tu sección 🗺️');
        })
        .addAnswer(['*📢 Información importante*',
                    'Sacá los residuos la semana previa a que inicie la recolección en tu sección. Si los sacas cuando ya estamos recolectando en tu sección, es probable que hayamos pasado y los podamos buscar recién dentro de tres semanas 🚮  \n\nEscribí *Residuos* para volver al menú anterior o *Menú* para volver al menú principal.'])


        const flowResiduos = addKeyword(['separacion', 'residuos', 'separación residuos', 'separación'])
        .addAnswer('Separar los residuos es fundamental para el cuidado de nuestro planeta. Selecciona qué info necesitas saber 🌎')
        .addAnswer(['¿Sobre qué queres saber? 👇',
        '1. 👉 Separación y recolección residuos domiciliarios ♻️',
        '2. 👉 Separación y recolección residuos de patio 🍂',
        '3. 👉 Info sobre la Cooperativa de Trabajo “Reciclar Ceres” 💪',
        '4. 👉 Cambiar de tema 🔄',

        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],)
        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow,  }) => {
            const opcionresiduos = ctx.body.toLowerCase().trim();
            if (!["1", "2", "3", "4", "menu", "menú"].includes(opcionresiduos)) {
                errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);
                }
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
                await gotoFlow(flowResiduos);
                return;
            }
            switch (opcionresiduos) {
            case '1': return flowDynamic('Recorda sacar los residuos de la siguiente manera 👇 \n\n Residuos secos \n 📆 Los recogemos martes y viernes (sacalos la noche del lunes y del jueves) \n\n Residuos húmedos \n📆 Los recogemos lunes, miércoles, jueves y sábado \n\n\n *Algo muy importante: no dejes tus residuos en los pilares de luz porque no podremos recogerlos ‼️* \n\nEscribí *Residuos* para volver al menú anterior o *Menú* para volver al menú principal.');              
            case '2': return gotoFlow(flowSeccionesPatio);
            case '3': return flowDynamic('Hace muy poco, en nuestra ciudad se conformó legalmente, gracias al acompañamiento del municipio, la cooperativa de trabajo “Reciclar Ceres” ♻️\n\n Se trata de un paso súper importante ya que les brinda nuevas oportunidades para su desarrollo y crecimiento económico y profesional. Con su constitución tienen más independencia en sus acciones, podrán acceder a créditos y subsidios; contar con más estabilidad laboral, entre otras cuestiones 💪\n\n Cuando separas los residuos correctamente, colaboras con las personas de esta cooperativa, que trabajan diariamente en el Centro de Disposición Final. ¡Hacelo por el planeta, por vos y por ellos! 💚 \n\nEscribí *Residuos* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '4': return gotoFlow(flowMenu)
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
        }
        });


        const flowEducacion = addKeyword('educacion')
        .addAnswer('¿Querés estudiar? ¡Te felicitamos! En Ceres podes capacitarte en dos carreras universitarias y también en robótica 🤓')
        .addAnswer(['¿Sobre qué queres saber? 👇',
        '1. 👉 Tecnicaturas de la UTN en Ceres',
        '2. 👉 Robótica y Club de Ciencias',
        '3. 👉 Cambiar de tema 🔄',
        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],)
        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1", "2", "3", "menu", "menú"].includes(opcion)) {
                errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);
                }
                await flowDynamic('⚠️ Opción no encontrada, por favor seleccione una opción válida.');
                await gotoFlow(flowEducacion);
                return;
            }
            switch (opcion) {
            case '1': return flowDynamic('¡Genial! En Ceres podes cursar dos carreras con mucha salida laboral \n\n Tecnicatura en Administración Rural 📚 \n Tecnicatura en Programación 📚 \n\n Toda la información sobre estas carreras pertenecientes a la UTN, la encontras en este instagram 👇 https://instagram.com/utnceresextension \n\nEscribí *Educación* para volver al menú anterior o *Menú* para volver al menú principal.');              
            case '2': return flowDynamic('El Club de Ciencias fue una gestión realizada por el municipio y permite que niños, jóvenes y adolescentes puedan capacitarse en robótica 🤖 \n\n Si queres más información, contactate al 03491-421990 📞 \n\nEscribí *Educación* para volver al menú anterior o *Menú* para volver al menú principal.');
            case '3': return gotoFlow(flowMenu)
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
        }
        });


        const flowConsejoAdultos = addKeyword('consejo adultos mayores')
        .addAnswer('En el 2021, se conformó el Consejo de Adultos Mayores por impulso del Gobierno de la Ciudad 💛 \n\n Esta iniciativa tiene como fin trabajar en la participación ciudadana e impulsar acciones que mejoren la calidad de vida de los adultos mayores 💪')
        .addAnswer(['Actualmente, las comisiones se encuentran divididas de la siguiente manera:',
                    'Juegos, deporte y recreación',
                    'Salud',
                    'Cultura y educación',
                    'Género y diversidad'])
        .addAnswer('Si queres sumarte a esta propuesta, acercarte al CIC y te damos toda la info 💛')


        const flowActividadesAdultos = addKeyword('actividades adultos mayores')
        .addAnswer('Si querés sumarte a las actividades para adultos mayores, te dejamos todas las que ofrecemos 👇', {delay: 3000})
        .addAnswer(['*Ajedrez ♟️*',
                '📆 Lunes y miércoles',
                '⌚ 14 a 16 horas',
                '📍Salón de la Terminal de Ómnibus',
                'Dicta Facundo Domínguez\n',
                '*Taller Cognitivo “Reactiva” 🧠*',
                '📆 Martes',
                '⌚ 15 a 16 horas',
                '📍Paseo de la Vida',
                '📆 Miércoles',
                '⌚ 15 horas',
                '📍Vecinal del barrio Instituto',
                'Dicta Lic. Lourdes Villalba\n',
                '*Folclore 💃*',
                '📆 Miércoles y viernes',
                '⌚ 14.30 a 16.30 horas',
                '📍Paseo de la Vida',
                'Dicta Marcela Guerra\n',
                '*Cuerpo y movimiento 🤸‍♀️*',
                '📆 Martes y jueves',
                '⌚ 08 a 09 horas / 09 a 10 horas',
                '📍Sociedad italiana',
                'Dicta Vanesa Hauce\n',
                    'Tejo 🥏',
                    '📆 Lunes, miércoles y viernes',
                    '⌚ 14.30 a 17 horas',
                    '📍Paseo de la Vida',
                    'Dicta Paola Albertinazzi\n',
                    'Yoga 🧘',
                    '📆 Lunes y miércoles',
                    '⌚ 09 a 10 horas',
                    '📍Sociedad italiana',
                    'Dicta Amorela Griffa',
                ])
        .addAnswer('Para participar, agenda día y horario y acercate directamente a la actividad 😊')

        const flowAdultosmayores = addKeyword('actividades adultos mayores')
        .addAnswer('Desde el Gobierno de la Ciudad de Ceres impulsamos un montón de actividades para los adultos mayores 🤩')
        .addAnswer(['¿Sobre qué queres saber? 👇',
        '1. 👉 Consejo de Adultos Mayores 📣',
        '2. 👉 Actividades recreativas para adultos mayores 🧑‍🦳',
        '3. 👉 Cambiar de tema 🔄',
        '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],)

        .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            const opcion = ctx.body.toLowerCase().trim();
            if (!["1", "2", "3","menu", "menú"].includes(opcion)) {
                errores++;

                if (errores > 2 )
                {
                    return gotoFlow(flowAyuda);
                }
                await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");

                await gotoFlow(flowAdultosmayores);
                return;
            }

            errores = 0;
            switch (opcion) {
            case '1': return gotoFlow(flowConsejoAdultos);             
            case '2': return gotoFlow(flowActividadesAdultos)
            case '3': return gotoFlow(flowMenu)
            case 'menu': return gotoFlow(flowMenu)
            case 'menú': return gotoFlow(flowMenu)
            }
        }, 
        );


        const flowDengue = addKeyword('dengue')
        .addAnswer('Al dengue lo frenamos trabajando en equipo 💪')
        .addAnswer(['Toda la info sobre esta enfermedad, cómo se trasmite y cómo prevenirlo, lo encontras en nuestra página haciendo clic acá 👇 https://ceres.gob.ar/dengue/\n\n',
                    '¡Necesitamos de tu colaboración y acción para prevenirlo! 🦟🚫',
                    '\n\nEscribí *Menú* para volver al menú principal']
                    )

        const flowEmpty = addKeyword(EVENTS.ACTION)
                    .addAnswer("No te he entendido!", null, async ( { gotoFlow }) => {
                    return gotoFlow(flowPrincipal);
                    });







    const main = async () => {
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipalNombre, flowNumeroGuardialocal, flowReclamo, flowCrearReclamo, flowAgente, flowConsultar, flowMenu, flowPrincipal, flowEmpty, flowTramites, flowCIC, flowLicencias, flowGenero, flowTurismo, flowResiduos, flowSeccionesPatio, flowDengue, flowEducacion, flowAdultosmayores, flowActividadesAdultos, flowConsejoAdultos, flowMujerSegura, flowSeccionesPatio])
        const adapterProvider = createProvider(BaileysProvider)

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })

        QRPortalWeb()
    }

    main()
