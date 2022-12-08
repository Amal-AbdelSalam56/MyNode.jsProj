
var usermodel=require("../models/users")


  function getUserOrders(_id){
    return   usermodel.findById(_id).populate("order");
  }

function deleteById(_id){
    return usermodel.findByIdAndDelete(_id)
}


function create(newuser){

 return   usermodel.create(newuser)
}

module.exports ={getUserOrders,create,deleteById}

