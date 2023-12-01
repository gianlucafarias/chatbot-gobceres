

const ubicacionCIC = {
    longitude: -29.8802023,
    latitude: -61.9521255
}

const contact = {
    name: "Gian",
    phone: "+5493491440894"
}

const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
    EVENTS,
    
} = require('@bot-whatsapp/bot')


const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

let STATUS = {}

let errores = 0;
/*
const flowHola = addKeyword('console').addAnswer('Por favor, responde a las siguientes preguntas:')
.addAnswer(
'¿Que tipo de Reclamo es?',
'1. Cambio de Luminaria',
'2. Bache',
'3. Faltante de agua',

{capture:true},
async (ctx,{flowDynamic}) =>{

telefono = ctx.from
reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : ctx.body}                //➡️ Variable del STATUS
telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}        // Variable del STATUS
                                                                              // Ejemplo // NOMBRE VARIABLE = TATUS[telefono], NOMBRE VARIABLE : ctx.body

flowDynamic()
})
.addAnswer(
'¿Podes decirme donde está ubicado?',
{capture:true},
async (ctx,{flowDynamic}) =>{
   
telefono = ctx.from
ubicacion = STATUS[telefono] = {...STATUS[telefono], ubicacion : ctx.body}
flowDynamic()
})
.addAnswer(
'Dime tus apellidos',
{capture:true},
async (ctx,{flowDynamic}) =>{


telefono = ctx.from
apellidos = STATUS[telefono] = {...STATUS[telefono], apellidos : ctx.body}      //Variable del STATUS
console.log(STATUS[telefono].sexo)
flowDynamic()
})
.addAnswer('¿Qué edad tienes?',
{capture:true},
async (ctx,{flowDynamic}) =>{


    telefono = ctx.from
    edad = STATUS[telefono] = {...STATUS[telefono], edad : ctx.body}            //Variable del STATUS
/////////////////////       ESTA FUNCION AÑADE UNA FILA A SHEETS    /////////////////////////
   ingresarDatos();  
   async function ingresarDatos(){
    console.log(STATUS[telefono].sexo)
    let rows = [{
   // Ejemplo: // CABECERA DE SHEET : VARIABLE        //                             ➡️   Paso 3 - Aquí añades las variables creadas
   
    Reclamo: STATUS[telefono].reclamo,    
    Ubicacion: STATUS[telefono].ubicacion,
    Apellidos: STATUS[telefono].apellidos,
    Telefono: STATUS[telefono].telefono,
    Edad: STATUS[telefono].edad,
    Estado: STATUS[telefono].estado
   
        }];
   
    await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByIndex[0];
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            await sheet.addRow(row);}
}

await flowDynamic ([{body:`Perfecto ${STATUS[telefono].nombre}, espero que te haya parecido sencillo el formulario 😁`}])
await flowDynamic ({body:`Puedes consultar tus datos escribiendo *Consultar mis datos* o haciendo clic aquí:`, buttons:[{body:'🔍 Consultar mis datos 🔍'}]})
});
//////////////////////////// FLUJO PARA CONSULTAR DATOS /////////////////////////////////////////////////////////

const flowConsultar = addKeyword('Consultar mis datos','🔍 Consultar mis datos 🔍')
.addAnswer(['Dame unos segundo, estoy buscando tus datos dentro del sistema... 🔍'])
.addAnswer(['Según el teléfono del cuál me estas escribiendo, tengo estos datos:'],{delay:3000}, async (ctx, {flowDynamic}) =>{
telefono = ctx.from

const consultar = await consultarDatos(telefono)

const Sexo = consultados['Sexo']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
const Nombre = consultados['Nombre']
const Apellidos = consultados['Apellidos']
const Telefono = consultados['Telefono']
const Edad = consultados['Edad']

await flowDynamic(`- *Sexo*: ${Sexo}\n- *Nombre*: ${Nombre}\n- *Apellidos*: ${Apellidos}\n- *Telefono*: ${Telefono}\n- *Edad*: ${Edad}`)
})
/////////////////////       ESTA FUNCION CONSULTA LOS DATOS DE UNA FILA !SEGÚN EL TELÉFONO!    ////////////////////////
   async function consultarDatos(telefono){
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle['Hoja 1'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA  
    consultados = [];
    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.Telefono === telefono) {
           
            consultados['Sexo'] = row.Sexo                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:
            consultados['Nombre'] = row.Nombre        
            consultados['Apellidos'] = row.Apellidos                  // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
            consultados['Telefono'] = row.Telefono
            consultados['Edad'] = row.Edad
        }
           
}          
return consultados
};


const flowSacarTurno = addKeyword('turno')
    .addAnswer('decime tu nombre', {capture:true},
    async (ctx, { state }) => {
        firstname = ctx.body.toString(); // se almacena en la tabla wp_amelia_customer_bookings campo info
        state.update({NOMBRE : ctx.body});
    }
    )
    .addAnswer('decime tu apellido', {capture:true},
    async (ctx, { state }) => {
        lastname = ctx.body.toString(); // se almacena en la tabla wp_amelia_customer_bookings campo info
        state.update({APELLIDO : ctx.body});
    }
    )
    .addAnswer('decime tu correo electronico', {capture:true},
    async (ctx, { state }) => {
        correo = ctx.body.toString(); // se almacena en la tabla wp_amelia_customer_bookings campo info
        state.update({MAIL : ctx.body});
    }
    )
    .addAnswer('decime tu dni', {capture: true},
    async (ctx, { state }) => {
        dni = ctx.body // se almacena en wp_amelia_customer_bookings 1 customFields
    })
    .addAnswer('Seleccione el tipo de tramite:') 
    .addAnswer(['1. Nueva licencia',
                '2. Renovación de Licencia',{capture:true}, 
    async (ctx, { state }) => {
        const categoria = parseInt(ctx.body); // se almacena en wp_amelia_categories
    }
    ])
    

*/

const flowAyuda = addKeyword('ayuda')
    .addAnswer('Parece que no encuentro la opción que buscas. ¿Necesitas ayuda?')
    .addAnswer('Escribí la palabra *Hola* para volver al menú principal. También podes escribir *Trámites*, *CIC*, *Género* o *Licencias* para otras opciones')
    errores= 0;



const flowTramites = addKeyword('Tramites')
  .addAnswer('Hacer trámites puede ser muy aburrido y estresante, por eso quiero facilitarte las cosas 💪')
  .addAnswer([
    'Ahora puedes hacer lo siguiente desde acá:',
    'Contame, ¿sobre qué necesitas saber?',
    '1. 👉 Camino rural',
    '2. 👉 Moratorias',
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
        
      case 1: return flowDynamic('Si queres pagar este impuesto, hace clic acá 👇https://bit.ly/pagarimpuestosceres \n\n Volvé a escribir *Tramites* para volver al menú anterior o *Hola* para volver al menú principal.');
      case 2: return flowDynamic('Si estás adherido a una moratoria y queres pagarla, hace clic acá 👇 https://bit.ly/pagarimpuestosceres \n\n Volvé a escribir *Tramites* para volver al menú anterior o *Hola* para volver al menú principal.');
      default: return flowDynamic('No te entiendo 😢 Necesitas ayuda? Escribí la palabra *Hola* para volver a empezar')
    }
  });

    const flowLicencias = addKeyword('Licencias')
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

    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
   ])

      .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2].includes(opcion)) {
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
          case 1: return flowDynamic('Toda la info sobre licencias, como tipo de licencias, requisitos, renovación, pérdida y más, lo encontras acá 👇 https://ceres.gob.ar/turnos/ \n\n Escribí *Licencias* para volver al menú anterior o *Hola* para volver al menú principal.');
          case 2: return flowDynamic('Ahora podes sacar tu turno desde acá 👇 https://ceres.gob.ar/turnos/ \n\n Escribí *Licencias* para volver al menú anterior o *Hola* para volver al menú principal.');
        }
      });
    

    const flowCIC = addKeyword('CIC')
    .addAnswer('El Centro de Integración Comunitaria se encuentra en Avenida Perón y Pasaje Melián. Te envío la ubicación:')
    .addAction(async (ctx, { provider }) => {
        const id = ctx.key.remoteJid;
        await provider.sendLocation(id, -29.8802023, -61.9544215)
    })
    .addAnswer(['Acá brindamos un montón de servicios, por ejemplo: ',
    '1. 👉 Salud 👩‍⚕️',
    '2. 👉 Acción social 🤝',
    '3. 👉 Género y diversidad 💜',

    '\n\n Elegí alguna de esas opciones y te ayudo. ',

    ],)
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2, 3].includes(opcion)) {
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
        case 1: return flowDynamic('En el CIC ofrecemos los siguientes servicios de salud 🩺\n\n Odontología \n Ginecología \n Médica clínica \n Obstetricia \n Pediatría \n Servicio de enfermería\n\n Escribí *CIC* para volver al menú anterior o *Hola* para volver al menú principal.');
        case 2: return flowDynamic('Si necesitas ayuda con trámites, en el CIC te orientamos en: \n\n Retención del 20% de AUH \n Tarifa social \n Tarifa de servicio \n Becas Progresar \n Adultos 2000, plan para finalizar la secundaria \n Asesoramiento e inicio de trámites previsionales\n\n Para más info, acercate a Avenida Perón y Pje. Melián 📍\n\n Escribí *CIC* para volver al menú anterior o *Hola* para volver al menú principal.');
        case 3: return gotoFlow(flowGenero);
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
    
    
    const flowGenero = addKeyword('Genero')
    .addAnswer(['Decime qué necesitas saber 👇',
    '1. 👉 Información del área',
    '2. 👉 Información del programa “Mujer segura”',
    '3. 👉 Guardia 24 horas equipo local',

    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2].includes(opcion)) {
            await flowDynamic("⚠️ Opción no encontrada, por favor seleccione una opción válida.");
    
            await gotoFlow(flowGenero);
            return;
        }
        switch (opcion) {
        case 1: return flowDynamic('Desde el área de género y diversidad, brindamos ayuda y asesoramiento a personas que sufren algún tipo de violencia por su género y/o condición 💜 \n\n Tenemos como fin la creación y puesta en acción de políticas públicas orientadas a promover, prevenir y erradicar cualquier tipo y todas las vulneraciones de derechos en infancias, adolescencias, familias, mujeres y diversidades sexuales \n Si queres conocer más sobre esta área o si necesitas ayuda, podes acercarte al CIC (Avenida Perón y Pje. Melián) o contactate al 3491560492 / 03491422353 🤳 \n\nEscribí *Genero* para volver al menú anterior o *Hola* para volver al menú principal.');
        case 2: return gotoFlow(flowMujerSegura);
        }
    });

    
    const flowTurismo = addKeyword('Turismo')
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

    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)
    .addAction({ capture: true }, async (ctx, { flowDynamic, provider, gotoFlow, endFlow}) => {
        const id = ctx.key.remoteJid;
        const opcion = parseInt(ctx.body);
        if (![1, 2, 3, 4].includes(opcion)) {
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
        case 1: return provider.sendImage(id, 'media/hoteles.png', 'Todos los hoteles y hospedajes de Ceres, en esta placa 🏨 \n\nEscribí *Turismo* para volver al menú anterior o *Hola* para volver al menú principal.');
        case 2: return provider.sendImage(id, 'media/comedores.png', 'Todos los bares y restaurantes de Ceres, en esta placa 🍹 \n\nEscribí *Turismo* para volver al menú anterior o *Hola* para volver al menú principal.');
        case 3: return provider.sendImage(id, 'media/atractivos.png', 'Todos los puntos turísticos y recreativos de Ceres, en esta placa 📸 \n\nEscribí *Turismo* para volver al menú anterior o *Hola* para volver al menú principal.');
        case 4: return flowDynamic('🎬 Para conocer qué hay este fin de semana en la Usina cultural Ceres, entrá a las redes sociales oficiales\n\nInstagram: https://instagram.com/ceresturismo \nFacebook: https://facebook.com/ceresturismo\n\nEscribí *Turismo* para volver al menú anterior o *Hola* para volver al menú principal.');

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
    .addAnswer('Escribí *Hola* para volver al menú principal.')

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
                'Sacá los residuos la semana previa a que inicie la recolección en tu sección. Si los sacas cuando ya estamos recolectando en tu sección, es probable que hayamos pasado y los podamos buscar recién dentro de tres semanas 🚮  \n\nEscribí *Residuos* para volver al menú anterior o *Hola* para volver al menú principal.'])


    const flowResiduos = addKeyword('separacion', 'residuos')
    .addAnswer('Separar los residuos es fundamental para el cuidado de nuestro planeta. Selecciona qué info necesitas saber 🌎')
    .addAnswer(['¿Sobre qué queres saber? 👇',
    '1. 👉 Separación y recolección residuos domiciliarios ♻️',
    '2. 👉 Separación y recolección residuos de patio 🍂',
    '3. 👉 Info sobre la Cooperativa de Trabajo “Reciclar Ceres” 💪',

    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow,  }) => {
        const opcionresiduos = parseInt(ctx.body);
        if (![1, 2, 3].includes(opcionresiduos)) {
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
        case 1: return flowDynamic('Recorda sacar los residuos de la siguiente manera 👇 \n\n Residuos secos \n 📆 Los recogemos martes y viernes (sacalos la noche del lunes y del jueves) \n\n Residuos húmedos \n📆 Los recogemos lunes, miércoles, jueves y sábado \n\n\n *Algo muy importante: no dejes tus residuos en los pilares de luz porque no podremos recogerlos ‼️* \n\nEscribí *Residuos* para volver al menú anterior o *Hola* para volver al menú principal.');              
        case 2: return gotoFlow(flowSeccionesPatio);
        case 3: return flowDynamic('Hace muy poco, en nuestra ciudad se conformó legalmente, gracias al acompañamiento del municipio, la cooperativa de trabajo “Reciclar Ceres” ♻️\n\n Se trata de un paso súper importante ya que les brinda nuevas oportunidades para su desarrollo y crecimiento económico y profesional. Con su constitución tienen más independencia en sus acciones, podrán acceder a créditos y subsidios; contar con más estabilidad laboral, entre otras cuestiones 💪\n\n Cuando separas los residuos correctamente, colaboras con las personas de esta cooperativa, que trabajan diariamente en el Centro de Disposición Final. ¡Hacelo por el planeta, por vos y por ellos! 💚 \n\nEscribí *Residuos* para volver al menú anterior o *Hola* para volver al menú principal.');
        }
    });


    const flowEducacion = addKeyword('educacion')
    .addAnswer('¿Querés estudiar? ¡Te felicitamos! En Ceres podes capacitarte en dos carreras universitarias y también en robótica 🤓')
    .addAnswer(['¿Sobre qué queres saber? 👇',
    '1. 👉 Tecnicaturas de la UTN en Ceres',
    '2. 👉 Robótica y Club de Ciencias',
    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2].includes(opcion)) {
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
        case 1: return flowDynamic('¡Genial! En Ceres podes cursar dos carreras con mucha salida laboral \n\n Tecnicatura en Administración Rural 📚 \n Tecnicatura en Programación 📚 \n\n Toda la información sobre estas carreras pertenecientes a la UTN, la encontras en este instagram 👇 https://instagram.com/utnceresextension \n\nEscribí *Educación* para volver al menú anterior o *Hola* para volver al menú principal.');              
        case 2: return flowDynamic('El Club de Ciencias fue una gestión realizada por el municipio y permite que niños, jóvenes y adolescentes puedan capacitarse en robótica 🤖 \n\n Si queres más información, contactate al 03491-421990 📞 \n\nEscribí *Educación* para volver al menú anterior o *Hola* para volver al menú principal.');
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
    '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
    ],)

    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow, provider }) => {
        const opcion = parseInt(ctx.body);

        if (![1, 2].includes(opcion)) {
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
        case 1: return gotoFlow(flowConsejoAdultos);              
        case 2: return gotoFlow(flowActividadesAdultos);
        }
    }, 
    );


    const flowDengue = addKeyword('dengue')
    .addAnswer('Al dengue lo frenamos trabajando en equipo 💪')
    .addAnswer(['Toda la info sobre esta enfermedad, cómo se trasmite y cómo prevenirlo, lo encontras en nuestra página haciendo clic acá 👇 https://ceres.gob.ar/dengue/\n\n',
                '¡Necesitamos de tu colaboración y acción para prevenirlo! 🦟🚫',
                '\n\nEscribí *Hola* para volver al menú principal']
                )

    const flowEmpty = addKeyword(EVENTS.ACTION)
                .addAnswer("No te he entendido!", null, async ( { gotoFlow }) => {
                  return gotoFlow(flowPrincipal);
                });


const flowPrincipal = addKeyword('hola', 'menu')
    .addAnswer('🙌 ¡Hola! Soy Ceresito, el chatbot del Gobierno de la Ciudad de Ceres 🍒', null, async (ctx, { provider } ) => {
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
   //         '10. 👉 Reclamos 📝',
            '\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
        ],

        { delay: 4000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic }) => {
            const option = ctx.body.toLowerCase().trim();
        
            if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "hola"].includes(option)) {
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
            
        }
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowEmpty, flowTramites, flowCIC, flowLicencias, flowGenero, flowTurismo, flowResiduos, flowSeccionesPatio, flowDengue, flowEducacion, flowAdultosmayores, flowActividadesAdultos, flowConsejoAdultos, flowMujerSegura, flowSeccionesPatio])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
