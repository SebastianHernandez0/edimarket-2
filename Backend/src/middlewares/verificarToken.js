const jwt = require("jsonwebtoken");

const verificarToken = async (req, res, next) => {
    const vtoken= req.headers.authorization;
    if(!vtoken){ 
        return res.status(401).json({message:"No token provided"});
    }
    const [bearer, token]= vtoken.split(" ");
    if(bearer!=="Bearer"){
        return res.status(401).json({message:"Invalid token"});
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
    }
}

module.exports= verificarToken;