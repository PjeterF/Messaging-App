const {User}=require('../models/User')
const bcrypt=require('bcrypt')

async function register(req, res){
    const {username, password}=req.body

    const searchedUser=await User.findOne({username:username})
    if(searchedUser){
        return res.status(400).json({error:'Username is already taken'})
    }
    
    try{
        const encryptedPassword=await bcrypt.hash(password, 10)
        const newUser=await User.create({
            username:username,
            password:encryptedPassword,
            pictureURL:null,
            chatRooms:[]
        })
        return res.status(200).json(newUser)
    }catch(error){
        return res.status(400).json(error)
    }
}

async function login(req, res){
    try{
        const{username, password}=req.body

        const searchedUser=await User.findOne({username:username})
        if(!searchedUser){
            return res.status(400).json({error:'Incorrect credentials'})
        }

        const passwordComparision=await bcrypt.compare(password, searchedUser.password)
        if(!passwordComparision){
            return res.status(400).json({error:'Incorrect credentials'})
        }

        return res.status(200).json(searchedUser)
    }catch(error){
        return res.status(400).json(error)
    } 
}

module.exports={
    register,
    login
}