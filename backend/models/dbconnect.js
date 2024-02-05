const mongoose=require('mongoose');
const dotenv=require('dotenv');

//dotenv package allows to create .env file to  keep password,other sensitive information out of your code. 
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected......"))
.catch((error)=>console.log("Error in connction",error));
