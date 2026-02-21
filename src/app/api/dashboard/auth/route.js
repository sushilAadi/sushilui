import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'sushilNe62w'
const COOKIE_NAME = 'dashboard_auth'
const TOKEN_VALUE = 'authenticated'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (password !== DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, TOKEN_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  if (token?.value === TOKEN_VALUE) {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
