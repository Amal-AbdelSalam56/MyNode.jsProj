
var jwt=require("jsonwebtoken")

function authe(req,res,next) {

    const {authorization}=req.headers;

    jwt.verify(authorization,process.env.SECRET,function(err,decoded){
        if(decoded){
            console.log(decoded);
            req.sellerId=decoded.data.sellerId; 
            next();
        }
        if(err){
            res.status(401).json("not allowed")
        }
    })

}

module.exports = {authe}