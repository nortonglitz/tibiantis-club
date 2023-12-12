const { PrismaClient } = require('@prisma/client')
const foods = require('./foods')

const load = async () => {
    try {
        const prisma = new PrismaClient()

        console.log('Deleting foods...')
        await prisma.foods.deleteMany({})

        console.log('Adding foods data...')
        await prisma.foods.createMany({ data: foods })

        console.log('All data loaded.')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
load()