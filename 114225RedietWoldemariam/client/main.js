
var productArray = [];

let userAccesToken = sessionStorage.getItem("accessToken")

var userShoppingCart;

console.log(userShoppingCart);

window.onload = function () {

    if (sessionStorage.getItem("accessToken")) {
        // user is already logged in
        displayContent(true);
        getUserCart(sessionStorage.getItem("username"));
    } else {
        displayContent(false);
    }

    document.getElementById('loginBtn').onclick = function () {
        console.log("login");
        fetch('http://localhost:3000/users/login', {
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
                    alert(data.error)
                } else {
                    console.log(data);
                    sessionStorage.setItem('accessToken', data.accessToken);
                    sessionStorage.setItem('username', data.username);

                    getUserCart(data.username);
                }
            });
        }
        
        document.getElementById('logoutBtn').onclick = function () {
            console.log("logout");
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('userName');
            displayContent(false);
        }
    /*
       if(userShoppingCart.length > 0) {
        printShopingCart();
    }
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainContainer').style.display = 'none';
      

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
        */
    // document.getElementById('testBtn').onclick = fetchProduct;
}

// function showProductPage() {
//     document.getElementById('loginPage').style.display = 'none';
//     document.getElementById('mainContainer').style.display = 'block';
//     // .getElementById('main-content').style.display = 'block';
// }

function getUserCart(username){
    fetch('http://localhost:3000/cart/products?username='+username, {
            method: 'GET',
            body: null,
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('accessToken')
            }
        }).then(response => response.json())
        .then(data => {
            userShoppingCart = data
            printShopingCart()

        })
}

function displayContent(isVisible) {
    if (isVisible) {
        console.log("logged in already !");
        document.getElementById("welcome-text").style.display = "none";
        document.getElementById('product-div').style.display='block';
        //document.getElementById('cart-div').style.display='block';
        document.getElementById('welcome-div').innerHTML = "Welcome, " + sessionStorage.getItem("username");
        document.getElementById('logout-div').style.display='block';
        document.getElementById('login-div').style.display='none';
        document.getElementById('mainContainer').style.display='block';
        
        displayProducts();
        displayCart();
    } else {
        console.log("not login yet");
        document.getElementById("welcome-text").style.display = "block";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('product-div').style.display='none';
        document.getElementById('mainContainer').style.display='none';
        document.getElementById('welcome-div').innerHTML = "";
        document.getElementById('logout-div').style.display='none';
        document.getElementById('login-div').style.display='block';
    }
}

function displayProducts() {
    console.log("display products......");
    fetch('http://localhost:3000/products', {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': sessionStorage.getItem('accessToken')
        },
        body: null})
        .then(response => response.json())
        // .then(products => console.log(products));
        .then(products => {
            // let html = `<tr>
            //     <th scope="col">Id</th>
            //     <th scope="col">Name</th>
            //     <th scope="col">Price</th>
            //     <th scope="col">Image</th>
            //     <th scope="col">Stock</th>
            //     <th scope="col">Action</th>
            // </tr>`;
            let html = '';
            productArray = products;
            products.forEach(prod => {
                html +=
                    `<tr>
                        <td scope="col">${prod.id}</td>
                        <td scope="col">${prod.product_name}</td>
                        <td scope="col">${prod.product_price}</td>
                        <td scope="col"><img class="productImages" src= "http://localhost:3000/images/${prod.image}"></td>
                        <td scope="col">${prod.product_stock}</td>
                        <td scope="col"> <button onclick = addToCart(${prod.id}) id=${prod.id}><img src="./cart3.svg" alt="cart" width="40" height="30"></button></td>
                    </tr>`
                // <button onclick='addToCart()' id....
            });
            document.getElementById('product_table').innerHTML = html;
        });
}
function displayCart() {
    console.log("display cart......");
}

function addToCart(id){
    fetch('http://localhost:3000/cart/products/'+id, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': sessionStorage.getItem('accessToken')
        }}).then(a => {
            getUserCart();
        })
    
}
// function showError(message) {
//     document.getElementById('errorMsg').innerHTML = message;;
//     setTimeout(() => {
//         document.getElementById('errorMsg').innerHTML = '';  
//     }, 3000);
// }
// let addToCart = function (productId) {

//     let product = productArray.filter(val => val.id == productId)[0];
//     addProuductToShoppingCart(product); 
//     printShopingCart();
//     // JSON.stringify(userShoppingCart)
//     // JSON.parse(userShopp)

//     localStorage.setItem(getUserId(sessionStorage.getItem("accessToken")), JSON.stringify(userShoppingCart));

//     // console.log(userShoppingCart);
    
// }

function updateProductQuantity(prod, qnt){
    fetch('http://localhost:3000/cart/products/'+prod, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            quantity: qnt
    })}).then(a => {
            getUserCart();
        })
}

function placeOrder(){
   
    fetch('http://localhost:3000/cart/products/placeOrder?username='+sessionStorage.getItem('username'), {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': sessionStorage.getItem('accessToken')
        },
    //     body: JSON.stringify({
    //         username: sessionStorage.getItem('username')
    // })
}).then(a => {
        // console.log(2)
            displayProducts();
            getUserCart();
            
        })
}

let printShopingCart = function () {
    if(userShoppingCart.length > 0) {
        document.getElementById("cart-table").style.display = "table"
        document.getElementById("no-items").style.display = "none"
        let html = ``;
        userShoppingCart.forEach(prod => {
            html +=
                `<tr>
                
                    <td scope="col">${prod.name}</td>
                    <td scope="col">${prod.price}</td>
                    <td >${prod.price * prod.quantity}</td>
                    <td ><button onclick="updateProductQuantity(${prod.id}, ${prod.quantity - 1})">-</button>${prod.quantity}<button onclick="updateProductQuantity(${prod.id}, ${prod.quantity + 1})">+</button></td>
                
                </tr>`
            // <button onclick='addToCart()' id....
        });
        // <button onclick='addToCart()' id....
        document.getElementById('shoppingCart').innerHTML = html;
    }else{
        document.getElementById("cart-table").style.display = "none"
        document.getElementById("no-items").style.display = "table"
    }
}
// let addProuductToShoppingCart = function(product) {
//     if(userShoppingCart.map(val => val.id).includes(product.id)){
//        let order =  userShoppingCart.filter(val => val.id == product.id)[0];
//        if(product.stock == order.quantity) {
//             alert("the item is out of stock!");
//             return;
//        }
//         order.quantity += 1;
//         order.total = order.price * order.quantity;
//     }
//     else{
//         userShoppingCart.push({
//             id : product.id,
//             name: product.name,
//             price:product.price,
//             total: product.price,
//             quantity:1
//         });
//     }
// }
// let getUserId = function(accessToken) {
    
//     return accessToken.split('-')[0];
//  }

