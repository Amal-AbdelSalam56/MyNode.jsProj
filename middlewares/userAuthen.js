
var jwt=require("jsonwebtoken")

function auth(req,res,next) {

    const {authorization}=req.headers;

    jwt.verify(authorization,process.env.SECRET,function(err,decoded){
        if(decoded){
            console.log(decoded);
            req.userId=decoded.data.userId; 
            next();
        }
        if(err){
            res.status(401).json("not allowed")
        }
    })

}

module.exports = {auth}