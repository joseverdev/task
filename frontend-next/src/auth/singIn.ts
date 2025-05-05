export async function signIn(method:string, formData:FormData) {
  if(method !== 'credentials'){
    throw {
      type: 'UnsuportedSignInMethod',
      message: 'Unsuported sign in method.'
    }
  }

  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if(!username || !password){
    throw {
      type: 'MissingCredentials',
      message: 'Email or password is missing.'
    }
  }
  
  const user = await fetch('http://localhost:3001/api/v1/auth/login',{
    method: 'POST',
    headers:{
      'content-type': 'application/json',
    },
    body: JSON.stringify({username,password})
  })
  const data = await user.json()
  return data
}