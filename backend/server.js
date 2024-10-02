const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const http=require('http')
const socketIO=require('socket.io')

dotenv.config()
const app=express()

app.use(cors())
app.use(express.json())

const server=http.createServer(app)

app.use('/api/authentication', require('./routes/authentication'))
app.use('/api/user', require('./routes/user'))
app.use('/api/chatRoom', require('./routes/chatRoom'))

const io=new socketIO.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket)=>{
    socket.on('message', ({chatRoomID, message})=>{
        console.log('sending message: '+message.content)
        io.to(chatRoomID).emit('addMessage', message)
    })

    socket.on('joinRoom', (chatRoomID)=>{
        //console.log('User joined room: '+chatRoomID)
        socket.join(chatRoomID)
    })

    socket.on('leaveRoom', (chatRoomID)=>{
        //console.log('User left room: '+chatRoomID)
        socket.leave(chatRoomID)
    })
})

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('mongoose connection OK')
    server.listen(process.env.PORT, ()=>{
        console.log('server connection OK')
    })
})
.catch((error)=>{
    console.log(error)
})