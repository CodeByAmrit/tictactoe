require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { findBestMove } = require('./ai')
const router = require('./routes/route')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT
const ip = '172.17.171.46'

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

})

app.listen(port, () => {
  console.log(`Server running at http://:${port}`)
})
