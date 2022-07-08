let db = [];
let counter = 0;
module.exports=class Prouct {
    constructor(id, title, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }
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
    static deleteById(prodId) {
        const index = db.findIndex(product => product.id == prodId);
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }
}