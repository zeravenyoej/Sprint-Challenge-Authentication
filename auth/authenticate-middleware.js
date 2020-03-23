/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")


module.exports = function authenticate() {
  return async (req, res, next) => {
    const { authToken } = req.cookies
    if (!authToken){
        return res.status(400).json({message: "No credentials provided"})
    } 

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            res.status(401).json({ message: "You shall not pass!" })
        } else {
            req.decodedToken = decodedToken
            next()
        }
    })
}}