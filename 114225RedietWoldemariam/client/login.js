window.onload = function(){
   

    document.getElementById('loginBtn').onclick = function(){
        console.log("login");
        fetch('http://localhost:3000/login',{
            method: 'POST',
            body:JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if(data.error){
                    //here is error
                    document.getElementById('errorMsg').innerHTML = data.error;
                } else {
                    sessionStorage.setItem('accessToken', data.accessToken);
                    // document.getElementById('login').remove();
                    // document.getElementById('main-content').style.display = 'block';
                    // fetchProduct();
                    location.href="index.html";
                    
                }
            })
            
    }
}