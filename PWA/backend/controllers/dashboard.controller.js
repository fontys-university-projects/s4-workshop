const dashboard = require('../services/dashboard.service')
const createError = require('http-errors')
const e = require('express')

class dashboardController {

    static create = async (req, res, next) => {

        try {
            let user = req.user
            let body = req.body
            let merge = { ...user, ...body }
            const data = await dashboard.create(merge)
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

    static concerts = async (req, res, next) => {

        try {
            const data = await dashboard.concerts(req.user)
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

    static tickets = async (req, res, next) => {

        try {
            const data = await dashboard.tickets(req.user)
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

    static scanTicket = async (req, res, next) => {

        try {
            const data = await dashboard.scanTicket(req.query.ticket)
            res.status(200).json({
                status: true,
                message: 'Ticket data',
                data: data
            })
        }
        catch (e) {
            // next(createError(e.statusCode, e.message))
            console.log(e)
        }
    }


}

module.exports = dashboardController