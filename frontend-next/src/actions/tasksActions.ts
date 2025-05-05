'use server'

import { cookies } from "next/headers"

const cookieStore = cookies()
const token = cookieStore.get('token')?.value

export const updateTask = async (id: number, description: string) => {
  try {
    await fetch('http://localhost:3001/api/v1/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id, description })
    });
  } catch (error) {
    console.log(error);
  }
}