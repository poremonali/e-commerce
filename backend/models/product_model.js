const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// as per name product model is for product data..
const productSchema=new Schema({

    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        
    },
    category:
    {
        type:String,
        required:true,
    },
    image:
    {
        type:String,
    },
    
} ,{timestamps:true})

const productModel=mongoose.model('productModel',productSchema)
module.exports=productModel;