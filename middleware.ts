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