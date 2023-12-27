import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {
    try {
        const { params: { name } } = query

        const parsedName = name.toLowerCase()

        if (parsedName.length < 3) {
            return Response.json({ message: "Name too small. Need at least 3 letters." }, { status: 406 })
        }

        const character = await prisma.character.findFirst({
            where: { name: parsedName }
        })

        if (!character) {
            return Response.json({ message: "Could not find character." }, { status: 406 })
        }

        return Response.json({ ...character })
    } catch (err: any) {
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}