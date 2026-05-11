import { useState, useRef, useEffect } from 'react'
import MessageBubble from '../components/MessageBubble'
import TypingIndicator from '../components/TypingIndicator'
import { sendMessage, escalateManually } from '../utils/api'

const WELCOME_MSG = {
  role: 'bot',
  content: "👋 Hi there! I'm the AI SupportFlow assistant. I can help you with refunds, delivery, account issues, subscriptions, payments, and more.\n\nHow can I help you today?",
  timestamp: new Date().toISOString(),
}

const QUICK_REPLIES = [
  '📦 Track my order',
  '💳 Payment failed',
  '🔄 Refund policy',
  '❌ Cancel subscription',
  '🔐 Account locked',
]

export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [escalated, setEscalated] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const appendMsg = (msg) =>
    setMessages((prev) => [...prev, { ...msg, timestamp: new Date().toISOString() }])

  const handleSend = async (text) => {
    const userText = (text || input).trim()
    if (!userText || loading) return

    setInput('')
    appendMsg({ role: 'user', content: userText })
    setLoading(true)

    try {
      const data = await sendMessage(userText, conversationId)

      if (!conversationId) setConversationId(data.conversationId)

      appendMsg({
        role: 'bot',
        content: data.reply,
        isEscalation: data.escalated,
        ticketId: data.ticket?.id || null,
      })

      if (data.escalated) setEscalated(true)
    } catch (err) {
      appendMsg({
        role: 'bot',
        content: '⚠️ Sorry, I ran into an error. Please try again in a moment.',
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleHumanRequest = async () => {
    if (loading) return
    const userText = "I'd like to talk to a human agent please."
    appendMsg({ role: 'user', content: userText })
    setLoading(true)
    try {
      const data = await sendMessage(userText, conversationId)
      if (!conversationId) setConversationId(data.conversationId)
      appendMsg({
        role: 'bot',
        content: data.reply,
        isEscalation: true,
        ticketId: data.ticket?.id || null,
      })
      setEscalated(true)
    } catch {
      appendMsg({ role: 'bot', content: '⚠️ Could not escalate. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-2 py-4 min-h-[calc(100vh-56px)]">
      {/* Chat window */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
           style={{ height: 'calc(100vh - 100px)', maxHeight: '780px' }}>

        {/* Chat Header */}
        <div className="bg-wa-header px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 bg-wa-teal rounded-full flex items-center justify-center text-lg">🤖</div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-wa-green border-2 border-wa-header rounded-full" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">AI SupportFlow</p>
            <p className="text-wa-green text-xs">Online · Typically replies instantly</p>
          </div>
          <div className="ml-auto flex items-center gap-3 text-white/60 text-lg">
            <button title="Search" className="hover:text-white transition-colors">🔍</button>
            <button title="More" className="hover:text-white transition-colors">⋮</button>
          </div>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5c5c5' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundColor: '#ECE5DD',
          }}
        >
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies (show only at start) */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap bg-wa-panel border-t border-gray-100">
            <p className="w-full text-xs text-gray-400 pt-2 pb-1">Quick questions:</p>
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                onClick={() => handleSend(qr)}
                className="text-xs bg-white border border-gray-200 text-gray-600 hover:border-wa-green hover:text-wa-dark px-3 py-1.5 rounded-full transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="bg-wa-panel px-3 py-3 flex items-end gap-2 flex-shrink-0 border-t border-gray-200">
          {/* Talk to Human button */}
          {!escalated && (
            <button
              onClick={handleHumanRequest}
              disabled={loading}
              title="Talk to a human agent"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-600 text-lg flex items-center justify-center transition-colors disabled:opacity-40"
            >
              👤
            </button>
          )}

          {/* Text input */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex items-end px-3 py-2 shadow-sm">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={escalated ? 'A human agent will be in touch soon…' : 'Type a message…'}
              disabled={loading}
              rows={1}
              className="w-full resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent leading-relaxed max-h-24 overflow-y-auto"
              style={{ minHeight: '22px' }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-wa-green hover:bg-wa-dark text-white text-lg flex items-center justify-center transition-colors disabled:opacity-40 shadow"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              '➤'
            )}
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-400 mt-3 text-center">
        Powered by Gemini AI · Press 👤 to escalate to a human agent
      </p>
    </div>
  )
}
