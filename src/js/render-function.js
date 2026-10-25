import refs from './refs'
const {categoriesList, productsList,notFound,loadMoreBtn} = refs

export function renderCategories(categories) {
  const categoriesWithAll = ['All', ...categories];



  const markup = categoriesWithAll
    .map(category => {
      return `
      <li class="categories__item">
        <button class="categories__btn" type="button" data-category="${category}">${category}</button>
      </li>
    `;
    })
    .join('');

  categoriesList.innerHTML = markup;

  const firstCategoryBtn =
    categoriesList.querySelector('.categories__btn');
  if (firstCategoryBtn) {
    firstCategoryBtn.classList.add('categories__btn--active');
  }
}

export function renderProducts(products) {
  const markup = products
    .map(({ id, thumbnail, title, brand, category, price }) => {
      return `
      <li class="products__item" data-id="${id}">
        <img class="products__image" src="${thumbnail}" alt="${title}"/>
        <p class="products__title">${title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: $${price}</p>
      </li>
    `;
    })
    .join('');

  productsList.insertAdjacentHTML('beforeend', markup);
}

export function clearProductsList() {
  productsList.innerHTML = '';
}

export function showNotFound() {
  notFound.classList.add('not-found--visible');
}
export function hideNotFound() {
  notFound.classList.remove('not-found--visible');
}
export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-loading');
  loadMoreBtn.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function renderModal({thumbnail,title,tags,description,shippingInformation,returnPolicy,price}){

const  markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">${shippingInformation}</p>
        <p class="modal-product__return-policy">${returnPolicy}</p>
        <p class="modal-product__price">${price}</p>
      </div>` 

      refs.modalProduct.innerHTML = markup
}
