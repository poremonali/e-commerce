const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config');
const UserModel=require('../models/user_model');
//const mongoose=require("mongoose");
//const UserModel = require('../models/user_model');
//const UserModel=mongoose.model(UserModel);

module.exports=(req,res,next)=>
{
    const {authorization}=req.headers;
    console.log(authorization);
    if(!authorization)
    {
      return  res.status(401).send({error:"User not logged in"});
    }
    const token=authorization.replace("Bearer ","");
    console.log(token);

    console.log(req.headers)
    jwt.verify(token,JWT_SECRET,(error,payload)=>
    {
        if(error)
        {
            return  res.status(401).send({error:"User not logged in"});
        }
        const {_id}=payload;
        UserModel.findOne({_id})
        .then((dbUser)=>{
                req.user=dbUser;
                next();  //goes to next middleware or goes to next REST API
        })
    })
}