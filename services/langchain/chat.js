const { OpenAIEmbeddings } = require("@langchain/openai");
// const { PineconeStore } = require("@langchain/pinecone");
// const connect = require("../pinecone/connect");
const { chainIntent } = require("./index");
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
const { join } = require('path');

/**
 * 
 * @param {*} question 
 * @returns 
 */
const runChat = async (
    history = [],
    question,
) => {
//    const pinecone = await connect()
 //   const index = pinecone.Index(`${process.env.PINECONE_INDEX_NAME}`);

    const pastMessages = history.map((message) => {
        if (message.role === "assistant") {
            return `AI: ${message.content}\n` //AI: te recomiendo aprender..
        }
        if (message.role === "user") {
            return `Human: ${message.content}\n`  //Human: quiero un curso sobre node
        }
    }).join('\n')

    const VECTOR_STORE_PATH = join(process.cwd(), 'vectorstore')
    const loadedVectorStore = await HNSWLib.load(VECTOR_STORE_PATH, new OpenAIEmbeddings())

    const chain = chainIntent(loadedVectorStore);
    const sanitizedQuestion = question.trim().replace("\n", " ");

    const response = await chain.invoke({
        question: sanitizedQuestion,
        chatHistory: pastMessages
    });

    return { response };
};


module.exports = { runChat }