import { initHomePage,clickByProduct, addToWithlist, addToCart} from "./js/handlers";
import refs from "./js/refs";

document.addEventListener('DOMContentLoaded', initHomePage);

refs.productsList.addEventListener('click', clickByProduct);
refs.addToWishlistBtn.addEventListener('click',addToWithlist);
refs.addToCartBtn.addEventListener('click',addToCart)
