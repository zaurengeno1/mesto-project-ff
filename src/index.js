import './pages/index.css';

import { initialCards, createCard, handleDeleteButton, handleLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const cardGrid = document.querySelector('.cards-grid');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const popups = document.querySelectorAll('.popup');
const popupCard = document.querySelector('#popup-card');
const formCard = popupCard.querySelector('#form-card');
const formInputCardTitle = formCard.querySelector('.form__input-card-title');
const formInputCardLink = formCard.querySelector('.form__input-card-link');

const popupEdit = document.querySelector('#popup-edit');
const formEdit = popupEdit.querySelector('#form-edit');
const formInputEditTitle = formEdit.querySelector('#edit-name-input');
const formInputEditSubtitle = formEdit.querySelector('#edit-work-input');

const popupImageOpen = document.querySelector('#popup_image');
const popupImageFull = popupImageOpen.querySelector('.popup__image-full');
const popupImageTitle = popupImageOpen.querySelector('.popup__image-title');


function handleNewCard () {
  openPopup(popupCard);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: formInputCardTitle.value,
    link: formInputCardLink.value,
  };

  addCard(cardGrid, newCard);
  closePopup(popupCard);
  evt.target.reset();
}

function handleEditButton(evt) {
  evt.preventDefault();
  formInputEditTitle.value = profileTitle.textContent;
  formInputEditSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEdit);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputEditTitle.value;
  profileSubtitle.textContent = formInputEditSubtitle.value;
  closePopup(popupEdit);
}

function handleImageCard (cardData) {
  popupImageFull.src = cardData.link;
  popupImageFull.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
  openPopup(popupImageOpen);
}

function addCard(cardItems, currentCard) {
  return cardItems.prepend(createCard(currentCard,handleImageCard, handleDeleteButton,handleLikeCard ));
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closePopup(popup)
        }
    })
})

formEdit.addEventListener('submit', handleProfileSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);
addCardButton.addEventListener('click', handleNewCard);
editProfileButton.addEventListener('click', handleEditButton);

initialCards.forEach((card) => addCard(cardGrid, card));

