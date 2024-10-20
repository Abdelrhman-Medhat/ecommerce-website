import { cart, removeFromCart, updateCartQuantity } from "./script/cart.js";
import { NewProducts } from "./script/NewProducts.js";
import { handleProductPrice } from "./script/utils/money.js";

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
};

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
};

let cartSummaryHTML = '';
updateCartQuantity();

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    NewProducts.forEach((product) => {
        if(product.id === productId){
            matchingProduct = product;
        }
    });
    cartSummaryHTML +=`
                <div class="item js-item-${matchingProduct.id}">
                    <p class="quan-${matchingProduct.id} qu" style="display: none;">${cartItem.quantity}</p>
                    <p class="pri-${matchingProduct.id}" style="display: none;">${matchingProduct.price}</p>
                    <button class="js-remove-button" id="${matchingProduct.id}">X</button>
                    <div class="product-image">
                        <img src="${matchingProduct.img}" />
                    </div>
                    <div class="product-details">
                        <p>${matchingProduct.name}</p>
                        <label>Quantity:</label>
                        <input class="js-quantity-input" id="${matchingProduct.id}" type="number" value="${cartItem.quantity}" min="1" max="10"/>
                    </div>
                    <div class="product-price">
                        <h2>price:</h2>
                        <h2>$</h2>
                        <h2 class="p-p${matchingProduct.id} grand-total">${handleProductPrice(matchingProduct.price * cartItem.quantity)}</h2>
                    </div>
                </div>
                <div class="item-hr js-item-${matchingProduct.id}">
                    <hr/>
                </div>`;
});


document.querySelector(".cartitem").innerHTML = cartSummaryHTML;
handleCartTotal();
handleCartSubTotal();

document.querySelectorAll(".js-quantity-input").forEach((e) => {
    e.addEventListener("change", (x) => {
        let productId = x.target.id;
        let productValue = x.target.value;
        let productPrice = document.querySelector(`.pri-${productId}`).innerHTML;
        document.querySelector(`.quan-${productId}`).innerHTML = productValue;
        document.querySelector(`.p-p${productId}`).innerHTML = handleProductPrice(document.querySelector(`.quan-${productId}`).innerHTML * productPrice);
        handleCartTotal();
        handleCartSubTotal();
    })
})

document.querySelectorAll(".js-remove-button").forEach((remove) => {
    remove.addEventListener("click", () => {
        const productId = remove.id;
        removeFromCart(productId);
        updateCartQuantity();
        if(cart.length < 1){
            document.querySelector(".cartsubtotal").innerHTML = `
            <div class="empty-cart">
                Your Cart Is Empty
            </div>
            `;
        }
        const tr = document.querySelectorAll(`.js-item-${productId}`);
        tr.forEach((x) => {
            x.remove();
        })
        handleCartTotal();
        handleCartSubTotal();
    });
});

function handleCartTotal(){
    let on = 0;
    let productItems = 0;
    document.querySelectorAll(".grand-total").forEach((e) => {
     on += Number(e.innerHTML);
     productItems += 1;
    })
    document.querySelector(".cart-total").innerHTML = `
                 <h2>Cart</h2>
            <div class="cart-subtotal">
                <h4>Cart Subtotal</h4>
                <h4>$${on.toLocaleString(undefined,{minimumFractionDigits:2})}</h4>
            </div>
            <div class="cart-subtotal">
                <h4>Shipping</h4>
                <h4>Free</h4>              
            </div>
            <hr>
            <div class="cart-subtotal">
                <h4><strong>Total</strong></h4>
                <h4><strong>$${on.toLocaleString(undefined,{minimumFractionDigits:2})}</strong></h4>
            </div>
            <button class="normal">Proceed to checkout</button> 
                `;
};

function handleCartSubTotal(){
    let productPrice = 0;
    let itemsQuantity = 0;
    document.querySelectorAll(".grand-total").forEach((e) => {
        productPrice += Number(e.innerHTML);
       });
    document.querySelectorAll(".qu").forEach((w) => {
        itemsQuantity += Number(w.innerHTML);
    })
    if(itemsQuantity >= 1){
        document.querySelector(".cartsubtotal").innerHTML = `
        <p>Subtotal (${itemsQuantity} Items): $ ${productPrice.toLocaleString(undefined,{minimumFractionDigits:2})}</p>
       `;
    }

};
