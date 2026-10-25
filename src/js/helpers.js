import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import { ITEMS_PER_PAGE, STORAGE_KEYS } from "./constants";
import { hideLoadMoreButton, showLoadMoreButton } from "./render-function";
import { getFromStorage } from './storage';
import refs from './refs';


export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 5000,
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: `Invalid type of toast: ${type}`,
        position: 'topRight',
        timeout: 5000,
      });
      break;
  }
}

export function checkVisibilityLoadMoreButton(total, currentPage) {
  if (Math.ceil(total / ITEMS_PER_PAGE) <= currentPage) {
    hideLoadMoreButton();
    showToast('No more products to load', 'info');
  } else {
    showLoadMoreButton();
  }
}
export function checkCounter(){
const cartList = getFromStorage(STORAGE_KEYS.CART)
const withList = getFromStorage(STORAGE_KEYS.WISHLIST)
refs.cartCount.textContent = cartList.length
refs.wishlistCount.textContent = withList.length
}