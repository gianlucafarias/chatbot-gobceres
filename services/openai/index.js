const { OpenAI } = require("openai");

/**
 * 
 * @param {*} prompt 
 * @param {*} text 
 * @returns 
 */
const chat = async (prompt, text) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: prompt},
        { role: "user", content: text },
      ],
      temperature: 0.5
    });

    return completion.choices[0].message;
  } catch (err) {
    console.log(err);
    return "ERROR";
  }
};


module.exports = { chat };