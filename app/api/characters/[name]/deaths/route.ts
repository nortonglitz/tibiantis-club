import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {
    try {

        const { params: { name } } = query

        const parsedName = name.replaceAll('_', ' ').toLowerCase()

        if (parsedName.length < 3) {
            return Response.json({ message: "Name too small. Need at least 3 letters." }, { status: 406 })
        }

        const character = await prisma.character.findFirst({
            where: { name: parsedName },
            select: { id: true }
        })

        if (!character || !character.id) {
            throw new Error('Invalid character name.')
        }

        console.log(character.id)

        const deaths = await prisma.death.findMany({
            where: {
                victimId: character.id
            }
        })

        if (!deaths) {
            return Response.json({ deaths: [] }, { status: 200 })
        }

        return Response.json({ deaths }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}