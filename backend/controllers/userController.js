const {User}=require('../models/User')

async function getAllUsers(req, res) {
    try {
        const list=await User.find({})

        return res.status(200).json(list)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function getUsersStartingWith(req, res){
    try {
        const list=await User.find({username:{
            $regex:'^'+req.params.value,
            $options:'i'
        }})

        return res.status(200).json(list)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports={
    getAllUsers,
    getUsersStartingWith,
}