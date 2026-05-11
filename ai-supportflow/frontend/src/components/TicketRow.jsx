export default function TicketRow({ ticket, onResolve, resolving }) {
  const isOpen = ticket.status === 'open'
  const date = new Date(ticket.timestamp)
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-slide-in">
      <td className="px-4 py-3">
        <span className="font-mono text-xs text-wa-teal font-semibold bg-teal-50 px-2 py-0.5 rounded">
          {ticket.id}
        </span>
      </td>
      <td className="px-4 py-3 max-w-xs">
        <p className="text-sm text-gray-700 truncate" title={ticket.userQuery}>
          {ticket.userQuery}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 font-mono text-[10px]">
          conv: {ticket.conversationId}
        </p>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            isOpen ? 'badge-open' : 'badge-resolved'
          }`}
        >
          {isOpen ? '🔴 Open' : '✅ Resolved'}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-gray-500">
        <span>{dateStr}</span>
        <span className="mx-1 text-gray-300">·</span>
        <span>{timeStr}</span>
      </td>
      <td className="px-4 py-3">
        {isOpen ? (
          <button
            onClick={() => onResolve(ticket.id)}
            disabled={resolving}
            className="text-xs bg-wa-green hover:bg-wa-dark text-white font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {resolving ? (
              <>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resolving…
              </>
            ) : (
              '✓ Resolve'
            )}
          </button>
        ) : (
          <span className="text-xs text-gray-400">
            {ticket.resolvedAt
              ? new Date(ticket.resolvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : '—'}
          </span>
        )}
      </td>
    </tr>
  )
}
