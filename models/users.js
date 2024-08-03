const { User, Score } = require('./schema')
const { setUser } = require('../services/oauth')
const { json } = require('body-parser')

async function createUser (req, res) {
  const { first_name, last_name, email, password } = req.body

  const newCreate = await User.create({
    first_name,
    last_name,
    email,
    password
  })
  res
    .status(201)
    .send(
      `<script>alert("User Created Successfully. Id = ${newCreate.email}"); window.location.href = "/";</script>`
    )
}

async function createScore (req, res) {
  // const { first_name, dateTime, result } = req.body
  // console.log('Received data:', { first_name, dateTime, result })
  const id = req.params.id
  let { first_name, dateTime, result } = req.body

  let newCreateScore = await Score.create({
    playerId: id,
    name: first_name,
    dateTime: dateTime,
    result: result
  })
  res.status(201).json({ record: newCreateScore })
}

async function getScore (req, res) {
  const { id } = req.params

  try {
    // Attempt to find the user based on email and password
    const result = await Score.find({ playerId: id })

    if (!result) {
      // If user not found, handle the login failure
      return res.status(401).json({ status: false, result: 'not found' })
    }
    return res.json({ result: result })
  } catch (error) {
    // Handle any errors that occurred during the findOne() operation or session management
    console.error('Error logging in:', error)
    return res.status(500).send('Internal server error')
  }
}

async function loginUser (req, res) {
  const { email, password } = req.body

  try {
    // Attempt to find the user based on email and password
    const result = await User.findOne({ email: email, password: password })

    if (!result) {
      // If user not found, handle the login failure
      return res
        .status(401)
        .send(
          `<script>alert("email or password is not correct"); window.location.href = "/";</script>`
        )
    }
    const token = setUser(result)
    res.cookie('uid', token, { httpOnly: true })
    return res.redirect('/')
  } catch (error) {
    // Handle any errors that occurred during the findOne() operation or session management
    console.error('Error logging in:', error)
    return res.status(500).send('Internal server error')
  }
}

module.exports = { createUser, loginUser, createScore, getScore }
