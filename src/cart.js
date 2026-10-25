import { addToCart, addToWithlist, clickBtnBuy, clickByProduct, innitCartPage } from "./js/handlers";
import refs from "./js/refs";


document.addEventListener('DOMContentLoaded', innitCartPage)
refs.productsList.addEventListener('click',clickByProduct)
refs.addToWishlistBtn.addEventListener('click',addToWithlist);
refs.buyProductsBtn.addEventListener('click', clickBtnBuy )

refs.addToCartBtn.addEventListener('click',event => {

addToCart(event);
innitCartPage();



})

