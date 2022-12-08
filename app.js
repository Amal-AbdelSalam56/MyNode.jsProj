const express = require('express')
const cors = require('cors')
const ordersroutes = require("./routes/orders")
const usersroutes = require("./routes/users")
const productsroutes = require("./routes/products")
const sellersroutes = require("./routes/sellers")


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/myshopdb")
var app = express();


app.use(express.json());  //middleware 
app.use(cors({
    origin: "*",
    methods:"GET POST PUT PATCH DELETE ",
    allowedHeaders:""
}))
app.use("/orders", ordersroutes);
app.use("/users", usersroutes); 
app.use("/products", productsroutes); 
app.use("/sellers", sellersroutes); 



app.listen(3000, () => {
    console.log("listening on port 3000");
})

module.exports=app
