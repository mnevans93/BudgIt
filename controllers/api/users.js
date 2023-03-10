const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkToken = (req, res) => {
  res.json(req.exp)
}

const dataController = {
  async verifyAgainstDB (req, res, next) {
    const dbItem = await User.findById(req.params.id)
    if (req.user.name === dbItem.name) {
      next()
    } else {
      res.status(401)
    }
  },
  async create (req, res, next) {
    try {
      const user = await User.create(req.body)
      const token = createJWT(user)
      res.locals.data.user = user
      res.locals.data.token = token
      next()
    } catch (e) {
      res.status(400).json('This email is already in use. Please use another.')
    }
  },
  async login (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw new Error()
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error()
      res.locals.data.user = user
      res.locals.data.token = createJWT(user)
      next()
    } catch {
      res.status(400).json('Login information was incorrect.')
    }
  },
  async update (req, res, next) {
    try {
      const user = await User.findByIdAndUpdate(req.body._id, req.body, { new: true })
      if (!user) throw new Error()
      res.locals.data.user = user
      res.locals.data.token = createJWT(user)
      next()
    } catch {
      res.status(400).json('Update failed.')
    }
  },
  async deleteUser (req, res, next) {
    try {
      const user = await User.findByIdAndDelete(req.body._id)
      res.json(user)
      next()
    } catch {
      res.status(400).json('Account deletion failed.')
    }
  }
}

const apiController = {
  auth (req, res) {
    res.json(res.locals.data.token)
  }
}

module.exports = { checkToken, dataController, apiController }

function createJWT (user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '7d' }
  )
}
