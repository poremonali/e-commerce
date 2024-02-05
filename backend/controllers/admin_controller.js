const orderModel = require('../models/order_model');
const productModel=require('../models/product_model');
const userModel = require('../models/user_model');

//admin related activities are done here..

//adding new product to database.. entries are taken from frontend using admin dashboard 
const addProduct=async (req,res)=>
{
        const{name,price,quantity,category,image}=req.body;
        if(!name||!price||!quantity||!category||!image)
        {
            return res.status(400).send({message:"All fields are mandatory"})
        }
        const newProduct=new productModel({name,price,quantity,category,image});
        newProduct.save()
        .then((result)=>
        {
            res.status(200).send({message:"Product added successfully"});
        })
        .catch((error)=>
        {
            console.log("error occured",error);
        })

}
const getAllProductsbyadmin=async(req,res)=>
{
    try
    {
        console.log("Inside controller");
        const resp=await productModel.find();
        res.status(200).send(resp)
    }
    catch(error){
        res.status(500).send({message:"Error occured",error})
    }
}

const editproductbyid=async(req,res)=>
{
    const {id}=req.params;
    console.log("user id",{id});
    try{
        
        const product=await productModel.findById(id);
        if(!product)
        {
            return res.status(404).send({message:"Product not found to update"})
        }
        console.log(req.body);
        const resp=await productModel.findByIdAndUpdate(id,req.body)
        
        res.status(201).send({message:"product updated",resp})
    }
    catch(error)
    {
        res.status(500).send({Message:"Error occured",error})
    }
}
const deleteProductById=async(req,res)=>
{
    const id=req.params.id;
    console.log("user id",{id});
    try{
        
        const product=await productModel.findById({_id:id});
        if(!product)
        {
            return res.status(404).send({message:"Product not found to delete"})
        }
     //   console.log(req.body);
        const resp=await productModel.deleteOne({_id:id})
        
        res.status(201).send({message:"product deleted",resp})
    }
    catch(error)
    {
        res.status(500).send({Message:"Error occured",error})
    }
}
const getAllUsers=async(req,res)=>
{
    try
    {
        console.log("Inside controller");
        const resp=await userModel.find();
        res.status(200).send(resp)
    }
    catch(error){
        res.status(500).send({message:"Error occured",error})
    }
}
const getAllOrders=async(req,res)=>
{
    const id=req.params.id;
    try
    {
        console.log("Inside controller");
        const resp=await orderModel.findOne({userId:id});
        res.status(200).send(resp)
    }
    catch(error){
        res.status(500).send({message:"Error occured",error})
    }
}

const updateProductList=async(req,res)=>
{
    try{
        console.log("Inside update product list controller")
        const {userId,products}=req.body;
        
       console.log(req.body);
      // orderModel.findOne({userId:userId})
         orderModel.findOneAndUpdate({userId:userId}, {
       
                $push: { products: products}
            }, 
            {
             new: true,
            })
            .then((response)=>
            {
                res.json(response)
            })
            .catch((error)=>
            {
                console.log(error)
            })
        
    }
    catch(error)
    {

    }
}

//following activities implemented here
module.exports={
    addProduct,
    getAllProductsbyadmin,
    editproductbyid,
    deleteProductById,
    getAllOrders,
    getAllUsers,
    updateProductList
}