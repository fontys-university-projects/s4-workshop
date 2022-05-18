const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const crypto = require('crypto')

const createError = require('http-errors')

class dashboardService {

    static async create(data) {
        const { uid, name, logoURL, location, description, date, time } = data
        if (!name && !data.date && !location) {
            throw createError.Unauthorized('You must enter the name, logo URL, date and location of the concert')
        }
        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })
        const cid = crypto.randomBytes(9).toString('hex')
        let dateTime = date + 'T' + time
        dateTime = new Date(dateTime)
        await prisma.concert.create({
            data: {
                name: name,
                logoURL: logoURL,
                date: dateTime,
                description: description,
                location: location,
                cid: cid,
                userId: user.id
            }
        })
    }

    static async concerts(data) {
        const { uid } = data

        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })

        const concerts = await prisma.concert.findMany({
            where: {
                userId: user.id,
            },
            select: {
                cid: true,
                name: true,
                logoURL: true,
                description: true,
                date: true,
                location: true
            }
        })

        if (!concerts) {
            throw createError.NotFound(`You don't have any concerts created at the moment`)
        }

        return (concerts)
    }
    static async tickets(data) {
        const { uid } = data

        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })

        const concerts = await prisma.concert.findMany({
            where: {
                userId: user.id,
            }
        })

        const tickets = await prisma.ticket.findMany({
            where: {
                concert: {
                    userId: user.id
                }
            },
            select: {
                tid: true,
                sector: true,
                row: true,
                seat: true,
                purchased: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        })

        if (!tickets) {
            throw createError.NotFound(`You don't have any concerts created at the moment`)
        }

        return (tickets)
    }
    
    static async scanTicket(data) {
        const ticket = await prisma.ticket.findMany({
            where: {
                tid: data
            },
            select: {
                tid: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
                concert: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        return ticket
    }
}

module.exports = dashboardService