const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Users = require('./users-model');
const validateUsername = require("./validateUsername");


function generateToken(user){
  const payload = { username: user.username }
  const secret = process.env.JWT_SECRET
  const options = { expiresIn: '1hr' }
  return jwt.sign(payload, secret, options)
}

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    
    if (!password){
        return res.status(400).json({message: "Please provide a password"})
    }

    const user = await Users.findByFilter({ username }).first()
    if(user){
        return res.status(400).json({message: "Username already taken"})
    }

    await Users.createUser(req.body)
    
    res.status(201).json({ message: `Welcome ${username}! Now go log in please!` })
  } catch(err){
    next(err)
  }
});

router.post('/login', validateUsername(), async (req, res, next) => {
  try {
    const { username, password } = req.body
    const isPasswordValid = bcrypt.compare(password, req.user.password)

    if(!isPasswordValid){
        res.status(400).json({ message: "Please enter a valid password" })
    } else {
        const token = generateToken(req.user)
        res.cookie("authToken", token).json({ message: `Welcome ${username}` })
    }
  } catch(err){
      next(err)
  }
});

module.exports = router;
