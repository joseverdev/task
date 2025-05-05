'use client'

import { authenticate, signup } from '@actions/loginActions';
import { useFormState, useFormStatus } from 'react-dom';
import { Loading } from '@components/atoms/Loading/Loading';

const initialState = {
  username: null,
  password: null
}


function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className='bg-indigo-500 flex flex-col items-center justify-center text-slate-100 font-bold hover:bg-indigo-700 h-14' >{pending ? <Loading /> : 'Sign Up'}</button>

  )
}

export const SignUp = () => {
  const [state, formAction] = useFormState(signup, initialState)
  
  return (
    <div className='w-96 mx-auto bg-slate-200 p-8 rounded-sm'>
      <h1 className='text-2xl font-bold text-center my-4'>Sign Up</h1>
      <form className='p-4 flex flex-col gap-4'
        // onSubmit={handleSubmit}
        action={signup}
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
    </div>
  )
}