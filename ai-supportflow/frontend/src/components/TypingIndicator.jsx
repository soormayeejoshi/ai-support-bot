export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-fade-up">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-wa-teal flex items-center justify-center flex-shrink-0 mb-1 shadow">
        <span className="text-xs">🤖</span>
      </div>
      {/* Bubble */}
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-dot1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-dot2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-dot3 inline-block" />
      </div>
    </div>
  )
}
