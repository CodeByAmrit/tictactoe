const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken')
const secret = 'Amrit@Amrit@Amrit@123'

function setUser (user) {  
  return jwt.sign(
    {
      _id: user[0].userId,
      email: user[0].email,
      first_name: user[0].Name
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


module.exports = { setUser, getUser }
