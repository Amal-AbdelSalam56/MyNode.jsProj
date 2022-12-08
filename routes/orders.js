
var express = require('express');
var router = express.Router();
var {auth}=require("../middlewares/userAuthen")  

var { patchById, post, deleteById, getById } = require("../controllers/orders")

router.use(auth)

router.post("/user", async function (req, res, next) {
   try{ 
        var neworder = {amount:req.body.amount,userId:req.userId};  
        var result = await post(neworder);
        res.json(result);
   } catch (err) {
    res.status(422).json("there is an error");
   }
})

router.patch("/user/:id", async function (req, res, next) {

    try {
        var orderId = req.params.id;
        var statu = req.body.statu;

        var found = await patchById(orderId, statu);

        res.json(found);
    } catch (err) {
        res.status(422).send(err);
    }

})

router.delete("/user/:id", async function (req, res, next) {
    try {
        var orderId = req.params.id;
        var found = await deleteById(orderId);

        res.json(found);
    } catch (err) {
        res.status(422).send(err);
    }
})

router.get("/user/:id", async function (req, res) {
  
    let userId = req.params.id;
      
        var result = await getById(userId);

        res.json(result);
   
});


module.exports = router