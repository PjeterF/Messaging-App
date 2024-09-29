const router=require('express').Router()
const controller=require('../controllers/userController')

router.get('/all', controller.getAllUsers)

router.get('/startingWith/:value', controller.getUsersStartingWith)

module.exports=router