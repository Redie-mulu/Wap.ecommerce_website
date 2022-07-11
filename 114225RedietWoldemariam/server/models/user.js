
let userDb = [
    {
        "id" :1,
        "username" :'redi',
        "password": "2"

    },
    {
        "id" :2,
        "username" :'tata',
        "password": "4"

    }
]
class User{
    constructor(id, username, password) {
        this.id = id;
        this.namusernamee =  username;
        this.password = password;
        this.cart = [];
        this.accessToken = '';
    }

    static find(userName, password) {

        return users.find(prod => prod.userName === userName && prod.password === password);
    }

    addItemtoUserCart(item){
      this.cart.push(item);
    }
}
