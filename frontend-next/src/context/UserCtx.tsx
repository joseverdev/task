'use client'
import { createContext, useState } from "react";

export const UserCtx = createContext()

export function UserProvider({ children }) {
  
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth')
      const data = await response.json()
      const user = data.username
      setUser(user)
    } catch (error) {
      console.log('Error en getUser',error)
    }
  }

  const data = {
    user
  }

  useState(() => {
    getUser()
  })

  return (
    <UserCtx.Provider value={data}>
      {children}
    </UserCtx.Provider>
  )
}