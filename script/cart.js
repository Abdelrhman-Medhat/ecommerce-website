export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = []; 
}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    if(matchingItem){
        matchingItem.quantity+=1;
    }else{
        cart.push({
            productId: productId,
            quantity:1
        });
    }
    saveToStorage();
}

export function updateQuantityInStorage(productId,productValue){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    if(matchingItem){
        matchingItem.quantity = Number(productValue);
    }
    saveToStorage();
    updateCartQuantity();
}

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity+= cartItem.quantity;
    });
    if(document.querySelector(".js-cart-quantity")){
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        document.querySelector(".caq").innerHTML = cartQuantity;
    }
    else if(document.getElementById("cart-quantity")){
        document.getElementById("cart-quantity").innerHTML = cartQuantity;
        document.querySelector(".caq").innerHTML = cartQuantity;
    }
}