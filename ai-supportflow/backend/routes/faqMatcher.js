const faqs = require("../data/faqs");

/**
 * Simple keyword-based FAQ retrieval.
 * Returns the best matching FAQ entry and a score (0–1).
 */
function findRelevantFAQ(userMessage) {
  const msg = userMessage.toLowerCase();

  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let hits = 0;
    for (const keyword of faq.keywords) {
      if (msg.includes(keyword.toLowerCase())) hits++;
    }
    const score = hits / faq.keywords.length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  // Return match only if at least one keyword matched
  return bestScore > 0
    ? { faq: bestMatch, score: bestScore }
    : { faq: null, score: 0 };
}

/**
 * Check if the user message explicitly requests a human agent.
 */
function wantsHumanAgent(userMessage) {
  const triggers = ["human", "agent", "real person", "talk to someone", "speak to", "support team", "escalate"];
  const msg = userMessage.toLowerCase();
  return triggers.some((t) => msg.includes(t));
}

/**
 * Check if the AI response signals low confidence.
 */
function isLowConfidence(aiResponse) {
  const signals = [
    "i'm not sure",
    "i don't know",
    "i cannot",
    "i'm unable",
    "unclear",
    "please contact",
    "beyond my knowledge",
    "not certain",
    "cannot help",
  ];
  const lower = aiResponse.toLowerCase();
  return signals.some((s) => lower.includes(s));
}

module.exports = { findRelevantFAQ, wantsHumanAgent, isLowConfidence };
