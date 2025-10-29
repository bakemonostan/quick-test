import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('kpk_token')?.value;
  const vehicleDataCookie = request.cookies.get('vehicle-listing-data')?.value;
  const referer = request.headers.get('referer') || '';

  const { pathname } = request.nextUrl;

  // Skip redirect to auth if coming directly from auth page (likely just logged in)
  const isComingFromAuth = referer.includes('/auth');

  if (!token && pathname.startsWith('/dashboard/overview')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard/overview', request.url));
  }

  if (!token && pathname.startsWith('/list-a-vehicle') && !isComingFromAuth) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (!vehicleDataCookie && pathname.startsWith("/preview")) {
    return NextResponse.redirect(new URL("/dashboard/listings", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/list-a-vehicle/:path*", "/preview"],
};
