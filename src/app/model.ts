import { createEvent, sample } from "effector";
import { authModel } from "~/entities/auth";

export const appMounted = createEvent();
export const appUnmounted = createEvent();

sample({
  clock: appMounted,
  target: [authModel.authSubscribe],
});

sample({
  clock: appUnmounted,
  target: authModel.authUnsubscribe,
});
