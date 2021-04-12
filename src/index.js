const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000
const publicDir = `${__dirname}/public`

app
    .get('/', (req, res) => {
        res.sendFile(`${publicDir}/client.html`)
    })
    .get('/streaming', (req, res) => {
        res.sendFile(`${publicDir}/server.html`)
    })

http.listen(port, () =>{
    console.log(`Iniciando Express y Socket.IO en el puerto: ${port}`)
})

io.on('connection', (socket) =>{
    socket.on('streaming', (image) =>{
        io.emit('play stream', image)
    })
})


