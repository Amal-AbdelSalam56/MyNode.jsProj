
var express = require('express');
var usermodel = require("../models/users")
var jwt = require("jsonwebtoken");
var router = express.Router();

var bcrypt = require('bcrypt');

var { getUserOrders, create, deleteById } = require("../controllers/users")


router.post("/register", async function (req, res, next) {
  // try{
  var newuser = req.body;
  var user = await create(newuser)
  res.json(user);
  // }catch(err){
  //  res.status(404).send("Error:invalide value ")
  // }
})

router.post("/login", async function (req, res, next) {
  const { userName, password } = req.body;

  var user = await usermodel.findOne({ userName: userName }).exec()       //thenable object 

  if (user) {
    var valid = bcrypt.compareSync(password, user.password);
    if (valid) {
      var token = jwt.sign({
        data: {
          userName: user.userName,
          userId: user.id
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
  if (req.body.userId == req.params.id) { ///you must put userId in body
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash( req.body.password, salt);

    } try {
      const updateUser = await usermodel.findByIdAndUpdate(req.params.id,
         { $set: req.body,
        }, 
         { new: true}
         );
      res.status(200).json(updateUser)

    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(500).json("you can only update your own account")
  }
})

router.delete("/:id", async function (req, res, next) {
  try {
    var userId = req.params.id;
    var found = await deleteById(userId);

    res.json(found).send("Deleted");
  } catch (err) {
    res.status(422).send(err);
  }
})

router.get("/:id", async function (req, res, next) {
  try {
    var userId = req.params.id;
    var data = await getUserOrders(userId);
    res.json(data);

  } catch (err) {
    res.status(422).send(err);
  }
});




module.exports = router