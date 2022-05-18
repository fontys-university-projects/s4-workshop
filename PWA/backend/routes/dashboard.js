const router = require('express').Router()
const dashboard = require('../controllers/dashboard.controller')
const auth = require('../middlewares/auth')
const role = require('../middlewares/privilege')

router.post('/create', auth, role('PARTNER'), dashboard.create )
router.get('/concerts', auth, role('PARTNER'), dashboard.concerts)
router.get('/tickets', auth, role('PARTNER'), dashboard.tickets)
router.get('/scan-ticket', auth, role('PARTNER'), dashboard.scanTicket)
module.exports = router