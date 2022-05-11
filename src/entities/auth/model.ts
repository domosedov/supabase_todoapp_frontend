import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
  scopeBind,
  split,
} from "effector";
import { debug, status } from "patronum";
import { supabase } from "~/supabase_client";
import type { AuthStateChangePayload, Credentials } from "./types";
import { Nullable } from "~/shared/types";
import { ApiError, Session, Subscription, User } from "@supabase/supabase-js";
import { getClientScope } from "~/scope";
import { GetServerSidePropsContext } from "next";

export const $authStateListener = createStore<Nullable<Subscription>>(null);
export const authSubscribe = createEvent();
export const authSubscribeFx = createEffect<void, Nullable<Subscription>>();
export const authUnsubscribe = createEvent();
export const authUnsubscribeFx = createEffect<Subscription, void>();
const authStateChanged = createEvent<AuthStateChangePayload>();
const setServerSessionFx = createEffect<AuthStateChangePayload, void>();

authSubscribeFx.use(() => {
  const scope = getClientScope();
  const bindedAuthStateChanged = scopeBind(authStateChanged, { scope: scope! });
  const { data: listener } = supabase.auth.onAuthStateChange((event, session) =>
    bindedAuthStateChanged({ event, session })
  );

  return listener;
});

authUnsubscribeFx.use((listener) => {
  listener.unsubscribe();
});

$authStateListener.on(authSubscribeFx.doneData, (_, listener) => listener);

sample({
  clock: authSubscribe,
  target: authSubscribeFx,
});

sample({
  clock: authUnsubscribe,
  source: $authStateListener,
  filter: (listener): listener is Subscription => listener != null,
  target: authUnsubscribeFx,
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

const { signedOut } = split(authStateChanged, {
  signedIn: (payload) => payload.event === "SIGNED_IN",
  signedOut: (payload) => payload.event === "SIGNED_OUT",
});

// Check auth session
export const checkSession = createEvent();
const checkSessionFx = createEffect<void, Nullable<Session>>();
const $checkSessionStatus = status({ effect: checkSessionFx });

checkSessionFx.use(() => supabase.auth.session());

sample({
  clock: checkSession,
  target: checkSessionFx,
});

sample({
  clock: authSubscribeFx.finally,
  target: checkSession,
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

type Request = GetServerSidePropsContext["req"];

// User & Session
export const $session = createStore<Nullable<Session>>(null);
export const $sessionUser = $session.map((session) => session?.user ?? null);
export const $cookieUser = createStore<Nullable<User>>(null);
export const getUserByCookie = createEvent<Request>();
export const getUserByCookieFx = createEffect<Request, Nullable<User>>();
export const $getUserByCookieStatus = status({ effect: getUserByCookieFx });
const $user = combine(
  [$cookieUser, $sessionUser],
  ([cookieUser, sessionUser]) => cookieUser ?? sessionUser
);

export const $isLoggedIn = $user.map((user) => user !== null);

getUserByCookieFx.use(async (req) => {
  const { data: user } = await supabase.auth.api.getUserByCookie(req);
  return user;
});

$session
  .on(checkSessionFx.doneData, (_, session) => session)
  .on(authStateChanged, (_, { session }) => session);

$cookieUser
  .on(getUserByCookieFx.doneData, (_, user) => user)
  .reset(getUserByCookieFx.fail)
  .reset(signedOut);

sample({
  clock: getUserByCookie,
  target: getUserByCookieFx,
});
