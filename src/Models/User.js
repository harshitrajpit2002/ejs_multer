const mongoose = require('mongoose');

const userScheme=new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})


const user=mongoose.model('Users',userScheme);
module.exports={user};