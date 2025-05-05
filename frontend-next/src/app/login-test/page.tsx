'use client'
import { authenticate } from '@actions/loginActions'
import { createTodo } from '@/app/actions/createTodo'
import { useFormState, useFormStatus } from 'react-dom'


const initialState = {
  email: null,
  password: null
}

export default function Page() {

  const [state,formAction] = useFormState(createTodo,initialState)

  return (
    <form action={formAction} >
      <input type="text" name="username" placeholder="Email" required />
      <input type="text" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}