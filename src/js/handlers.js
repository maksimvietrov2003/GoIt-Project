// import getCartItems
import {clearProductsList, hideLoadMoreButton, renderModal, renderProducts, showNotFound} from './render-function'
import {getCategories, getProductByID, getProducts, getProductsByID} from './products-api'
import { renderCategories } from './render-function';
import { checkCounter, checkVisibilityLoadMoreButton, showToast } from './helpers';
import { openModal } from './modal';
import { deleteItemFromStorage, getFromStorage, getFromStorageByID, saveToStorage } from './storage';
import { STORAGE_KEYS } from './constants';
import refs from './refs';

let currentPage = 1;
let currentProductId = null;
let query = "";
export let id = null

export async function initHomePage() {
  checkCounter()
    // const savedTheme = getTheme();
    // toggleTheme(savedTheme);

  hideLoadMoreButton();
    try {
        const categories = await getCategories();
        renderCategories(categories);
      const { products, total } = await getProducts(currentPage);

        renderProducts(products);
        if (products.length === 0) {
            // showToast('No products found', 'info');
            showNotFound();
            return;
        }
checkVisibilityLoadMoreButton(total, currentPage);

    }catch (error) {
    console.error('Error initializing home page:', error);
    showToast('Failed to initialize page', 'error');
  }
}
export async function clickByProduct(event){
  const productItem = event.target.closest('.products__item')
  
  if(!productItem)return 
   id = productItem.dataset.id
 if( getFromStorageByID(STORAGE_KEYS.WISHLIST,id)){
      refs.addToWishlistBtn.textContent= 'Remove from Wishlist'
 }else{
       refs.addToWishlistBtn.textContent = 'Add to Wishlist'

 }

  const infoProduct =  await getProductByID(id);

  renderModal(infoProduct)
  openModal()

  }

  export async function  addToWithlist() {


    if(refs.addToWishlistBtn.textContent === 'Add to Wishlist'){
    saveToStorage(STORAGE_KEYS.WISHLIST,id)
    refs.addToWishlistBtn.textContent= 'Remove from Wishlist'

    }else{
      deleteItemFromStorage(STORAGE_KEYS.WISHLIST,id)
      refs.addToWishlistBtn.textContent = 'Add to Wishlist'

    }
    checkCounter()

  }
  export async function addToCart() {
    
    if(refs.addToCartBtn.textContent === 'Add to Cart'){
    saveToStorage(STORAGE_KEYS.CART,id)
    refs.addToCartBtn.textContent= 'Remove from Cart'

    }else{
      deleteItemFromStorage(STORAGE_KEYS.CART,id)
      refs.addToCartBtn.textContent = 'Add to Cart'
    }
    checkCounter()



  }  

  export async function innitWithlist() {
    clearProductsList()
    const withcList = getFromStorage(STORAGE_KEYS.WISHLIST)
    checkCounter()
    try{
    const products = await getProductsByID(withcList)
    
  if (products.length === 0) {
              // showToast('No products found', 'info');
              showNotFound();
              return;
          }

    renderProducts(products);

  
  }catch(error){
  console.log(error)

  showToast('Sumthing went wrong... Try aggen', "error")

  }

  }
    
