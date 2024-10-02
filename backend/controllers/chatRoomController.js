const {ChatRoom}=require('../models/ChatRoom')
const {User}=require('../models/User')
const {Message}=require('../models/Message')

async function create(req, res) {
    try {
        const {users, name}=req.body

        if(!users || users.length==0){
            return res.status(400).json({error:'Cannot create a chat room with no users'})
        }

        const validUsers=[]
        for(let i=0;i<users.length;i++){
            const searchedUser=await User.findOne({username:users[i]})
            if(searchedUser){
                validUsers.push(searchedUser)
            }
        }
        
        if(validUsers.length==0){
            return res.status(400).json({error:'No provided users were valid'})
        }

        const newChatRoom=await ChatRoom.create({
            name:name || 'No name',
            users:[],
            messages:[],
            owner:validUsers[0]._id
        })

        for(let i=0;i<validUsers.length;i++){
            newChatRoom.users.push(validUsers[i]._id)
            validUsers[i].chatRooms.push(newChatRoom._id)
            await validUsers[i].save()
        }
        await newChatRoom.save()

        res.status(200).json(newChatRoom)
    } catch (error) {
        return res.status(500).json(error)
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

        searchedUser.chatRooms.push(searchedChatRoom._id)
        await searchedUser.save()

        return res.status(200).json(searchedChatRoom)
    } catch (error) {
        return res.status(500).json(error)
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

        searchedUser.chatRooms=searchedUser.chatRooms.filter(chatRoomID=>!chatRoomID.equals(searchedChatRoom._id))
        await searchedUser.save()

        return res.status(200).json(searchedChatRoom)
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function getAll(req, res){
    try {
        const list=await ChatRoom.find({})

        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function getByID(req, res){
    try {
        const chatRoomID=req.params.chatRoomID

        const searchedChatRoom=await ChatRoom.findById(chatRoomID)
        if(!searchedChatRoom){
            return res.status(400).json({error:'Chat room with that ID does not exist'})
        }

        await searchedChatRoom.populate('users owner messages')
        for(let i=0;i<searchedChatRoom.messages.length;i++){
            await searchedChatRoom.messages[i].populate('user')
        }

        return res.status(200).json(searchedChatRoom)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

async function sendMessage(req, res){
    try {
        const {chatRoomID, username, content}=req.body

        const chatRoom=await ChatRoom.findById(chatRoomID)
        if(!chatRoom){
            return res.status(400).json({error:'Chat room with that ID does not exist'})
        }

        const user=await User.findOne({username:username})
        if(!user){
            return res.status(400).json({error:'User with that username does not exist'})
        }

        if(chatRoom.users.indexOf(user._id)==-1){
            return res.status(400).json({error:'User is not present in the chat room'})
        }

        const newMessage=await Message.create({
            content:content,
            user:user._id,
            prictureURL:null
        })

        chatRoom.messages.push(newMessage._id)
        await chatRoom.save()

        await newMessage.populate('user')

        return res.status(200).json(newMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
}
async function setName(req, res){
    try {
        const {newName, chatRoomID}=req.body

        const chatRoom=await ChatRoom.findById(chatRoomID)
        if(!chatRoom){
            return res.status(400).json('Could not find chat')
        }

        chatRoom.name=newName
        await chatRoom.save()

        return res.status(200).json('Name succesfully changed')
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function getChatRoomsOfAUser(req, res){
    try {
        const username=req.params.username

        const user=await User.findOne({username:username})
        if(!user){
            return res.status(400).json('Could not find user')
        }

        await user.populate('chatRooms')

        return res.status(200).json(user.chatRooms)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports={
    create,
    addUser,
    removeUser,
    getAll,
    getByID,
    sendMessage,
    setName,
    getChatRoomsOfAUser
}