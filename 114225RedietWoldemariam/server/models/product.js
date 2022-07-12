let products = [
    {
        "id": 1,
        "product_name": "Node",
        "product_price": 9.99,
        "product_stock": 8
    },
    {
        "id": 2,
        "product_name": "React",
        "product_price": 19.99,
        "product_stock": 5
    },
    {
        "id": 3,
        "product_name": "Angular",
        "product_price": 29.99,
        "product_stock": 13
    }
];

class Product {
    constructor(id, name, image, price, stock) {
        this.id = id;
        this.product_name = name;
        this.image = image;
        this.product_price = price;
        this.stock = stock;
    }


    // use increament id when ever we have new product id will increase by 1
    save() {
        this.id = ++counter;
        products.push(this);
        return this;
    }
    edit() {
        const index = db.findIndex(product => product.id == this.id);
        products.splice(index, 1, this);
        return this;
    }
    static getAll() {
        return products;
    }

    static findById(productId) {
        const index = products.findIndex(prod => prod.id == productId);
        if (index > -1) {
            return products[index];
        }
        else {
            throw new Error('Not Found');
        }
    }
    
    static deleteById(prodId) {
        const index = products.findIndex(product => product.id == prodId);
        const deletedProd = db[index];
        products.splice(index, 1);
        return deletedProd;
    }
}

module.exports = Product;