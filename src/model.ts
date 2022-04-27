import { createClient, AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createStore, createEffect, createEvent } from "effector";

type AuthStateChangeEvent = { event: AuthChangeEvent; session: Session | null };

const authStateChanged = createEvent<AuthStateChangeEvent>();

authStateChanged.watch((payload) => console.log("called with", payload));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  authStateChanged({ event, session });
});
