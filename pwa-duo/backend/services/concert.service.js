const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const crypto = require('crypto')

const createError = require('http-errors')

class authService {

    static async create(data) {
        const { uid, name, logoURL, location } = data
        if (!name && !data.date && !location) {
            throw createError.Unauthorized('You must enter the name, logo URL, date and location of the concert')
        }
        const user = await prisma.user.findUnique({
            where: {
                uid
            }
        })
        const cid  = crypto.randomBytes(9).toString('hex')
        data.date = new Date(data.date)
        await prisma.concert.create({
            data:{
                name: name,
                logoURL: logoURL,
                date: data.date,
                location: location,
                cid: cid,
                userId: user.id

            }
        })
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
        
        const qrCode = crypto.randomBytes(100).toString('hex')

        await prisma.ticket.create({
            data: {
                qrCode: qrCode,
                entrance: '2',
                sector: 'A',
                row: row,
                seat: seat,
                concertId: concert.id,
                userId: user.id

            }
        })
    }
}

module.exports = authService