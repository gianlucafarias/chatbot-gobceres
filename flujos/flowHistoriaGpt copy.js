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

  const { runChat } = require("../services/langchain/chat");

  const {comprobarhistory} = require('../services/langchain/history.layer')

  const { OpenAI, OpenAIEmbeddings } = require("@langchain/openai");
 const { RetrievalQAChain } = require("langchain/chains");
// import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");

const { join } = require('path');

  const flowHistoriaGpt = addKeyword('historia')
        .addAction(comprobarhistory)
        .addAnswer('¿Sobre qué te gustaría conocer? Preguntame 👇' ,

        { delay: 1000, capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic, state  }) => {
            const question = ctx?.body
            
        })






module.exports = flowHistoriaGpt;