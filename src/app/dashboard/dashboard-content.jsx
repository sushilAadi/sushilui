'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import {
  LogOut, Mail, Phone, Clock, ExternalLink, Search,
  ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

const ACCENT = '#c8ff00'
const PIE_COLORS = ['#c8ff00', '#ffffff']

function Metric({ label, value, sub, trend }) {
  return (
    <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
      <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium">{label}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-semibold text-white tracking-tight leading-none">{value}</span>
        {trend !== undefined && trend !== 0 && (
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium mb-0.5 ${trend > 0 ? 'text-[#c8ff00]' : 'text-red-400'}`}>
            {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      {sub && <p className="text-[11px] text-white/20 mt-1.5">{sub}</p>}
    </div>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 shadow-2xl">
      <p className="text-[10px] text-white/40 mb-0.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-[13px] font-semibold text-white">
          {entry.value}
        </p>
      ))}
    </div>
  )
}

function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 ${className}`}>
      <p className="text-[12px] uppercase tracking-[0.12em] text-white/30 font-medium mb-4">{title}</p>
      {children}
    </div>
  )
}

export default function DashboardContent({ messages, posthogEvents }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedMessage, setExpandedMessage] = useState(null)
  const [sortBy, setSortBy] = useState('newest')
  const [filterSource, setFilterSource] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  const messageStats = useMemo(() => {
    if (!messages?.length) return { total: 0, thisMonth: 0, bySource: [], overTime: [], bySubject: [], trend: 0 }

    const now = new Date()
    const thisMonth = messages.filter(m => {
      const d = new Date(m.created_at)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const lastMonth = messages.filter(m => {
      const d = new Date(m.created_at)
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
    })

    const trend = lastMonth.length > 0
      ? Math.round(((thisMonth.length - lastMonth.length) / lastMonth.length) * 100)
      : thisMonth.length > 0 ? 100 : 0

    const sourceMap = {}
    messages.forEach(m => { sourceMap[m.source || 'form'] = (sourceMap[m.source || 'form'] || 0) + 1 })
    const bySource = Object.entries(sourceMap).map(([name, value]) => ({ name, value }))

    const dayMap = {}
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    for (let d = new Date(thirtyDaysAgo); d <= now; d.setDate(d.getDate() + 1)) {
      dayMap[d.toISOString().split('T')[0]] = 0
    }
    messages.forEach(m => {
      const key = new Date(m.created_at).toISOString().split('T')[0]
      if (dayMap[key] !== undefined) dayMap[key]++
    })
    const overTime = Object.entries(dayMap).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      messages: count,
    }))

    const subjectMap = {}
    messages.forEach(m => { subjectMap[m.subject || 'No Subject'] = (subjectMap[m.subject || 'No Subject'] || 0) + 1 })
    const bySubject = Object.entries(subjectMap)
      .map(([name, value]) => ({ name: name.length > 25 ? name.slice(0, 25) + '...' : name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)

    return { total: messages.length, thisMonth: thisMonth.length, bySource, overTime, bySubject, trend }
  }, [messages])

  const analyticsData = useMemo(() => {
    if (!posthogEvents?.results?.length) return null

    const events = posthogEvents.results
    const pageviews = events.filter(e => e.event === '$pageview')
    const uniquePersons = new Set(events.map(e => e.distinct_id)).size

    const pvDayMap = {}
    const now = new Date()
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      pvDayMap[d.toISOString().split('T')[0]] = 0
    }
    pageviews.forEach(e => {
      const key = new Date(e.timestamp).toISOString().split('T')[0]
      if (pvDayMap[key] !== undefined) pvDayMap[key]++
    })
    const pageviewsOverTime = Object.entries(pvDayMap).map(([date, views]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views,
    }))

    const pageMap = {}
    pageviews.forEach(e => {
      const path = e.properties?.$pathname || e.properties?.$current_url || '/'
      const cleanPath = path.replace(/https?:\/\/[^/]+/, '') || '/'
      pageMap[cleanPath] = (pageMap[cleanPath] || 0) + 1
    })
    const topPages = Object.entries(pageMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    const eventTypeMap = {}
    events.forEach(e => {
      if (!e.event.startsWith('$')) {
        eventTypeMap[e.event] = (eventTypeMap[e.event] || 0) + 1
      }
    })
    const eventBreakdown = Object.entries(eventTypeMap)
      .map(([name, value]) => ({
        name: name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    return { totalPageviews: pageviews.length, uniqueVisitors: uniquePersons, totalEvents: events.length, pageviewsOverTime, topPages, eventBreakdown }
  }, [posthogEvents])

  const filteredMessages = useMemo(() => {
    let filtered = messages || []
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(m =>
        m.name?.toLowerCase().includes(term) || m.email?.toLowerCase().includes(term) ||
        m.subject?.toLowerCase().includes(term) || m.message?.toLowerCase().includes(term)
      )
    }
    if (filterSource !== 'all') filtered = filtered.filter(m => (m.source || 'form') === filterSource)
    return filtered.sort((a, b) => sortBy === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at))
  }, [messages, searchTerm, sortBy, filterSource])

  async function handleLogout() {
    await fetch('/api/dashboard/auth', { method: 'DELETE' })
    window.location.reload()
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'messages', label: 'Messages' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#c8ff00]/20 selection:text-[#c8ff00]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#09090b]/70 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-[14px] font-semibold tracking-tight">Dashboard</span>
            <nav className="hidden sm:flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://clarity.microsoft.com/projects/view/ve2tmvmj5u/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-white/25 hover:text-white/60 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              <ExternalLink size={12} />
              <span>Clarity</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[11px] text-white/25 hover:text-white/60 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              <LogOut size={12} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Mobile tab selector */}
        <div className="sm:hidden flex items-center gap-1 mb-6 p-1 bg-white/[0.03] rounded-xl border border-white/[0.05]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-lg text-[12px] font-medium transition-all ${
                activeTab === tab.id ? 'bg-white/[0.08] text-white' : 'text-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {(activeTab === 'overview' || activeTab === 'analytics') && (
          <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Metric label="Messages" value={messageStats.total} sub="All time" />
              <Metric
                label="This Month"
                value={messageStats.thisMonth}
                sub={new Date().toLocaleDateString('en-US', { month: 'long' })}
                trend={messageStats.trend}
              />
              <Metric label="Page Views" value={analyticsData?.totalPageviews ?? '—'} sub="Last 30 days" />
              <Metric label="Visitors" value={analyticsData?.uniqueVisitors ?? '—'} sub="Last 30 days" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              {/* Messages over time — wide */}
              <ChartCard title="Messages — 30 days" className="lg:col-span-3">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={messageStats.overTime}>
                      <defs>
                        <linearGradient id="msgFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={ACCENT} stopOpacity={0.15} />
                          <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.1)', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} width={24} />
                      <Tooltip content={<ChartTooltip />} />
                      <Area type="monotone" dataKey="messages" stroke={ACCENT} strokeWidth={1.5} fill="url(#msgFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              {/* Source breakdown */}
              <ChartCard title="Source" className="lg:col-span-2">
                <div className="h-[220px] flex items-center justify-center">
                  {messageStats.bySource.length > 0 ? (
                    <div className="w-full flex items-center gap-4">
                      <div className="w-[140px] h-[140px] mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={messageStats.bySource}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              dataKey="value"
                              paddingAngle={3}
                              stroke="none"
                            >
                              {messageStats.bySource.map((_, i) => (
                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        {messageStats.bySource.map((s, i) => (
                          <div key={s.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                            <span className="text-[11px] text-white/40 capitalize">{s.name}</span>
                            <span className="text-[12px] text-white font-medium">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[12px] text-white/15">No data</p>
                  )}
                </div>
              </ChartCard>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Subjects */}
              <ChartCard title="Top Subjects">
                {messageStats.bySubject.length > 0 ? (
                  <div className="space-y-2.5">
                    {messageStats.bySubject.map((s, i) => {
                      const max = messageStats.bySubject[0]?.value || 1
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] text-white/50 truncate max-w-[200px]">{s.name}</span>
                            <span className="text-[12px] text-white font-medium">{s.value}</span>
                          </div>
                          <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${(s.value / max) * 100}%`, backgroundColor: ACCENT }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-[160px] flex items-center justify-center">
                    <p className="text-[12px] text-white/15">No data</p>
                  </div>
                )}
              </ChartCard>

              {/* Page Views or PostHog placeholder */}
              {analyticsData ? (
                <ChartCard title="Page Views — 30 days">
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData.pageviewsOverTime}>
                        <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                        <YAxis tick={{ fill: 'rgba(255,255,255,0.1)', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} width={24} />
                        <Tooltip content={<ChartTooltip />} />
                        <Line type="monotone" dataKey="views" stroke="#fff" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
              ) : (
                <ChartCard title="Analytics">
                  <div className="h-[180px] flex flex-col items-center justify-center gap-2">
                    <p className="text-[12px] text-white/20">PostHog data unavailable</p>
                    <p className="text-[10px] text-white/10 text-center max-w-[240px] leading-relaxed">
                      Add <span className="text-white/30 font-mono">POSTHOG_PERSONAL_API_KEY</span> to .env.local to enable traffic analytics
                    </p>
                  </div>
                </ChartCard>
              )}
            </div>

            {/* PostHog deep analytics */}
            {analyticsData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Top Pages */}
                <ChartCard title="Top Pages">
                  <div className="space-y-2">
                    {analyticsData.topPages.map((page, i) => {
                      const max = analyticsData.topPages[0]?.value || 1
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-[10px] text-white/15 w-4 text-right font-mono">{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[12px] text-white/50 truncate font-mono">{page.name}</span>
                              <span className="text-[12px] text-white/70 font-medium ml-2">{page.value}</span>
                            </div>
                            <div className="w-full h-0.5 bg-white/[0.03] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${(page.value / max) * 100}%`, backgroundColor: 'rgba(255,255,255,0.15)' }}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ChartCard>

                {/* Events */}
                <ChartCard title="Custom Events">
                  {analyticsData.eventBreakdown.length > 0 ? (
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.eventBreakdown} layout="vertical" margin={{ left: 0 }}>
                          <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.1)', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
                          <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} tickLine={false} axisLine={false} width={120} />
                          <Tooltip content={<ChartTooltip />} />
                          <Bar dataKey="value" fill={ACCENT} radius={[0, 3, 3, 0]} barSize={12} opacity={0.7} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-[12px] text-white/15">No events</p>
                    </div>
                  )}
                </ChartCard>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {(activeTab === 'messages' || activeTab === 'overview') && (
          <div className={activeTab === 'overview' ? 'mt-6' : ''}>
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-[13px] font-semibold text-white/80">Inbox</h2>
                <span className="text-[11px] text-white/20 tabular-nums">{filteredMessages.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8 bg-white/[0.03] border border-white/[0.05] rounded-lg pl-8 pr-3 text-[12px] text-white placeholder:text-white/15 outline-none focus:border-white/15 transition-colors w-48"
                  />
                </div>
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="h-8 bg-white/[0.03] border border-white/[0.05] rounded-lg px-2 text-[12px] text-white/50 outline-none focus:border-white/15 transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="form">Form</option>
                  <option value="chatbot">Chatbot</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-8 bg-white/[0.03] border border-white/[0.05] rounded-lg px-2 text-[12px] text-white/50 outline-none focus:border-white/15 transition-colors appearance-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Messages */}
            {filteredMessages.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] py-16 text-center">
                <p className="text-[13px] text-white/15">No messages found</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredMessages.map((msg) => {
                  const isOpen = expandedMessage === msg.id
                  return (
                    <div
                      key={msg.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'bg-white/[0.03] border-white/[0.08]'
                          : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedMessage(isOpen ? null : msg.id)}
                        className="w-full text-left px-4 py-3 flex items-center gap-3"
                      >
                        {/* Avatar */}
                        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold"
                          style={{ backgroundColor: msg.source === 'chatbot' ? 'rgba(200,255,0,0.1)' : 'rgba(255,255,255,0.06)', color: msg.source === 'chatbot' ? ACCENT : 'rgba(255,255,255,0.5)' }}
                        >
                          {msg.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-white/80 truncate">{msg.name || 'Unknown'}</span>
                            <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-px rounded ${
                              msg.source === 'chatbot' ? 'text-[#c8ff00]/60 bg-[#c8ff00]/[0.06]' : 'text-white/20 bg-white/[0.04]'
                            }`}>
                              {msg.source || 'form'}
                            </span>
                          </div>
                          <p className="text-[11px] text-white/20 truncate mt-0.5">
                            {msg.subject || msg.message?.slice(0, 80) || 'No subject'}
                          </p>
                        </div>

                        {/* Date & expand */}
                        <div className="shrink-0 flex items-center gap-2">
                          <span className="text-[10px] text-white/15 tabular-nums hidden sm:block">
                            {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <div className="text-white/15">
                            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </div>
                      </button>

                      {/* Expanded */}
                      {isOpen && (
                        <div className="px-4 pb-4 ml-11">
                          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3">
                            <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-[#c8ff00] transition-colors">
                              <Mail size={11} /> {msg.email}
                            </a>
                            {msg.phone && (
                              <a href={`tel:${msg.phone}`} className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors">
                                <Phone size={11} /> {msg.phone}
                              </a>
                            )}
                            {msg.best_time_to_call && (
                              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/20">
                                <Clock size={11} /> {msg.best_time_to_call}
                              </span>
                            )}
                            <span className="text-[10px] text-white/10 tabular-nums">
                              {new Date(msg.created_at).toLocaleString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
                              })}
                            </span>
                          </div>
                          {msg.subject && (
                            <p className="text-[12px] text-white/50 font-medium mb-1.5">{msg.subject}</p>
                          )}
                          <p className="text-[12px] text-white/30 whitespace-pre-wrap leading-[1.7]">
                            {msg.message || 'No message content'}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
