import * as React from 'react'
import type { NextPage } from 'next'
import { useEvent } from 'effector-react/scope'
import { authModel } from '~/entities/auth'

const SignInPage: NextPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const signIn = useEvent(authModel.signIn)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signIn({ email, password })
  }
  return (
    <div className='flex h-full items-center justify-center bg-green-50'>
      <div className='w-[calc(100vw-2rem)] max-w-sm rounded-lg bg-white p-5 shadow-2xl md:p-10'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <div className='mt-8'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-xs font-medium uppercase text-gray-700'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={event => setEmail(event.target.value)}
                className='mt-2 rounded border p-2'
              />
            </div>
            <div className='mt-5 flex flex-col'>
              <label htmlFor='password' className='text-xs font-medium uppercase text-gray-700'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                className='mt-2 rounded border p-2'
              />
            </div>
            <button
              className='mt-5 rounded bg-green-500 px-6 py-2 text-sm font-bold uppercase text-white'
              type='submit'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
