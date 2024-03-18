const {
    createFlow
} = require('@bot-whatsapp/bot')

const flowCrearReclamo = require("./crearReclamo")
const flowCeresito = require("./flowCeresito") //⬅️⬅️⬅️ Tiene Fallback
const flowTramites = require("./flowTramites") //⬅️⬅️⬅️ Tiene Fallback 
const flowLicencias = require("./flowLicencias")
const flowMujerSegura = require("./flowMujerSegura") //⬅️⬅️⬅️ Tiene Fallback
const flowCIC = require("./flowCic") //⬅️⬅️⬅️ Tiene Fallback
const flowTurismo = require("./flowTurismo") //⬅️⬅️⬅️ Tiene Fallback
const flowHistoria = require("./flowHistoria") //⬅️⬅️⬅️ Tiene Fallback 
const flowSeccionesPatio = require("./flowSeccionesPatio")
const flowResiduos = require("./flowResiduos") //⬅️⬅️⬅️ Tiene Fallback
const flowEducacion = require("./flowEducacion") //⬅️⬅️⬅️ Tiene Fallback
const flowConsejoAdultos = require("./flowConsejoAdultos")  //⬅️⬅️⬅️ Tiene Fallback
const flowAdultosmayores = require("./flowAdultosmayores") //⬅️⬅️⬅️ Tiene Fallback 
const flowActividadesAdultos = require("./flowActividadesAdultos") //⬅️⬅️⬅️ Tiene Fallback
const flowDengue = require("./flowDengue") //⬅️⬅️⬅️ Tiene Fallback
const flowGenero = require("./flowGenero") //⬅️⬅️⬅️ Tiene Fallback
const flowAyuda = require("./flowAyuda") //⬅️⬅️⬅️ Tiene Fallback 
const flowMenu = require("./flowMenu") //⬅️⬅️⬅️ Tiene Fallback
const flowNumeroGuardialocal = require("./flowNumeroGuardialocal") //⬅️⬅️⬅️ Tiene Fallback
const { flowInactividad
} = require("./idleCasero");
const flowPrincipal = require('./flowPrincipal') //⬅️⬅️⬅️ Tiene Fallback
const flowAgente = require('./flowAgente')
const flowReclamo = require('./reclamos/flowReclamo')
const flowConsultar = require('./reclamos/flowConsultar')
const flowLlamarMenu = require('./flowLlamarMenu') //⬅️⬅️⬅️ Tiene Fallback
//const flowHistoriaGpt = require('./flowHistoriaGpt')
const flowPrimeraVez = require('./flowPrimeraVez')


const adapterFlow = createFlow([flowPrimeraVez, flowLlamarMenu, flowInactividad, flowNumeroGuardialocal, flowHistoria, flowCeresito, flowReclamo, flowCrearReclamo, flowAgente, flowConsultar, flowMenu, flowPrincipal, flowTramites, flowCIC, flowLicencias, flowGenero, flowTurismo, flowResiduos, flowSeccionesPatio, flowDengue, flowEducacion, flowAdultosmayores, flowActividadesAdultos, flowConsejoAdultos, flowMujerSegura, flowSeccionesPatio, flowAyuda])

module.exports =  adapterFlow ;
