function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Minimal bold/newline renderer (no markdown library needed)
function renderText(text) {
  if (!text) return null
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return (
      <p key={i} className={i > 0 ? 'mt-1' : ''}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    )
  })
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-up">
        <div className="max-w-[75%]">
          <div className="bg-wa-light text-gray-800 rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm">
            <div className="text-sm leading-relaxed">{message.content}</div>
          </div>
          <div className="text-right mt-0.5">
            <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
            <span className="text-xs text-wa-green ml-1">✓✓</span>
          </div>
        </div>
      </div>
    )
  }

  // Escalation notice
  const isEscalation = message.isEscalation

  return (
    <div className="flex items-end gap-2 animate-fade-up">
      {/* Bot avatar */}
      <div className="w-7 h-7 rounded-full bg-wa-teal flex items-center justify-center flex-shrink-0 mb-5 shadow">
        <span className="text-xs">{isEscalation ? '🎫' : '🤖'}</span>
      </div>
      <div className="max-w-[75%]">
        <div
          className={`rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm ${
            isEscalation
              ? 'bg-amber-50 border border-amber-200'
              : 'bg-white'
          }`}
        >
          {isEscalation && (
            <p className="text-xs font-semibold text-amber-600 mb-1 uppercase tracking-wide">
              Escalated to Human Agent
            </p>
          )}
          <div className="text-sm leading-relaxed text-gray-800 bubble-text">
            {renderText(message.content)}
          </div>
          {message.ticketId && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-mono text-gray-400">Ticket: {message.ticketId}</span>
            </div>
          )}
        </div>
        <div className="mt-0.5">
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}
