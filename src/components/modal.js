function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', keyHandlerEsc);
  //document.addEventListener('click', keyHandlerOverlay);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.addEventListener('keydown', keyHandlerEsc);
  //document.removeEventListener('click', keyHandlerOverlay);
}

function keyHandlerEsc(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_open');
    closePopup(popupElement);
  }
}

// function keyHandlerOverlay(evt) {
//   if (evt.target.classList.contains('popup_open')) {
//     closePopup(evt.target);
//   }
// }

export { openPopup, closePopup };
