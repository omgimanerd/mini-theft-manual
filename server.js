/**
 * This is the server app script that is run on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PORT = process.env.PORT || 5000
const FPS = 60

// Dependencies.
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const path = require('path')
const socketIO = require('socket.io')

const Game = require('./lib/Game')

// Initialization.
const app = express()
const server = http.Server(app)
const io = socketIO(server)
const game = new Game()

app.set('port', PORT)
app.set('view engine', 'html')

app.use(morgan('dev'))
app.use('/public', express.static(path.join(__dirname, '/public')))

// Routing
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', socket => {
  // When a new player joins, the server adds a new player to the game.
  socket.on('new-player', (data, callback) => {
    game.addNewPlayer(data.name, socket)
    callback()
  })

  socket.on('player-action', data => {
    game.updatePlayer(socket.id, data.keyboardState, data.turretAngle,
      data.shot, data.timestamp)
  })

  // When a player disconnects, remove them from the game.
  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
  })
})

setInterval(() => {
  // game.update()
  // game.sendState()
}, 1000 / FPS)

// Starts the server.
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`STARTING SERVER ON PORT ${PORT}`)
})
