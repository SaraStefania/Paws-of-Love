const { Router } = require("express")
const method = require('../controllers/usersController')
const router = Router()

router.get('/', method.getUsers)
router.post('/', method.postUsers)
router.delete('/:id', method.deleteUsers)

module.exports = router;