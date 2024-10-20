import { cart, addToCart, updateCartQuantity } from "./script/cart.js";
import { NewProducts } from "./script/NewProducts.js";
import { handleProductPrice } from "./script/utils/money.js";

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const quantity = document.querySelector(".caq");
updateCartQuantity();

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');

    })
}



let productsHTML = '';
NewProducts.forEach((product) => {
    productsHTML += `
        <div class="pro">
            <img src="${product.img}" alt="">
            <div class="des">
                <span>A.M</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <img src="./img/ratings/rating-${product.rating.starts * 10}.png">
                    <h4>
                    ${product.rating.count}
                    </h4>
                </div>
                <h4>$${handleProductPrice(product.price)}</h4>
            </div>
            <button class="cart js-add-to-cart" data-product-id="${product.id}"><i class="fal fa-shopping-cart"></i></button>
        </div>
    `
})

document.querySelector(".js-products").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
    });
});