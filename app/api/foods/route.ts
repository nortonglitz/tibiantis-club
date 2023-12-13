import { prisma } from '@/app/libs/dbClient'

export async function GET() {
    try {
        const foods = await prisma.foods.findMany({})
        return Response.json(foods, { status: 200 })
    } catch (err: any) {
        return Response.json({
            code: err.code,
            message: err.message
        }, { status: 500 })
    }
}