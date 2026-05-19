import { redirect } from 'next/navigation'

// Registrierung läuft jetzt direkt über /auth
export default function RegistrierenPage() {
  redirect('/auth')
}
