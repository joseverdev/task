import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import {  NextResponse } from 'next/server';

export async function GET(req, res) {

  try {
    const token = cookies().get('token')?.value
    if (!token) {
      redirect('/login')
    }
  
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
  
    return NextResponse.json({username:payload.username, id:payload.sub})
    
  } catch (error) {
    return NextResponse.json({error})
  }


}