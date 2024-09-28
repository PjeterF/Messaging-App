const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    pictureURL:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Message=mongoose.model('Message', messageSchema)

export default Message