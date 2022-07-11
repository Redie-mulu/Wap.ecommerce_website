const { save } = require("../controllers/productController");

let cartDb = [
    {
        "userName": "redi",
        "products":[
            {
                "id":1,
                "name":"node",
                "price":9.99,
                "stok":10
            }
        ]
    }
];

let counter = 0;

class Cart{
    constructor(id,userName, product){
        this.id = id;
        this.userName = userName;
        this.product = product;
        
    }

getproduct = cartDb.filter(val => val.userName === )
}