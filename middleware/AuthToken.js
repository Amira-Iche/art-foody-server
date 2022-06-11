const { verify } = require("jsonwebtoken");


const AuthMiddleware = (req,res,next) => {
    const accessToken = req.header("accessToken")
    if(!accessToken) return res.status(400).json({error :"user not Logged in"})

    try {
        const validToken = verify(accessToken,"secretKey")
        req.user = validToken
        if(validToken) {
            return next()
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
}

module.exports = {AuthMiddleware}