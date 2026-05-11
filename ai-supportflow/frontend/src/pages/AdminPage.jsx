import { useState, useEffect, useCallback } from 'react'
import TicketRow from '../components/TicketRow'
import { fetchTickets, resolveTicket as apiResolve } from '../utils/api'

export default function AdminPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [resolvingId, setResolvingId] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'open' | 'resolved'
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const loadTickets = useCallback(async () => {
    try {
      const data = await fetchTickets()
      setTickets(data.tickets)
      setLastRefresh(new Date())
      setError(null)
    } catch {
      setError('Could not load tickets. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTickets()
    const interval = setInterval(loadTickets, 15000) // auto-refresh every 15s
    return () => clearInterval(interval)
  }, [loadTickets])

  const handleResolve = async (id) => {
    setResolvingId(id)
    try {
      await apiResolve(id)
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: 'resolved', resolvedAt: new Date().toISOString() } : t
        )
      )
    } catch {
      alert('Failed to resolve ticket. Try again.')
    } finally {
      setResolvingId(null)
    }
  }

  const filtered = tickets.filter((t) => {
    if (filter === 'open') return t.status === 'open'
    if (filter === 'resolved') return t.status === 'resolved'
    return true
  })

  const openCount = tickets.filter((t) => t.status === 'open').length
  const resolvedCount = tickets.filter((t) => t.status === 'resolved').length

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Support Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Escalated tickets requiring human attention
            </p>
          </div>
          <button
            onClick={loadTickets}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-wa-teal bg-white border border-gray-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <StatCard label="Total Tickets" value={tickets.length} icon="🎫" color="blue" />
          <StatCard label="Open" value={openCount} icon="🔴" color="amber" />
          <StatCard label="Resolved" value={resolvedCount} icon="✅" color="green" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {['all', 'open', 'resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
              filter === f
                ? 'bg-wa-teal text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-wa-teal hover:text-wa-teal'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">
          Auto-refreshes every 15s · Last: {lastRefresh.toLocaleTimeString()}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <span className="w-5 h-5 border-2 border-wa-green border-t-transparent rounded-full animate-spin" />
            Loading tickets…
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400 text-sm">{error}</p>
            <button onClick={loadTickets} className="mt-3 text-xs text-wa-teal underline">
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-3xl mb-3">📭</p>
            <p className="text-sm">
              {filter === 'all' ? 'No tickets yet. Escalations will appear here.' : `No ${filter} tickets.`}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Query</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  onResolve={handleResolve}
                  resolving={resolvingId === ticket.id}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        AI SupportFlow Admin · All times in local timezone
      </p>
    </div>
  )
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    green: 'bg-emerald-50 border-emerald-100 text-emerald-600',
  }
  return (
    <div className={`rounded-xl border p-4 flex items-center gap-3 ${colors[color]}`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs font-medium opacity-70">{label}</p>
      </div>
    </div>
  )
}
