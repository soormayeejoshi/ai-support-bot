import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

export const sendMessage = (message, conversationId) =>
  api.post('/chat', { message, conversationId }).then((r) => r.data)

export const fetchTickets = () =>
  api.get('/tickets').then((r) => r.data)

export const resolveTicket = (id) =>
  api.patch(`/tickets/${id}`).then((r) => r.data)

export const escalateManually = (conversationId, userQuery) =>
  api.post('/tickets/escalate', { conversationId, userQuery }).then((r) => r.data)

export default api
