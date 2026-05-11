// In-memory storage for MVP simplicity
// Replace with SQLite or a DB for production

const store = {
  conversations: [], // { id, messages: [{role, content, timestamp}], createdAt }
  tickets: [],       // { id, conversationId, userQuery, status, timestamp, resolvedAt }
  ticketCounter: 1,
  convCounter: 1,
};

// ── Conversations ──────────────────────────────────────────────

function createConversation() {
  const conv = {
    id: `conv_${store.convCounter++}`,
    messages: [],
    createdAt: new Date().toISOString(),
  };
  store.conversations.push(conv);
  return conv;
}

function getConversation(id) {
  return store.conversations.find((c) => c.id === id) || null;
}

function addMessage(conversationId, role, content) {
  let conv = getConversation(conversationId);
  if (!conv) conv = createConversation();
  const msg = { role, content, timestamp: new Date().toISOString() };
  conv.messages.push(msg);
  return msg;
}

// ── Tickets ────────────────────────────────────────────────────

function createTicket(conversationId, userQuery) {
  const ticket = {
    id: `TKT-${String(store.ticketCounter++).padStart(4, "0")}`,
    conversationId,
    userQuery,
    status: "open",
    timestamp: new Date().toISOString(),
    resolvedAt: null,
  };
  store.tickets.push(ticket);
  return ticket;
}

function getAllTickets() {
  return [...store.tickets].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}

function resolveTicket(id) {
  const ticket = store.tickets.find((t) => t.id === id);
  if (!ticket) return null;
  ticket.status = "resolved";
  ticket.resolvedAt = new Date().toISOString();
  return ticket;
}

module.exports = {
  createConversation,
  getConversation,
  addMessage,
  createTicket,
  getAllTickets,
  resolveTicket,
};
