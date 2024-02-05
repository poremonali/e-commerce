const express=require('express');

const {seedUser ,seedProduct}=require('../controllers/seed_controller')
const router=express.Router();

router.post('/api/v1/ecommerce/seeduser',seedUser);
router.post('/api/v1/ecommerce/seedproduct',seedProduct);

module.exports=router;