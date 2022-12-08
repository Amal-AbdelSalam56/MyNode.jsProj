var mongoose= require('mongoose');

var productSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.ObjectId,
        ref: "seller"
     },
    name:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    price:{
        type:String,
        required:true
    },
    categories:Array,
    sellerName:String,
    createdAt:Date,
    size:String,

     });



 var productcollection = mongoose.model("product", productSchema);  //create collection

 module.exports = productcollection; 