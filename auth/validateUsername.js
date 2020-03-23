const User = require("./users-model")

module.exports = function validateUser(){

    return async (req, res, next) => {
        try {
            const { username } = req.body
            const user = await User.findByFilter({ username }).first()
            if(!user){
                res.status(400).json({message: "Please enter a valid username"})
            }
            req.user = user
            next()
        } catch(err){
            next(err)
        }
    }
}