export const config = {
    matcher: '/api/crons/:function*',
}

export function middleware(request: Request) {
    const authHeader = request.headers.get('authorization')

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }
}


/* 
PROTECT API FROM PUBLIC
process.env.APP_URL is the url of your app for example : http://localhost:3000

import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

    const url = req.nextUrl
    const { pathname } = url

    if (pathname.startsWith(`/api/`)) {
        if (!req.headers.get("referer")?.includes(process.env.APP_URL as string)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
      }

     return NextResponse.next()

}

export const config = {
  matcher: ['/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)'],
}

*/