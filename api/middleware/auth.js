const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config/dev.env' });

const jwtAuthenticate = async (req,res,next) =>{
    //get the header
    try {
        const token = req.header('API_KEY'); //Getting The Actual Token
        
        const decode = jwt.verify(token,process.env.JWT_TOKEN);
        if (!decode) {
            throw new Error('Authentication Failed');
        }
        req.token = token;
        next();
    } catch(e) {
        return res.send({error:true,errorMsg:'Authentication Failed'});
    }
}



module.exports = jwtAuthenticate;