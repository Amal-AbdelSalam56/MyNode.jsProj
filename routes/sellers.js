var express = require('express');
var sellermodel = require("../models/sellers")
var jwt = require("jsonwebtoken");
var router = express.Router();

var bcrypt = require('bcrypt');

var { getSellerProds, create, deleteById } = require("../controllers/sellers")


router.post("/register", async function (req, res, next) {
  // try{
  var newseller = req.body;
  var seller = await create(newseller)
  res.json(seller);
  // }catch(err){
  //  res.status(404).send("Error:invalide value ")
  // }
})

router.post("/login", async function (req, res, next) {
  const { sellerName, password } = req.body;

  var seller = await sellermodel.findOne({ sellerName: sellerName }).exec()       //thenable object 

  if (seller) {
    var valid = bcrypt.compareSync(password, seller.password);
    if (valid) {
      var token = jwt.sign({
        data: {
            sellerName: seller.sellerName,
            sellerId: seller.id
        }
      }, process.env.SECRET, { expiresIn: '2h' });

      res.json(token)
    } else {
      res.status(401).json("uncorrect_password , please try again")
    }
  } else {
    res.status(401).json("uncorrect_name, please try again")
  }
})

router.put("/:id", async function (req, res, next) {
  if (req.body.sellerId == req.params.id) { ///you must put sellerId in body
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash( req.body.password, salt);

    } try {
      const updateSeller = await sellermodel.findByIdAndUpdate(req.params.id,
         { $set: req.body,
        }, 
         { new: true}
         );
      res.status(200).json(updateSeller)

    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(500).json("you can only update your own account")
  }
})

router.delete("/:id", async function (req, res, next) {
  try {
    var sellerId = req.params.id;
    var found = await deleteById(sellerId);

    res.json(found).send("Deleted");
  } catch (err) {
    res.status(422).send(err);
  }
})

router.get("/:id", async function (req, res, next) {
  try {
    var sellerId = req.params.id;
    var data = await getSellerProds(sellerId);
    res.json(data);

  } catch (err) {
    res.status(422).send(err);
  }
});




module.exports = router