import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createEvent } from "effector";
import { supabase } from "~/supabase_client";

type AuthStateChangePayload = {
  event: AuthChangeEvent;
  session: Session | null;
};

const authStateChanged = createEvent<AuthStateChangePayload>();

authStateChanged.watch((payload) => console.log("called with", payload));

supabase.auth.onAuthStateChange((event, session) => {
  console.log("auth state changed");
  authStateChanged({ event, session });
});
