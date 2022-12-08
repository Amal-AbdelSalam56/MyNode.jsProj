
var sellermodel=require("../models/sellers")


function getSellerProds(_id){
  return   sellermodel.findById(_id).populate("seller");
}

function deleteById(_id){
  return sellermodel.findByIdAndDelete(_id)
}

function create(newseller){

return   sellermodel.create(newseller)
}

module.exports ={getSellerProds,create,deleteById}

