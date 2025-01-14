import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { initServer } from "@sitecore/engage";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  const engageSettings = {
    clientKey: process.env.NEXT_PUBLIC_ENGAGE_CLIENT_KEY || '',
    targetURL: process.env.NEXT_PUBLIC_ENGAGE_TARGET_URL || '',
    pointOfSale: process.env.NEXT_PUBLIC_ENGAGE_POS || '',
    // cookieDomain: "<cookie_domain_PLACEHOLDER>",
    cookieExpiryDays: 365,
    forceServerCookieMode: true,
  };
  const engageServer = initServer(engageSettings);
  await engageServer.handleCookie(request, response);
  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
