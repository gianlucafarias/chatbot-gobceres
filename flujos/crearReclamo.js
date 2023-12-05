
let STATUS = {}

const flowCrearReclamo = addKeyword('console').addAnswer('Queremos que nuestra Ciudad esté cada vez más linda. 🌈\n\n Por eso, si ves algo que necesite arreglo o se pueda mejorar, podés hacer tu solicitud desde acá.')

.addAnswer(['Contame, ¿Que tipo de Reclamo es?\n',
'1. 👉 Higiene urbana 🗑',
'2. 👉 Árboles 🌳',
'3. 👉 Arreglos 🚧',
'4. 👉 Consultar solicitud',

'\n\n Escribí el número del menú sobre el tema que te interese para continuar.',
],
{capture:true},
async (ctx,{flowDynamic}) =>{

telefono = ctx.from
if (ctx.body == '1')
reclamo = STATUS[telefono] = {...STATUS[telefono], reclamo : ctx.body}                //➡️ Variable del STATUS
telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from} 
// Variable del STATUS
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
'¿Podes especificarme en que barrio se encuentra?',
{capture:true},
async (ctx,{flowDynamic}) =>{


telefono = ctx.from
barrio = STATUS[telefono] = {...STATUS[telefono], barrio : ctx.body}      //Variable del STATUS
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
    Barrio: STATUS[telefono].barrio,
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