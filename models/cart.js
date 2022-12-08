var mongoose= require('mongoose');

var cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
     },
     products: [{
        productId: String,
        quantity: {
           type: Number,
           default: 1
        },
     },
     ],
  });



 var cartcollection = mongoose.model("cart", cartSchema);  //create collection

 module.exports = cartcollection; 