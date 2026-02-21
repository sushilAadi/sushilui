// app/providers.js
"use client"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { useEffect } from "react"

let posthogInitialized = false

export function CSPostHogProvider({ children }) {
  useEffect(() => {
    if (!posthogInitialized && typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
        loaded: () => { posthogInitialized = true }
      })
      posthogInitialized = true
    }
  }, [])

  return (
    <PostHogProvider client={posthog}>
      {children}
    </PostHogProvider>
  )
}