const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a friendly and professional AI customer support assistant for "AI SupportFlow", a SaaS platform.

Your role:
- Answer customer questions clearly and concisely
- Be empathetic and helpful
- Use the FAQ context provided when relevant
- If you cannot confidently answer, honestly say so and suggest contacting the support team
- Keep responses under 150 words
- Never make up policies or information not in the context

Response style:
- Warm but professional
- Use bullet points for multi-step answers
- End with a helpful closing line

If the question is completely unrelated to customer support or the business, politely redirect.`;

/**
 * Generate an AI response using Gemini.
 * @param {string} userMessage - The user's question
 * @param {string|null} faqContext - Relevant FAQ content (if found)
 * @param {Array} history - Previous messages [{role, content}]
 */
async function generateResponse(userMessage, faqContext, history = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Build context-enriched prompt
  const contextBlock = faqContext
    ? `\n\n[RELEVANT FAQ CONTEXT]\n${faqContext}\n[END CONTEXT]\n`
    : "";

  const fullPrompt = `${SYSTEM_PROMPT}${contextBlock}\n\nCustomer message: ${userMessage}`;

  // Build conversation history for multi-turn
  const chatHistory = history.slice(-6).map((m) => ({
    role: m.role === "bot" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history: chatHistory });
  const result = await chat.sendMessage(fullPrompt);
  const response = result.response.text();

  return response;
}

module.exports = { generateResponse };
