import { createEffect, createEvent, sample } from "effector";
import { supabase } from "~/supabase_client";
import { AuthStateChangePayload, Credentials } from "./types";

const authStateChanged = createEvent<AuthStateChangePayload>();

authStateChanged.watch((payload) => console.log("called with", payload));

supabase.auth.onAuthStateChange((event, session) => {
  console.log("auth state changed");
  authStateChanged({ event, session });
});

// Sign In
export const signIn = createEvent<Credentials>();
export const signInFx = createEffect<Credentials, unknown>();

signInFx.use(async (credentials) => {
  await supabase.auth.signIn(credentials);
});

sample({
  clock: signIn,
  target: signInFx,
});

// Sign Up
export const signUp = createEvent<Credentials>();
export const signUpFx = createEffect<Credentials, unknown>();

signUpFx.use(async (credentials) => {
  await supabase.auth.signUp(credentials);
});

sample({
  clock: signUp,
  target: signUpFx,
});
