import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {
    try {
        const { params: { name } } = query

        const character = await prisma.character.findFirst({
            where: { name: name }
        })

        if (!character) {
            return Response.json({ message: "Could not find character." }, { status: 204 })
        }

        return Response.json({ ...character })
    } catch (err: any) {
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}