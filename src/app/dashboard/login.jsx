'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function DashboardLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/dashboard/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        window.location.reload()
      } else {
        setError('Wrong password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] p-4 relative overflow-hidden" style={{ fontFamily: "'Matangi', sans-serif" }}>
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Minimal branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-[15px] font-medium text-white/90 tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-white/30 mt-1">Enter password to continue</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              autoFocus
              className={`w-full h-12 bg-white/[0.04] border rounded-xl px-4 pr-11 text-[14px] text-white placeholder:text-white/20 outline-none transition-all duration-200 ${
                error
                  ? 'border-red-500/40 focus:border-red-500/60'
                  : 'border-white/[0.06] focus:border-white/20 hover:border-white/10'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400/80 text-[12px] pl-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full h-12 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-[1.5px] border-black/30 border-t-black rounded-full animate-spin" />
                <span>Verifying</span>
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
