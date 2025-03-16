import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCookie } from 'cookies-next';

import { COOKIE_KEYS } from './lib/data';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  const isMobile = device.type === 'mobile' || device.type === 'tablet';

  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  setCookie(COOKIE_KEYS.IS_MOBILE, isMobile.toString(), { res: response, req: request, maxAge: 3600 });

  return response;
}
