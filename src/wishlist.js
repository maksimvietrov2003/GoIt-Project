import { addToCart, addToWithlist, clickByProduct,  innitWithlist } from "./js/handlers";
import refs from "./js/refs";



document.addEventListener('DOMContentLoaded', innitWithlist)
refs.productsList.addEventListener('click',clickByProduct)

refs.addToWishlistBtn.addEventListener('click',event =>{addToWithlist(event)

innitWithlist()

} );
refs.addToCartBtn.addEventListener('click',addToCart)

