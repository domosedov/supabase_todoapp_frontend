import {
  createEffect,
  createEvent,
  createStore,
  sample,
  scopeBind,
} from "effector";
import { debug } from "patronum";
import { supabase } from "~/supabase_client";
import type { AuthStateChangePayload, Credentials } from "./types";
import { isBrowser } from "~/shared/env";
import { Nullable } from "~/shared/types";
import { ApiError, Session, Subscription, User } from "@supabase/supabase-js";
import { getClientScope } from "~/scope";

export const $authStateChangesListener =
  createStore<Nullable<Subscription>>(null);
export const watchAuthStateChanges = createEvent();
export const watchAuthStateChangesFx = createEffect<
  void,
  Nullable<Subscription>
>();
export const unwatchAuthStateChanges = createEvent();
export const unwatchAuthStateChangesFx = createEffect<Subscription, void>();
const authStateChanged = createEvent<AuthStateChangePayload>();
const setServerSessionFx = createEffect<AuthStateChangePayload, void>();

watchAuthStateChangesFx.use(() => {
  const scope = getClientScope();
  console.log(scope);
  const bindedAuthStateChanged = scopeBind(authStateChanged, { scope: scope! });
  const { data: listener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      console.log("auth state changed");
      bindedAuthStateChanged({ event, session });
    }
  );

  return listener;
});

unwatchAuthStateChangesFx.use((listener) => {
  listener.unsubscribe();
});

$authStateChangesListener.on(
  watchAuthStateChangesFx.doneData,
  (_, listener) => listener
);

sample({
  clock: watchAuthStateChanges,
  target: watchAuthStateChangesFx,
});

sample({
  clock: unwatchAuthStateChanges,
  source: $authStateChangesListener,
  filter: (listener): listener is Subscription => listener != null,
  target: unwatchAuthStateChangesFx,
});

authStateChanged.watch((payload) => console.log("called with", payload));

setServerSessionFx.use(async ({ event, session }) => {
  await fetch("/api/auth-session", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
});

sample({
  clock: authStateChanged,
  target: setServerSessionFx,
});

// Sign In
export const signIn = createEvent<Credentials>();
export const signInFx = createEffect<Credentials, void, ApiError>();

signInFx.use(async (credentials) => {
  const { error } = await supabase.auth.signIn(credentials);
  if (error) {
    throw error;
  }
});

sample({
  clock: signIn,
  target: signInFx,
});

// Sign Up
export const signUp = createEvent<Credentials>();
export const signUpFx = createEffect<Credentials, unknown>();

signUpFx.use(async (credentials) => {
  const result = await supabase.auth.signUp(credentials);
  console.log(result);
});

sample({
  clock: signUp,
  target: signUpFx,
});

// Sign Out
export const signOut = createEvent();
export const signOutFx = createEffect();

signOutFx.use(async () => {
  const result = await supabase.auth.signOut();
  console.log("sign out", result);
});

sample({
  clock: signOut,
  target: signOutFx,
});

// User & Session
export const $session = createStore<Nullable<Session>>(null);
export const $user = createStore<Nullable<User>>(null);

export const $isLoggedIn = $session.map((session) => !!session);

sample({
  clock: authStateChanged,
  fn: ({ session }) => session,
  target: $session,
});

sample({
  clock: authStateChanged,
  fn: ({ session }) => session?.user ?? null,
  target: $user,
});

debug($session, $user, $isLoggedIn);

$isLoggedIn.watch((v) => console.log("is logged in", v));
