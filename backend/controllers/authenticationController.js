const {User}=require('../models/User')

async function register(req, res){
    const {username, password}=req.body

    const searchedUser=await User.findOne({username:username})
    if(searchedUser){
        return res.status(400).json({error:'Username is already taken'})
    }
    console.log(password)
    try{
        const newUser=await User.create({
            username:username,
            password:password
        })
        return res.status(200).json(newUser)
    }catch(error){
        return res.status(400).json(error)
    }
}

module.exports={
    register
}