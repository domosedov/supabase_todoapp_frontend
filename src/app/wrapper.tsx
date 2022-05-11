import * as React from 'react'
import { useEvent } from 'effector-react/scope'
import * as appModel from './model'

type AppWrapperProps = {
  children: React.ReactNode
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [mount, unmount] = useEvent([appModel.appMounted, appModel.appUnmounted])

  React.useEffect(() => {
    mount()
    return () => {
      unmount()
    }
  }, [mount, unmount])

  return <React.Fragment>{children}</React.Fragment>
}
