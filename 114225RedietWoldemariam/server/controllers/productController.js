const Prouct = require('../models/product');

exports.save = (req, res, next) => {
    const addedProduct = new Prouct(null, req.body.name, req.body.description, req.body.price).save();
    res.status(201).json(addedProduct);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Prouct.getAll());
}

exports.deleteById = (req, res, next) => {
    res.json(Product.deleteById(req.params.productId));
}

exports.edit = (req, res) => {
    const editedProd = new Product(req.params.productId, req.body.title, req.body.description, req.body.price).edit();
    res.json(editedProd);
}