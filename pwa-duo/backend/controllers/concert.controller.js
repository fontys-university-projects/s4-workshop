const concert = require('../services/concert.service')
const createError = require('http-errors')
const e = require('express')

class concertController {

    static create = async (req, res, next) => {

        try {
            let user = req.user
            let body = req.body
            let merge = { ...user, ...body }
            const data = await concert.create(merge)
            res.status(200).json({
                status: true,
                message: 'New Concert was registered successfully',
                data: data
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
            console.log(e)
        }
    }
    static ticketBuy = async (req, res, next) => {

        try {
            let user = req.user
            let body = req.body
            let merge = { ...user, ...body }
            const data = await concert.ticketBuy(merge)
            res.status(200).json({
                status: true,
                message: 'Ticket purchase was successful',
                data: data
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
            console.log(e)
        }
    }
    static tickets = async (req, res, next) => {

        try {
            const data = await concert.tickets(req.user)
            res.status(200).json({
                status: true,
                message: 'Purchased Ticket list',
                data: data
            })
        }
        catch (e) {
            // next(createError(e.statusCode, e.message))
            console.log(e)
        }
    }


}

module.exports = concertController