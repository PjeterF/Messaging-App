const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pictureURL:{
        type:String
    },
    chatRooms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ChatRoom'
    }],
})

const User=mongoose.model('User', userSchema)

module.exports={User}