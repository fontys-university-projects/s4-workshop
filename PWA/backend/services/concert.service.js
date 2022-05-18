const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const crypto = require('crypto')

const createError = require('http-errors')

class authService {

    static async concerts() {
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0);
        const concerts = await prisma.concert.findMany({
            where: {
                date: {
                    gte: currentDate
                }
            },
            select: {
                name: true,
                logoURL: true,
                description: true,
                date: true,
                location: true,
                cid: true
            }
        })
        return(concerts)
    }

    static async ticketBuy(data) {
        const { uid, cid, row, seat} = data
        if (!cid && !row && !seat){
            throw createError.Unauthorized('You must enter the concert ID and the desirable row and seat')
        }

        const concert = await prisma.concert.findUnique({
            where : {
                cid
            }
        })

        if(!concert){
            throw createError.Unauthorized('This concert does not exist')
        }

        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })
        
        const tid = crypto.randomBytes(45).toString('hex')

        await prisma.ticket.create({
            data: {
                tid: tid,
                entrance: '2',
                sector: 'A',
                row: row,
                seat: seat,
                concertId: concert.id,
                userId: user.id

            }
        })
    }

    static async tickets(data) {
        const { uid } = data

        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0);
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: user.id,
                concert: {
                    date: {
                        gte: currentDate
                    }
                }
            },
            orderBy:{
                concert: {
                    date: 'asc'
                }
            },
            select: {
                tid: true,
                entrance: true,
                sector: true,
                row: true,
                seat: true,
                concert: {
                    select: {
                        name: true,
                        logoURL: true,
                        description: true,
                        date: true,
                        location: true
                    }
                }
            }
        })

        if(!tickets){
            throw createError.NotFound(`You don't have any purchased tickets at the moment`)
        }

        return(tickets)
    }

    static async allTickets(data) {
        const { uid } = data

        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: user.id,
            },
            orderBy:{
                concert: {
                    date: 'asc'
                }
            },
            select: {
                entrance: true,
                sector: true,
                row: true,
                seat: true,
                concert: {
                    select: {
                        name: true,
                        logoURL: true,
                        description: true,
                        date: true,
                        location: true
                    }
                }
            }
        })

        if(!tickets){
            throw createError.NotFound(`You don't have any purchased tickets at the moment`)
        }

        return(tickets)
    }
}

module.exports = authService