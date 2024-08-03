const { getUser } = require('../services/oauth')
async function checkLogin (req, res, next) {
  const uid = req.cookies?.uid
  if (uid) {
    req.login_status = true
    req.user = await getUser(uid)
  } else {
    req.login_status = false
  }
  next()
}

module.exports = checkLogin
