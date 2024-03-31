import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const isPublic = url === '/login' || url === '/signup';
  const token = request.cookies.get("token")?.value || '';
  const status = url === '/profile/reset-password' ? true : false;
  
  if(isPublic && token){
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if(!isPublic && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  
  if((url.startsWith("/profile")) && !token && !isPublic){
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/signup",
    "/profile/:path*",
    "/login"
  ],
}