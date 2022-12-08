var mongoose = require('mongoose');

var ordersSchema = mongoose.Schema({

   userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user"
   },
   products: [{
      productId: {
         type: mongoose.Schema.ObjectId,
         ref: "product"
      },
      quantity: {
         type: Number,
         default: 1
      },
   },
   ],
   amount: {
      type: Number,
      require: true
   },
   address: String,
   statue: String,
   createdAt: Date,
   updateAt: Date
});


var ordercollection = mongoose.model('order', ordersSchema);  //create collection

module.exports = ordercollection; 