const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token = req.get('Authorization') || req.query.token
  if (token) {
    token = token.replace('Bearer ', '')
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      req.user = err ? null : decoded.user
    })
    return next()
  } else {
    req.user = null
    return next()
  }
}
