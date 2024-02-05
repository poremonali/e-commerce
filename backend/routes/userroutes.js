const express=require('express')

//const {registerUser,loginUser,getAllProducts, getProductById,getAllOrdersByUserId}=require('../controllers/user_controller')
const {registerUser,loginUser,getAllProducts,getProductById,getAllOrdersByUserId,addOrderByuserId,getCategoryProducts}=require('../controllers/user_controller')
const router=express.Router();

router.post('/api/v1/ecommerce/registeruser',registerUser);
router.post('/api/v1/ecommerce/loginuser',loginUser);
router.get('/api/v1/ecommerce/getallproducts',getAllProducts);
router.get('/api/v1/ecommerce/getproductbyid/:id',getProductById);

router.get("/api/v1/ecommerce/getAllOrdersByUserId/:userId",getAllOrdersByUserId);
router.post("/api/v1/ecommerce/addorderbyuserid",addOrderByuserId)
router.get('/api/v1/ecommerce/getcategoryproducts/:category',getCategoryProducts);
module.exports=router;