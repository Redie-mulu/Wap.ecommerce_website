let counter = 0;

class Product {
    constructor(id, name, image, price, stock) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.stock = stock;
    }
    // use increament id when ever we have new product id will increase by 1
    save() {
        this.id = ++counter;
        db.push(this);
        return this;
    }
    edit() {
        const index = db.findIndex(product => product.id == this.id);
        db.splice(index, 1, this);
        return this;
    }
    static getAll() {
        return db;
    }

    static findById(productId) {
        const index = db.findIndex(prod => prod.id === productId);
        if (index > -1) {
            return db[index];
        }
        else {
            throw new Error('NoT Forund');
        }
    }
    static deleteById(prodId) {
        const index = db.findIndex(product => product.id == prodId);
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }
}

module.exports = Product;