import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '~/supabase_client'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}
