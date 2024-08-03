require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { findBestMove } = require('./ai')
const router = require('./routes/route')
const cookieParser = require('cookie-parser')
const { url } = require('inspector')
const { spawn } = require('child_process')
const app = express()
const port = process.env.PORT
// const ip = '192.168.1.10'

console.log(process.env.PORT)

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('public'))

app.get('/', router)
app.get('/logout', router)
app.post('/scoretable/:id', router)
app.get('/scoretable/:id', router)

app.post('/create', router)
app.post('/', router)

app.post('/move', (req, res) => {
  const board = req.body.board
  const bestMove = findBestMove(board)
  res.json({ move: bestMove })

  // const pythonProcess = spawn('python', ['tic_tac_toe_ai.py'])

  // pythonProcess.stdin.write(JSON.stringify(board))
  // pythonProcess.stdin.end()

  // pythonProcess.stdout.on('data', data => {
  //   const bestMove = JSON.parse(data)
  //   res.json({ move: bestMove })
  // })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
