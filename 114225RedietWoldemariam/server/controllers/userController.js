const User = require('../models/user');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "rediet";

exports.save = (req, res, next) => {
    const addedUser = new User(null, req.body.username, req.body.password).save();
    res.status(201).json(addedUser);
}

exports.addItem = (req, res, next) => {
    const data = {
        id: req.body.id,
        name: req.body.name
    }
    const addedUser = new User(null, req.body.username, req.body.password).save();
    res.status(201).json(addedUser);
}

exports.login = (req, res, next) => {
    const user = User.login(req.body.username, req.body.password);
    if (user) {
        const token = jwt.sign({ username: user.username, createDt: new Date() }, PRIVATE_KEY);
        const resObj = {
            accessToken: token,
            username: req.body.username
        }
        res.status(201).json(resObj);
    } else {
        throw new Error('Invalid username and password!');
    }
}