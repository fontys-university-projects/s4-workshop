const concert = require('../services/concert.service')
const createError = require('http-errors')
const e = require('express')

class concertController {

    static concerts = async (req, res, next) => {

        try {
            const data = await concert.concerts()
            res.status(200).json({
                status: true,
                message: 'Concert list',
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
            next(createError(e.statusCode, e.message))
            console.log(e)
        }
    }

    static allTickets = async (req, res, next) => {

        try {
            const data = await concert.allTickets(req.user)
            res.status(200).json({
                status: true,
                message: 'Purchased Ticket list',
                data: data
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
            console.log(e)
        }
    }


}

module.exports = concertController