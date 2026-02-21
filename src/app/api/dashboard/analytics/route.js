import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_PERSONAL_KEY = process.env.POSTHOG_PERSONAL_API_KEY

function getApiKey() {
  return POSTHOG_PERSONAL_KEY || POSTHOG_KEY
}

async function isAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get('dashboard_auth')
  return token?.value === 'authenticated'
}

export async function GET(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = getApiKey()
  if (!apiKey) {
    return NextResponse.json({ error: 'PostHog API key not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    switch (type) {
      case 'events': {
        const days = parseInt(searchParams.get('days') || '30')
        const after = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

        const res = await fetch(`${POSTHOG_HOST}/api/event/?after=${after}&limit=1000`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        if (!res.ok) {
          const text = await res.text()
          return NextResponse.json(
            { error: 'PostHog API error', details: text, status: res.status },
            { status: res.status }
          )
        }

        const data = await res.json()
        return NextResponse.json(data)
      }

      case 'insights': {
        const res = await fetch(`${POSTHOG_HOST}/api/projects/@current/insights/?limit=10`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        if (!res.ok) {
          const text = await res.text()
          return NextResponse.json(
            { error: 'PostHog API error', details: text, status: res.status },
            { status: res.status }
          )
        }

        const data = await res.json()
        return NextResponse.json(data)
      }

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics', message: err.message },
      { status: 500 }
    )
  }
}
