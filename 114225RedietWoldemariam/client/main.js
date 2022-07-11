
var productArray = [];

let userAccesToken = sessionStorage.getItem("accessToken")

var userShoppingCart;

console.log(userShoppingCart);

window.onload = function () {
    userShoppingCart = getUserShoppingCart(userAccesToken);

    if (userShoppingCart.length > 0) {
        printShopingCart();
    }
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('loginBtn').onclick = function () {
        console.log("login");
        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    // showError(data.error);
                    alert(data.error)
                } else {
                    sessionStorage.setItem('accessToken', data.accessToken);
                    userShoppingCart = getUserShoppingCart(data.accessToken);
                    if (userShoppingCart.length > 0) {
                        printShopingCart();
                    }
                    console.log(data);
                    showProductPage();
                }
            })

    }
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        // .then(products => console.log(products));
        .then(products => {
            let html = `<tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Stock</th>
                <th scope="col">Action</th>
            </tr>`;
            productArray = products;
            products.forEach(prod => {
                html +=
                    `<tr>
                        <td scope="col">${prod.id}</td>
                        <td scope="col">${prod.name}</td>
                        <td scope="col">${prod.price}</td>
                        <td scope="col"><img class="productImages" src= "http://localhost:3000/images/${prod.image}"></td>
                        <td scope="col">${prod.stock}</td>
                        <td scope="col"> <button onclick = addToCart(${prod.id}) id=${prod.id}><img src="./cart3.svg" alt="cart" width="40" height="30"></button></td>
                    </tr>`
                // <button onclick='addToCart()' id....
            });
            document.getElementById('product_table').innerHTML = html;
        });
}

function showProductPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'block';
}
let addToCart = function (productId) {

    let product = productArray.filter(val => val.id == productId)[0];
    addProuductToShoppingCart(product);
    printShopingCart();
    localStorage.setItem(getUserId(sessionStorage.getItem("accessToken")), JSON.stringify(userShoppingCart));

}
let printShopingCart = function () {
    let html = ``;
    userShoppingCart.forEach(prod => {
        html +=
            `<tr>
              
                <td scope="col">${prod.name}</td>
                <td scope="col">${prod.price}</td>
                <td >${prod.total}</td>
                <td >${prod.quantity}</td>
            
            </tr>`
    });
    document.getElementById('shoppingCart').innerHTML = html;
}
let addProuductToShoppingCart = function (product) {
    if (userShoppingCart.map(val => val.id).includes(product.id)) {
        let order = userShoppingCart.filter(val => val.id == product.id)[0];
        if (product.stock == order.quantity) {
            alert("the item is out of stock!");
            return;
        }
        order.quantity += 1;
        order.total = order.price * order.quantity;
    }
    else {
        userShoppingCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            total: product.price,
            quantity: 1
        });
    }
}
let getUserId = function (accessToken) {

    return accessToken.split('-')[0];
}
let getUserShoppingCart = function (userAccesToken) {
    let userId = getUserId(userAccesToken);
    let userShoppingCartJsonString = localStorage.getItem(userId);
    return JSON.parse(userShoppingCartJsonString) || [];

}

