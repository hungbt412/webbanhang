const jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
dotenv.config()

const authMiddleWare =(req,res,next) => {
    // console.log('req',req.headers.token)
    const token =req.headers.token.split(' ')[1]
    if(!token){
        return res.status(404).json({
            status:'error',
            message: 'Token is valid'
        })
    }
    console.log('token',token)
    const token2 =process.env.ACCESS_TOKEN 
    console.log('token2',token2 )
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        console.log('u',user)
        if(err){
            return res.status(404).json({
                message: 'The user is not authMW',
                status:'error'
            })
        }
        if(user?.isAdmin){
            next()
        }else {
            return res.status(404).json({
                message: 'The user is not auth2MW',
                status:'error'
            })
        }
    });
}

const authUserMiddleWare =(req,res,next) => {

    const token =req.headers.token.split(' ')[1]
    const userId =req.params.id
    if(!token){
        return res.status(404).json({
            status:'error',
            message: 'Token is valid'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(404).json({
                message: 'The user is not authUMW',
                status:'error'
            })
        }
        if(user?.isAdmin || user?.id===userId){
            next()
        }else {
            return res.status(404).json({
                message: 'The user is not auth2UMW',
                status:'error'
            })
        }
    });
}

module.exports= {
    authMiddleWare,
    authUserMiddleWare
}