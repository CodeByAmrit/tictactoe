const express = require('express')
const router = express.Router()
const { restrictToLogin, singout } = require('../middleware/auth')
const {
  createUser,
  loginUser,
  createScore,
  getScore
} = require('../models/users')
const checkLogin = require('../middleware/checkLogin')

router.get('/logout', (req, res) => {
  res.clearCookie('uid')
  res.redirect('/')
})
router.get('/', checkLogin, async (req, res) => {
  const login_status = { status: req.login_status }
  // console.log(req.user)
  const user = { user: req.user }
  // console.log(login_status.status)
  res.render('index', { login_status, user })
})

router.post('/scoretable/:id', createScore)
router.get('/scoretable/:id', getScore)

router.post('/', restrictToLogin, loginUser)
router.post('/create', createUser)

module.exports = router
