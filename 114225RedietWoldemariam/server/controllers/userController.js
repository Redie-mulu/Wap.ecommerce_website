const User = require('../models/user');

exports.save = (req, res, next) => {
    const addedUser = new  User(null, req.body.username, req.body.password).save();
    res.status(201).json(addedUser);
}

exports.addItem = (req, res, next) => {
    const data = {
        id: req.body.id,
        name: req.body.
    }
    const addedUser = new  User(null, req.body.username, req.body.password).save();
    res.status(201).json(addedUser);
}