const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();
const { getAllTickets, resolveTicket, createTicket, getConversation } = require("../data/store");

/**
 * GET /tickets
 * Returns all escalation tickets sorted by newest first.
 */
router.use(adminAuth);
router.get("/", (req, res) => {
  const tickets = getAllTickets();
  res.json({ tickets, total: tickets.length });
});

/**
 * POST /escalate
 * Body: { conversationId: string, userQuery: string }
 * Manually create an escalation ticket.
 */
router.post("/escalate", (req, res) => {
  const { conversationId, userQuery } = req.body;
  if (!conversationId || !userQuery) {
    return res.status(400).json({ error: "conversationId and userQuery are required." });
  }
  const ticket = createTicket(conversationId, userQuery);
  res.status(201).json({ ticket });
});

/**
 * PATCH /tickets/:id
 * Resolve a ticket by ID.
 */
router.patch("/:id", (req, res) => {
  const ticket = resolveTicket(req.params.id);
  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found." });
  }
  res.json({ ticket });
});

module.exports = router;
