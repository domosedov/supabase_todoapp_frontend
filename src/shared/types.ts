export type Nullable<T> = T | null

export type WithAutocomplete<T, U = string> = T | (U & Record<never, never>)
