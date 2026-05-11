const express = require("express");
const router = express.Router();
const { generateResponse } = require("./geminiService");
const { findRelevantFAQ, wantsHumanAgent, isLowConfidence } = require("./faqMatcher");
const { getConversation, createConversation, addMessage, createTicket } = require("../data/store");

/**
 * POST /chat
 * Body: { message: string, conversationId?: string }
 * Returns: { reply, conversationId, escalated, ticket? }
 */
router.post("/", async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Get or create conversation
    let conv = conversationId ? getConversation(conversationId) : null;
    if (!conv) conv = createConversation();

    // Save user message
    addMessage(conv.id, "user", message);

    // Check for explicit human agent request
    if (wantsHumanAgent(message)) {
      const ticket = createTicket(conv.id, message);
      addMessage(conv.id, "bot", "I've connected you with a human agent. A support ticket has been created.");
      return res.json({
        reply: "I've escalated your request to a human support agent. 🎫 A ticket has been created and someone from our team will reach out to you shortly. Your ticket ID is **" + ticket.id + "**.",
        conversationId: conv.id,
        escalated: true,
        ticket,
      });
    }

    // FAQ matching
    const { faq, score } = findRelevantFAQ(message);
    const faqContext = faq
      ? `Q: ${faq.question}\nA: ${faq.answer}`
      : null;

    // Generate AI response
    const history = conv.messages.slice(-10); // last 10 messages for context
    const aiReply = await generateResponse(message, faqContext, history);

    // Check if AI response signals low confidence → escalate
    const shouldEscalate = isLowConfidence(aiReply);
    let ticket = null;

    if (shouldEscalate) {
      ticket = createTicket(conv.id, message);
    }

    // Save bot message
    addMessage(conv.id, "bot", aiReply);

    return res.json({
      reply: aiReply,
      conversationId: conv.id,
      escalated: shouldEscalate,
      ticket: shouldEscalate ? ticket : null,
      faqMatched: !!faq,
    });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

module.exports = router;
