
const Product = require('../models/product');

let db = [
    {id: 1, username: 'John', password: '111', cart:[], accessToken:''},
    {id: 2, username: 'Edward', password: '222', cart:[], accessToken:''}
  ];

 

  let productDb = [];
  
  const product1 = new Product(1, "Node", "node.jpeg",9.99, 8);
  const product2 = new Product(2, "React", "react.jpeg",19.99, 5);
  const product3 = new Product(3, "Angular", "angular.jpeg",29.99, 13);
  productDb.push(product1);
  productDb.push(product2);
  productDb.push(product3);

  exports.users = db;
  exports.product = productDb;