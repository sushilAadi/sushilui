import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import DashboardLogin from './login'
import DashboardContent from './dashboard-content'

export const metadata = {
  title: 'Dashboard - Sushil Sharma',
  robots: { index: false, follow: false },
}

async function fetchPostHogEvents() {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (!apiKey) return null

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const res = await fetch(
      `${host}/api/event/?after=${thirtyDaysAgo}&limit=1000`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 300 }, // cache for 5 minutes
      }
    )

    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  // Check authentication
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('dashboard_auth')
  const isAuthenticated = authCookie?.value === 'authenticated'

  if (!isAuthenticated) {
    return <DashboardLogin />
  }

  // Fetch data in parallel
  const supabase = await createClient()

  const [messagesResult, posthogEvents] = await Promise.all([
    supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false }),
    fetchPostHogEvents(),
  ])

  const messages = messagesResult.data || []

  return <DashboardContent messages={messages} posthogEvents={posthogEvents} />
}
