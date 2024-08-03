const { getUser } = require('../services/oauth')

async function checkLogin (req, res, next) {
  const uid = req.cookies?.uid
  
  if (uid) {
    req.login_status = true
    req.user = await getUser(uid)
    // console.log(req.user);
    
  } else {
    req.login_status = false
  }
  next()
}

module.exports = checkLogin
