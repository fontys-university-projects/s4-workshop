const router = require('express').Router()
const concert = require('../controllers/concert.controller')
const auth = require('../middlewares/auth')


router.get('/concerts', auth, concert.concerts )
router.post('/ticketBuy', auth, concert.ticketBuy)
router.get('/tickets', auth, concert.tickets)
router.get('/allTickets', auth, concert.allTickets)
module.exports = router