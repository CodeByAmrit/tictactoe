const { getUser } = require('../services/oauth')

async function restrictToLogin (req, res, next) {
  const userUId = req.cookies?.uid
  console.log("middleware", req.cookies?.uid);
  try {
    if (userUId) {
      return res.redirect('/')
    }
    
    const user = await getUser(userUId)

    if (user) {
      return res.redirect('/')
    }
    // Set req.user to the retrieved user object
    req.user = user
    
    
    next() // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in restrictToLogin middleware:', error)
    return res.status(500).send('Internal server error')
  }
}

function singout (req, res) {
  res.clearCookie('uid')
  res.redirect('/')
}

module.exports = { restrictToLogin, singout }
