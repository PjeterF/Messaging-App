const {ChatRoom}=require('../models/ChatRoom')
const {User}=require('../models/User')
const { search } = require('../routes/authentication')

async function create(req, res) {
    try {
        const {users, name}=req.body

        if(!users || users.length==0){
            return res.status(400).json({error:'Cannot create a chat room with no users'})
        }

        const userIDs=[]
        for(let i=0;i<users.length;i++){
            const searchedUser=await User.findOne({username:users[i]})
            if(searchedUser){
                userIDs.push(searchedUser._id)
            }else{
                return res.status(400).json({error:'User \''+users[i]+'\' does not exist in the database'})
            }
        }

        if(userIDs.length==0){
            return res.status(400).json({error:'Failed'})
        }

        const newChatRoom=await ChatRoom.create({
            name:name || 'No name',
            users:userIDs,
            messages:[],
            owner:userIDs[0]
        })

        res.status(200).json(newChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function addUser(req, res){
    try {
        const {username, chatRoomID}=req.body

        const searchedUser=await User.findOne({username:username})
        if(!searchedUser){
            return res.status(400).json({error:'User with that name does not exist'})
        }

        const searchedChatRoom=await ChatRoom.findById(chatRoomID)
        if(!searchedChatRoom){
            return res.status(400).json({error:'Chat room with that ID does not exist'})
        }

        searchedChatRoom.users.push(searchedUser._id)
        await searchedChatRoom.save()

        return res.status(200).json(searchedChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function removeUser(req, res){
    try {
        const {username, chatRoomID}=req.body

        const searchedUser=await User.findOne({username:username})
        if(!searchedUser){
            return res.status(400).json({error:'User with that name does not exist'})
        }

        const searchedChatRoom=await ChatRoom.findById(chatRoomID)
        if(!searchedChatRoom){
            return res.status(400).json({error:'Chat room with that ID does not exist'})
        }

        searchedChatRoom.users=searchedChatRoom.users.filter(userID=>!userID.equals(searchedUser._id))
        await searchedChatRoom.save()

        return res.status(200).json(searchedChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function getAll(req, res){
    try {
        const list=await ChatRoom.find({})

        return res.status(200).json(list)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function getByID(){
    try {
        const {chatRoomID}=req.params

        const searchedChatRoom=await ChatRoom.findById(chatRoomID)
        if(!searchedChatRoom){
            return res.status(400).json({error:'Chat room with that ID does not exist'})
        }

        await searchedChatRoom.populate('users')
        await searchedChatRoom.populate('owner')
        await searchedChatRoom.populate('messages')
        
        return res.status(200).json(searchedChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports={
    create,
    addUser,
    removeUser,
    getAll,
    getByID
}