var mongoose= require('mongoose');

var bcrypt= require('bcrypt');

var usersSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        minlength:8
    },
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    password:{  
       type:String,
       required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    updateAt:Date
     });

     usersSchema.pre("save",function(next){     ////take next only

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.password,salt);

        this.password = hash;

        next();
     })


 var usercollection = mongoose.model("user", usersSchema);  //create collection

 module.exports = usercollection; 