'use client'

import { useState } from "react";

export const ButtonLogout = () => {
  const [loading, setLoading] = useState(false);

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setLoading(true);
    window.location.href = '/login'

  }

  return (
    <button
      className='bg-red-500 px-2 rounded mt-2 w-24 hover:bg-red-700 hover:font-bold'
      onClick={logout}
    >{loading?'Loading...':'Logout'}</button>
  )
}