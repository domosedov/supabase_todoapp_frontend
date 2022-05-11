import * as React from 'react'
import { fork, serialize, Scope } from 'effector'
import { isBrowser, isDev } from '~/shared/env'

let clientScope: Scope

const initializeScope = (initialData: Record<string, unknown>) => {
  // if (isDev) {
  //   if (clientScope) {
  //     console.log("[ClientScope]:", serialize(clientScope));
  //   }
  // }
  let scope = fork({
    values: {
      ...(clientScope ? serialize(clientScope) : {}),
      ...initialData,
    },
  })

  if (isBrowser) {
    clientScope = scope
  }

  return scope
}

export const useScope = (initialData = {}) =>
  React.useMemo(() => initializeScope(initialData), [initialData])

export const getClientScope = (): Scope | undefined => clientScope
