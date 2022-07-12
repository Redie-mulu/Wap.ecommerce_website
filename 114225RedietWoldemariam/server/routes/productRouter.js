const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// for save we will use post on prural url, since it is already configured let use /
//  and put the medlwere in side the controler
router.post('/', productController.save);
router.get('/', productController.getAll);
router.delete('/:deleteProductId', productController.deleteById);
router.put('/:addProductId', productController.edit);

module.exports = router;