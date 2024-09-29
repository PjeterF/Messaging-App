const router=require('express').Router()
const controller=require('../controllers/chatRoomController')

router.post('/create', controller.create)

router.post('/adduser', controller.addUser)

router.post('/removeUser', controller.removeUser)

router.get('/all', controller.getAll)

router.get('/:chatRoomID', controller.getByID)

module.exports=router