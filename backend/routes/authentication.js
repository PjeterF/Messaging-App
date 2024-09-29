const router=require('express').Router()
const controller=require('../controllers/authenticationController')

router.post('/register', controller.register)

router.post('/login', controller.login)

module.exports=router