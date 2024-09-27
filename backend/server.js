const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const http=require('http')

dotenv.config()
const app=express()

app.use(cors())
app.use(express.json())

const server=http.createServer(app)

app.use('/api/authentication', require('./routes/authentication'))

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