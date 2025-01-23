import { NextResponse, } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const fbClickId = request.nextUrl.searchParams.get("fbclid")

  const path = request.nextUrl.pathname;
  const response = NextResponse.next()
  response.headers.set('x-path', path);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
