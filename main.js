let carts = document.querySelectorAll('.addCart');

let products = [
    {
        name: 'Bambi Print Mini Backpack',
        tag: 'product1',
        price: 150,
        inCart: 0
    },
    {
        name: 'White Shirt',
        tag: 'product2',
        price: 150,
        inCart: 0
    },
    {
        name: 'Sports Shoe',
        tag: 'product3',
        price: 150,
        inCart: 0
    },
    {
        name: 'Designer Grey Vest',
        tag:'product4',
        price: 150,
        inCart: 0
    },
    {
        name: 'Blue Shirt',
        tag: 'product5',
        price: 150,
        inCart: 0
    },
    {
        name: 'Designer Sling Bag',
        tag: 'product6',
        price: 150,
        inCart: 0
    },
    {
        name: 'Blue Suit',
        tag: 'product7',
        price: 150,
        inCart: 0
    },
    {
        name: 'Leather Boots',
        tag: 'product8',
        price: 150,
        inCart: 0
    },
]

for(let i=0;i<carts.length; i++){
    carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent=1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);
    
    if(cartItems!=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
   
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost!=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
    localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(productContainer);


    if(cartItems && productContainer){
        productContainer.innerHTML='';
        console.log('hello');
        Object.values(cartItems).map(item=>{
            console.log(item);
            productContainer.innerHTML += `
            <tr><td class ="cart-product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="/images/${item.tag}.jpg">
                <span>${item.name}</span>
            </td>

            <td class ="cart-price">Price: INR ${item.price}.00</td>
            <td class="cart-quantity">Quantity: 
                <ion-icon class="decrease"
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
               <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
            </td>
            <td class="cart-total">Cart Total: 
                INR ${item.inCart * item.price}.00
            </td></tr>
            `;
        });

        productContainer.innerHTML += `
            <div class="cart-basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total: 
                </h4>
                <h4 class="cart-basketTotal"> &nbsp
                     INR ${cartCost}.00
                </h4>
            </div>
        `;
    }
}
onLoadCartNumbers();
displayCart();
