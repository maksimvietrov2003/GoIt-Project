// import getCartItems
import {clearProductsList, hideLoadMoreButton, renderModal, renderProducts, showNotFound} from './render-function'
import {getCategories, getProductByID, getProducts, getProductsByCategory, getProductsByID} from './products-api'
import { renderCategories } from './render-function';
import { checkCounter, checkVisibilityLoadMoreButton, showToast } from './helpers';
import { openModal } from './modal';
import { deleteItemFromStorage, getFromStorage, getFromStorageByID, saveToStorage } from './storage';
import { STORAGE_KEYS } from './constants';
import refs from './refs';
import { split } from 'postcss/lib/list';

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
 if( getFromStorageByID(STORAGE_KEYS.CART,id)){
      refs.addToCartBtn.textContent= 'Remove from Cart'
 }else{
       refs.addToCartBtn.textContent = 'Add to Cart'

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
    
  export async function innitCartPage() {
    clearProductsList()

    const cartList = getFromStorage(STORAGE_KEYS.CART)
    checkCounter()
    try{

      const products = await getProductsByID(cartList)

      if (products.length === 0) {
              // showToast('No products found', 'info');
              showNotFound();
              return;
          }
          renderProducts(products)

          refs.cartItemsCount.textContent = cartList.length
          const totalPrice = products.reduce((acc,product)=>acc+= product.price,0)
        
           refs.cartTotalPrice.textContent =  `$ ${totalPrice.toFixed(2)}`
          if(totalPrice <= 50){
            refs.cartShiping.textContent = '$ 10'
 
          }else{
            refs.cartShiping.textContent = 'Free'

          }

    }catch(error){
  console.log(error)

  showToast('Sumthing went wrong... Try aggen', "error")

  }
  }
  export async function clickBtnBuy() {

    // const amout =  + (!Number(refs.cartShiping.textContent.split(' ')[1]))? Number(refs.cartTotalPrice.textContent.split(' ')[1]) + Number(refs.cartShiping.textContent.split(' ')[1]):Number(refs.cartTotalPrice.textContent.split(' ')[1])

    showToast(`Your sumarry order ${amout}`,'info')
  }

export async function  filtersCategorie(event) {
  
  const category = event.target.closest('.categories__btn')
if(!category ) return 
clearProductsList() 
event.currentTarget.querySelectorAll('.categories__btn').forEach(btn=>{

btn.classList.remove('categories__btn--active')
}

)
event.target.classList.add('categories__btn--active')

try{




 const {products} =  await getProductsByCategory(category.textContent)
    
    renderProducts(products)

  }catch(error){
  console.log(error)

  showToast('Sumthing went wrong... Try aggen', "error")

  }


}
