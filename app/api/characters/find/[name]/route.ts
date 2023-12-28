import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {
    try {
        const { params: { name } } = query

        const parsedName = name.replaceAll('_', ' ').toLowerCase()

        const characters = await prisma.character.findMany({
            where: {
                name: {
                    contains: parsedName
                },
            },
            take: 10,
            select: {
                name: true,
                displayName: true,
                level: true,
                vocation: true
            }
        })

        if (characters.length < 1) {
            return Response.json({ message: "Could not find any character.", characters: [] }, { status: 200 })
        }

        return Response.json({ characters })
    } catch (err: any) {
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}