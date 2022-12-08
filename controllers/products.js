
var ordermodel=require("../models/product")


function deleteById(_id){
    
    return ordermodel.findByIdAndDelete(_id)
}

function patchById(_id,_stat){

   return ordermodel.findByIdAndUpdate(_id,_stat)
}

function create(newproduct){

 return   ordermodel.create(newproduct)
}



module.exports ={create,deleteById,patchById}