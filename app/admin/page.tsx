import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServerClient } from '@supabase/ssr'
import AdminClient from './AdminClient'

const ADMIN_EMAIL = 'antje@antje-backwinkel.de'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/auth/login')
  }

  const serviceClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { data: codes } = await serviceClient
    .from('beta_codes')
    .select('code, note, used_by, used_at, created_at')
    .order('created_at', { ascending: false })

  return <AdminClient initialCodes={codes ?? []} />
}
