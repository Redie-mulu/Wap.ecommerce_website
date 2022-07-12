
const { CallTracker } = require('assert');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.addProduct = (req, res, next) => {
    const product_id = req.params["product_id"];
    const product = Product.findById(product_id);
    if (product.product_stock < 0) {
        throw new Error(`Product [${product.product_name}] is out of stock`);
    } else {
        const username = req.username;
        res.status(200).json(Cart.addProduct(username, product));
    }
}

exports.getProducts = (req, res, next) => {
    // console.log(Cart.getProducts(req.username));
    res.status(200).json(Cart.getProducts(req.username));
}

exports.updateQuantity = (req, res, next) => {
    res.status(200).json(Cart.updateQuantity(req.username, req.params["product_id"], req.body.quantity));
}

exports.placeOrder = (req, res, next) => {
    res.status(200).json(Cart.placeOrder(req.username));
}