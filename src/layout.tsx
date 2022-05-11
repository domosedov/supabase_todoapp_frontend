import * as React from 'react'
import Link from 'next/link'
import { useStore, useEvent } from 'effector-react/scope'
import { authModel } from './entities/auth'

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signOut = useEvent(authModel.signOut)
  const isLoggedIn = useStore(authModel.$isLoggedIn)
  const isLoadingUser = useStore(authModel.$showUserLoading)

  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr]'>
      <header className='sticky top-0 bg-green-400'>
        <div className='px-4 py-2'>
          <nav className='flex items-center gap-4'>
            <Link href={`/`}>
              <a className='rounded bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white duration-200 hover:bg-green-600'>
                Home
              </a>
            </Link>
            <Link href={`/counter`}>
              <a className='rounded bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white duration-200 hover:bg-green-600'>
                Counter
              </a>
            </Link>
            <Link href={`/todos`}>
              <a className='rounded bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white duration-200 hover:bg-green-600'>
                Todos
              </a>
            </Link>
            <Link href={`/signup`}>
              <a className='rounded bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white duration-200 hover:bg-green-600'>
                Регистрация
              </a>
            </Link>
            <Link href={`/signin`}>
              <a className='rounded bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white duration-200 hover:bg-green-600'>
                Войти
              </a>
            </Link>
            <button
              type='button'
              onClick={signOut}
              className='rounded bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-white duration-200 hover:bg-green-600'
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
