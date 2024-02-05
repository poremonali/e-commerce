const userModel=require('../models/user_model');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');

const {JWT_SECRET}=require('../config');
const productModel = require('../models/product_model');
const orderModel=require('../models/order_model')

//user registration ,login implemented here
//in this other apis to getallproducts,getallproductsbyuserid also implemented.
const registerUser=async(req,res)=>
{
    const {name,email,username,address,password}=req.body;
    //validatoin for all fields ..
    if(!name||!email||!username||!address||!password)
    {
      return  res.status(400).send({message:"All fields are mandatory"});
    }
    let user=await userModel.findOne({email});
    if(user)
    {
            return res.json({message:"email is already registered"})
    }
   

    bcryptjs.hash(password,16)
    .then((hashedpassword)=>
    {
        const newuser=new userModel({name,email,username,address,password:hashedpassword})
        newuser.save()
        .then((newuser)=>
        {
            res.status(201).send({message:"user signed up successfully"});
        })
        .catch((error)=>{
            console.log(error);
        })
    })
    .catch((error)=>
    {
        console.log(error);
    })
}
const loginUser=async(req,res)=>
{
    try{

        const {email,password}=req.body;
        if( !email  || !password)
        {
            return res.status(400).send({message:"All the fields are mandatory"})

        }
//first check given email is present in database or not..if not send msg invalid credentials
        let userInDB=await userModel.findOne({email});
       
        if(!userInDB)
        {
            return res.status(400).send({message:"Invalid credentials"}) ;
        }
//if email present then check for password if password is available then login is successfull.
       bcryptjs.compare(password,userInDB.password)
       .then((didmatch)=>
       {
            if(didmatch)
            {
                
                const jwtToken=jwt.sign({_id:userInDB._id},JWT_SECRET);
                const userInfo={"email":userInDB.email,"name":userInDB.name,"userid":userInDB._id,"isadmin":userInDB.isAdmin,"address":userInDB.address}
                res.status(200).json({result:{token:jwtToken,user:userInfo}});
            }
            else
            {
                return res.status(400).send({message:"Invalid credentials"}) ;
            }
       }
       )
       .catch((err)=>
       {
            console.log(err);
       })
       
    }
    catch(error){
        console.log(error);
    }

}

const getAllProducts=async(req,res)=>
{
    try
    {
        console.log("Inside controller");
        const resp=await productModel.find();
        res.status(200).json({Allproducts:resp})
    }
    catch(error){
        res.status(500).send({message:"Error occured",error})
    }
}

const getCategoryProducts=async(req,res)=>
{
    const {category}=req.params;
    try
    {
        console.log("Inside controller",category);
        const resp=await productModel.find({category});
        res.status(200).json({Allproducts:resp})
    }
    catch(error){
        res.status(500).send({message:"Error occured",error})
    }
}

const getProductById=async(req,res)=>
{
    try{
        const {id}=req.params;
        const resp=await productModel.findById(id);
        if(!resp)
        {
            return res.status(404).send({message:"Product not found"})
        }
        res.status(200).send({Message:"product Found",resp})
    }
    catch(error)
    {
        res.status(500).send({Message:"Error occured",error})
    }
}
const getAllOrdersByUserId=async(req,res)=>
{
    const {userId}=req.params;
    try
    {
        const resp=await orderModel.findOne({userId});
        if(!resp)
        {
            return res.status(404).send({message:"Product not found"})
        }
        res.status(200).send({Message:"product Found",resp})
    }
    catch(error)
    {
        res.status(500).send({Message:"Error occured",error})
    }
}
const addOrderByuserId=async(req,res)=>
{
    const{userId,amount,del_status,address,products}=req.body;
    const neworder=new orderModel({userId,amount,del_status,address,products})
        neworder.save()
        .then((neworder)=>
        {
            res.status(201).send({message:"order added successfully"});
        })
        .catch((error)=>{
            console.log(error);
        })    
}
module.exports={
    registerUser,
    loginUser,
    getAllProducts,
    getProductById,
    getAllOrdersByUserId,
    addOrderByuserId,
    getCategoryProducts,
}

