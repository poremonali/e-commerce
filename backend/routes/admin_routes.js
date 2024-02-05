const express=require('express')

const router=express.Router();
const{addProduct,getAllProductsbyadmin,editproductbyid, deleteProductById,getAllUsers,getAllOrders,updateProductList}=require('../controllers/admin_controller');
const protectedresource=require('../middleware/protectedresource');

router.post("/api/v1/ecommerce/addproductbyadmin",protectedresource,addProduct);
router.get("/api/v1/ecommerce/getallproductsbyadmin",getAllProductsbyadmin)
router.put("/api/v1/ecommerce/editproductbyadmin",editproductbyid)
router.delete("/api/v1/ecommerce/deleteproductbyadmin/:id",deleteProductById)
router.get("/api/v1/ecommerce/getallusers",protectedresource,getAllUsers)
router.get("/api/v1/ecommerce/getallorders/:id",getAllOrders)
router.put("/api/v1/ecommerce/updateroductslist",updateProductList)
module.exports=router;