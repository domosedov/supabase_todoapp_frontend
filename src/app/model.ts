import { createEvent, sample } from "effector";
import { createGate } from "effector-react/scope";
import { authModel } from "~/entities/auth";

export const AppGate = createGate({ name: "AppGate" });

sample({
  clock: AppGate.open,
  target: authModel.watchAuthStateChanges,
});

sample({
  clock: AppGate.close,
  target: authModel.unwatchAuthStateChanges,
});

export const appMounted = createEvent();
export const appUnmounted = createEvent();

sample({
  clock: appMounted,
  target: authModel.watchAuthStateChanges,
});

sample({
  clock: appUnmounted,
  target: authModel.unwatchAuthStateChanges,
});
