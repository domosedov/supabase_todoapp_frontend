import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

invariant(supabaseUrl, "Missing SUPABASE_URL env var");
invariant(supabaseAnonKey, "Missing SUPABASE_ANON_KEY env var");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
