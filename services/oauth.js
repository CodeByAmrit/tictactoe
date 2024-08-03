const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken')
const secret = 'Amrit@Amrit@Amrit@123'

function setUser (user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    },
    secret
  )
}

function getUser (token) {
  if (!token) return null
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

function logoutUser (id) {
  console.log(id)
  sessionIdToUserMap.delete(id)
}

module.exports = { setUser, getUser, logoutUser }
