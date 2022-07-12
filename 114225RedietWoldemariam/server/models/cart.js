const { save } = require("../controllers/productController");
const Product = require('./product');

let cart = [
    /*
    {
        "username": "redi",
        "products":[
            {
                "id":1,
                "name":"node 1",
                "price":9.99,
                "quanity":2
            },
            {
                "id":2,
                "name":"node 2",
                "price":29.99,
                "quanity":1
            }
        ]
    }*/
];

let counter = 0;

class Cart {
    constructor(id, userName, product) {
        this.id = id;
        this.userName = userName;
        this.product = product;

    }

    static addProduct(username, product) {
        const userIdx = cart.findIndex(usr => usr.username == username);
        if(product.product_stock <= 0) throw new Error(`the product id [${product.id}] is not in the stock!`);
        if (userIdx > -1) {
            const user = cart[userIdx];
            const productIdx = user.products.findIndex(prd => prd.id == product.id);
            if (productIdx > -1) {
                this.updateQuantity(username, product.id, user.products[productIdx].quantity + 1)
                // user.products[productIdx].quantity += 1;
                return user.products[productIdx];
            } else {
                const productObj = {
                    id: product.id,
                    name: product.product_name,
                    price: product.product_price,
                    quantity: 1
                };
                user.products.push(productObj);
                return productObj;
            }
        } else {
            const productObj = {
                id: product.id,
                name: product.product_name,
                price: product.product_price,
                quantity: 1
            };
            const userObj = {
                username: username,
                products: [productObj]
            }
            cart.push(userObj);
            return productObj;
        }
    }

    static getProducts(username) {
        // the user exist display the product
        const userIdx = cart.findIndex(usr => usr.username == username);
        if (userIdx > -1) {
            return cart[userIdx].products;
        } else {
            return [];
        }
    }
    static updateQuantity(username, product_id, request_quantity) {
        const userIdx = cart.findIndex(usr => usr.username == username);
        if (userIdx > -1) {
            const userCart = cart[userIdx];
            const productIdx = userCart.products.findIndex(prd => prd.id == product_id);
            console.log("productidx", productIdx);
            const product = Product.findById(product_id);

            if (productIdx > -1) {
                if (product) {
                    const stock = product.product_stock;
                    if (stock == 0 || request_quantity == 0) {
                        // delete this product out of Cart;
                        userCart.products.splice(productIdx, 1);
                    } else if (stock > request_quantity) {
                        userCart.products[productIdx].quantity = request_quantity;
                        
                    } else {
                        userCart.products[productIdx].quantity = stock;
                        throw new Error(`${product.product_name} has only ${stock}. Your cart is reloaded.`);
                    }
                } else {
                    throw new Error(`Product id [${product_id}] is not found.`);
                }
            }
            else {
                throw new Error(`the product id [${product_id}] is not in the stock!`);
            }
        } else {
            throw new Error('user not found!');
        }
        return "Product quantity  is updated successfully !";
    }
    // place order functionality.
    static placeOrder(username) {
        const userIdx = cart.findIndex(usr => usr.username == username);
        if (userIdx > -1) {
            let userCart = cart[userIdx];
            userCart["products"].forEach((e, idx) => {
                let prod = Product.findById(e.id)
                if(prod.product_stock < e.quantity){
                //     if(confirm("Not enough products, wanna take the left overs?")) 
                //     userCart["products"][idx].quantity = prod.product_stock
                //     else
                        throw new Error('can not get product in the stock!');
                }
                prod.product_stock -= e.quantity
            });
            cart[userIdx] = []
        }
    }
    // remove product
    static removeProduct() {

    }

}

module.exports = Cart;