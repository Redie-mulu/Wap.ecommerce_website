window.onload = function () {

    // document.getElementById('submiteBtn').onclick = function() {
    // const Name = document.getElementById('Name').value;
    // const Price = document.getElementById('Price').value;
    // const  Image = document.getElementById('Name').value;
    // const  Stock = document.getElementById('Stock').value;
    // const  Action = document.getElementById('Action').value;
    //     fetch('http://localhost:3000/products')

    // }

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
            products.forEach(prod => {
                html +=
                    `<tr>
                        <td scope="col">${prod.id}</td>
                        <td scope="col">${prod.name}</td>
                        <td scope="col">${prod.price}</td>
                        <td scope="col"><img class="productImages" src= "http://localhost:3000/images/${prod.image}"></td>
                        <td scope="col">${prod.stock}</td>
                        <td scope="col"> <button id=${prod.id}><img src="./cart3.svg" alt="cart" width="40" height="30"></button></td>
                    </tr>`
            });
            document.getElementById('product_table').innerHTML = html;
        });

    document.getElementById('testBtn').onclick = fetchProduct;

}
