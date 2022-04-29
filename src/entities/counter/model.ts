import { createStore, createApi } from "effector";

export const $count = createStore(0);

export const { increment, decrement } = createApi($count, {
  increment: (count) => count + 1,
  decrement: (count) => count - 1,
});
