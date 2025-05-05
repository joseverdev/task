'use server'
import { signIn } from '@auth/singIn';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authenticate(formData: FormData) {
  console.log('authenticate')
  try {
    // console.log('formData',formData)
    const user = await signIn('credentials', formData)
    // console.log('USER',user)
    cookies().set('token', user.token)
    // return user

  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignIn':
          return 'Invalid credentials.'
        case 'UnsuportedSignInMethod':
          return 'Unsuported sign in method.'
          break
        case 'MissingCredentials':
          return 'Email or password is missing.'
          break
        default:
          return 'Somewhit went wrong.'
      }
    }
    throw error
  }

  redirect('/home')
}

export async function signup(formData: FormData) {
  console.log('signup')
  try {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const response = await fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })

    const data = await response.json()
    console.log('data', data)

  } catch (error) {
    console.log('error', error)
  }

  redirect('/home')
}
