const { Router } = require("express")

const myMethod = require('../controllers/usersController')
const router = Router()
 router.get('/', myMethod.getUsers)

 module.exports = router;