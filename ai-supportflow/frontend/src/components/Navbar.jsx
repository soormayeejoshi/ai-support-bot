import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-wa-teal shadow-md z-50 relative">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-wa-green rounded-full flex items-center justify-center shadow">
            <span className="text-base">💬</span>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">
            AI <span className="text-wa-green">SupportFlow</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <NavLink to="/" active={pathname === '/'} label="Chat" icon="🗨️" />
          <NavLink to="/admin" active={pathname === '/admin'} label="Admin" icon="📋" />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, active, label, icon }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
        active
          ? 'bg-white/20 text-white'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
