const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const {ObjectId}=mongoose.Schema.Types; //
//oreder model used after comleting order or confirming order..
const orderSchema=new Schema({
    //userId referncing user model is required to know which users order is this..
    userId:
    {
        type:ObjectId,
        ref:"userModel",

    },
    amount:
    {
        type:Number,
        required:true,
    },
    del_status:
    {
        type:String,
    }, 
    address:
    {
        type:String,
        required:true,
    },
    products:
    [{
        type:ObjectId,
        ref:"productModel"
    }]

})

const orderModel=mongoose.model('orderModel',orderSchema);
module.exports=orderModel;