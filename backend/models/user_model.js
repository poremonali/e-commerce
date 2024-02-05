const mongoose=require('mongoose')

const Schema=mongoose.Schema;
//user model(schema) to specify user fields..
const userSchema=new Schema ({
    name:
    {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    username:
    {
        type:String,
        required:true,
    },
    address:
    {
        type:String,
        reuired:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    isAdmin:
    {
        type:Boolean,
        default:false,
    }

},{timestamps:true});

const userModel=mongoose.model('userModel',userSchema)
module.exports=userModel;