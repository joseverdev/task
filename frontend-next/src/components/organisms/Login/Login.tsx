'use client'

import { authenticate } from '@actions/loginActions';
import { useFormState, useFormStatus } from 'react-dom';
import { Loading } from '@components/atoms/Loading/Loading';
import Link from 'next/link';

const initialState = {
  username: null,
  password: null
}




function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className='bg-indigo-500 flex flex-col items-center justify-center text-slate-100 font-bold hover:bg-indigo-700 h-14' >{pending ? <Loading /> : 'Login'}</button>

  )
}

export const Login = () => {
  const [state, formAction] = useFormState(authenticate, initialState)
  
  return (
    <div className='w-96 mx-auto bg-slate-200 p-8 rounded-sm'>
      <h1 className='text-2xl font-bold text-center my-4'>Log in!</h1>
      <form className='p-4 flex flex-col gap-4'
        // onSubmit={handleSubmit}
        action={authenticate}
      >

        <input
          // value={'susi'}
          type="text"
          placeholder="Name"
          name='username'
          autoComplete='username'
          className='p-4'
          required
        />
        <input
          // value={'3612'}
          type="text"
          placeholder="Password"
          name='password'
          autoComplete="current-password"
          className='p-4'
          required

        />
        <SubmitButton />
      </form>
      <button className='mx-auto block hover:text-indigo-800'><Link href={'/signup'}>Sign up</Link></button>
    </div>
  )
}