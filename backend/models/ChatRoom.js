const mongoose=require('mongoose')

const chatRoomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const ChatRoom=mongoose.model('ChatRoom', chatRoomSchema)

module.exports={ChatRoom}