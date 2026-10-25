import  refs  from './refs.js';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscKeyPress);
  refs.modalCloseBtn.addEventListener('click',() => closeModal())
  refs.modal.addEventListener('click', onBackdropClick);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalCloseBtn.removeEventListener('click',() => closeModal())
  refs.modal.removeEventListener('click', onBackdropClick);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}