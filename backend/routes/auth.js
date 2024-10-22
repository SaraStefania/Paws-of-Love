const { Router } = require("express")
const auth = require('../controllers/authController')
const router = Router()

router.post('/signup', auth.signUp)
router.post('/signin', auth.signIn)

module.exports = router;