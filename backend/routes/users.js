const { Router } = require("express")
const method = require('../controllers/usersController')
const router = Router()

router.get('/', method.getUsers)
router.get('/:id', method.getUsersId)
router.post('/', method.postUsers)
router.patch('/:id', method.patchUsers)
router.put('/:id', method.putUsers)
router.delete('/:id', method.deleteUsers)

module.exports = router;