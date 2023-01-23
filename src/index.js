// Node core modules
const path = require('path')
const http = require('http')

// NPM modules
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

// Path management
const staticDirPath = path.join(__dirname, '../public')

// Setting up server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set serer port
const port = process.env.PORT || 3000

// Configure static content
app.use(express.static(staticDirPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('message', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        io.emit('locationMessage', `http://google.com/maps?q=${latitude},${longitude}`)

        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!')
    })
})

// Server start-up
server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})