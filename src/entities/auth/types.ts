import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export type AuthStateChangePayload = {
  event: AuthChangeEvent
  session: Session | null
}

export type Credentials = {
  email: string
  password: string
}
