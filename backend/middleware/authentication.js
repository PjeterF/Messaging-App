const jwt = require('jsonwebtoken')

function authenticateJWT(req, res, next){
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error:'Invalid authorization header'});
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'


    if(!token){
        return res.status(401).json({error:'Missing JWT'})
    }

    try {
        const verified=jwt.verify(token, process.env.TOKEN_KEY)

        req.verifiedToken=verified
        next()
    } catch (error) {
        return res.status(401).json({error:'Invalid token'})
    }
}

module.exports={
    authenticateJWT
}