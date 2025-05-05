import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req:NextRequest) {
  // console.log('middleware')
  const token = req.cookies.get('token')?.value
  if(!token){
    console.log('no token MIDDLEWARE REDIRECT')
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  try {
    // console.log('inside the try')
    await jwtVerify(token, new TextEncoder().encode('the world is yours!'))
    return NextResponse.next()

  } catch (error) {
    console.log('error MIDDLEWARE REDIRECT',error)
    return NextResponse.redirect(new URL('/login', req.nextUrl))    
  }

}

export const config = {
  matcher: ['/home/:path*'],
}