var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var sellersSchema = mongoose.Schema({
    sellerName: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    password: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        },
    },
    ],
    updateAt: Date
});

sellersSchema.pre("save", function (next) {     ////take next only

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;

    next();
})


var sellercollection = mongoose.model("seller", sellersSchema);  //create collection

module.exports = sellercollection; 