var express = require('express');
var router = express.Router();
var productmodel=require("../models/product")

var { patchById, create, deleteById } = require("../controllers/products")

var {authe}=require("../middlewares/sellerAuth")  


router.use(authe)


router.post("/seller", async function (req, res, next) {
    // try{ 
         var newproduct = {name:req.body.name,desc:req.body.desc,price:req.body.price,sellerId:req.sellerId};  
         var result = await create(newproduct);
         res.json(result);
    // } catch (err) {
    //  res.status(422).json("there is an error");
    // }
 })

router.get("/", async function (req, res, next) {   ////GET BY PRODUCT NAME
    try {
        var result;
        const proName = req.query.name;
        if (proName) {
            result = await productmodel.find({
                name: {
                    $in: [proName],
                },
            }).populate("sellerId")
        } else {
            result = productmodel.find();
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }

})

// router.get("/", async function (req, res, next) {   ////GET BY SELLER NAME
//     try {
//         var result;
//         const sellerName = req.query.sellerName;
//         if (sellerName) {
//             result = await productmodel.find({
//                 sellerName: {
//                     $in: [sellerName],
//                 },
//             }).populate("sellerId")
//         } else {
//             result = productmodel.find();
//         }

//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }

// })

router.patch("/seller/:id", async function (req, res, next) {

    try {
        var sellerId = req.params.id;
        var statu = req.body.statu;

        var found = await patchById(sellerId, statu);

        res.json(found);
    } catch (err) {
        res.status(422).send(err);
    }

})

router.delete("/seller/:id", async function (req, res, next) {
    try {
        var sellerId = req.params.id;
        var found = await deleteById(sellerId);

        res.json(found);
    } catch (err) {
        res.status(422).send(err);
    }
})



module.exports = router;