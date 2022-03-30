const router = require('express').Router()
const concert = require('../controllers/concert.controller')
const auth = require('../middlewares/auth')
const privilege = require('../middlewares/privilege')

router.post('/create', auth, privilege, concert.create )
router.post('/ticketBuy', auth, concert.ticketBuy)

module.exports = router