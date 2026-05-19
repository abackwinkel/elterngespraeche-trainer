import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase'
import { createServerClient } from '@supabase/ssr'

const TRIAL_DAYS = 7

function isTrialActive(trialStartedAt: string): boolean {
  return new Date(trialStartedAt).getTime() + TRIAL_DAYS * 86400000 > Date.now()
}

const PUBLIC_PREFIXES = ['/impressum', '/datenschutz', '/paywall']
const AUTH_PREFIX = '/auth'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  const isPublicRoute = PUBLIC_PREFIXES.some(p => pathname.startsWith(p))
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX)

  const supabase = createMiddlewareClient(request, response)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isPublicRoute || isAuthRoute || !user) {
    return response
  }

  const serviceClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: profile } = await serviceClient
    .from('user_profiles')
    .select('subscription_status, trial_started_at')
    .eq('id', user.id)
    .single()

  if (!profile) {
    if (pathname !== '/paywall') {
      return NextResponse.redirect(new URL('/paywall', request.url))
    }
    return response
  }

  const { subscription_status, trial_started_at } = profile

  const hasAccess =
    subscription_status === 'active' ||
    subscription_status === 'beta' ||
    (subscription_status === 'trial' && isTrialActive(trial_started_at))

  if (!hasAccess && pathname !== '/paywall') {
    return NextResponse.redirect(new URL('/paywall', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|favicon.ico).*)',
  ],
}
