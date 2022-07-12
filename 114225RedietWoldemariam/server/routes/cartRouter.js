const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

// we only need to post 
router.post('/products/:product_id', cartController.addProduct);
router.get('/products', cartController.getProducts);
router.put('/products/:product_id', cartController.updateQuantity);
router.get('/products/placeOrder', cartController.placeOrder);
module.exports = router;