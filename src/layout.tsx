import * as React from 'react'
import Link from 'next/link'
import { useStore, useEvent } from 'effector-react/scope'
import { authModel } from './entities/auth'

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signOut = useEvent(authModel.signOut)
  const isLoggedIn = useStore(authModel.$isLoggedIn)
  const isLoadingUser = useStore(authModel.$showUserLoading)

  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr]'>
      <header className='bg-green-400 sticky top-0'>
        <div className='px-4 py-2'>
          <nav className='flex items-center gap-4'>
            <Link href={`/`}>
              <a className='bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded'>
                Home
              </a>
            </Link>
            <Link href={`/counter`}>
              <a className='bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded'>
                Counter
              </a>
            </Link>
            <Link href={`/todos`}>
              <a className='bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded'>
                Todos
              </a>
            </Link>
            <Link href={`/signup`}>
              <a className='bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded'>
                Регистрация
              </a>
            </Link>
            <Link href={`/signin`}>
              <a className='bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded'>
                Войти
              </a>
            </Link>
            <button
              type='button'
              onClick={signOut}
              className='bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded'
            >
              Выйти
            </button>
            {isLoadingUser ? (
              <span>Loading...</span>
            ) : isLoggedIn ? (
              <div>Залогинен</div>
            ) : (
              <div>Незалогинен</div>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
