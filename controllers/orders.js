
var ordermodel=require("../models/order")


function deleteById(_id){
    return ordermodel.findByIdAndDelete(_id)
}

function patchById(_id,_stat){

   return ordermodel.findByIdAndUpdate(_id,_stat)
}

function post(neworder){

 return   ordermodel.create(neworder)
}

function getById(_id){

    let res =  ordermodel.findById(_id);
 
      return res
}

module.exports ={post,deleteById,patchById,getById}

