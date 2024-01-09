import './pages/index.css';

import { openPopup, closePopup } from './components/modal.js';
import {
  createCard,
  handleLikesCard,
  handleDeleteCard,
} from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';

import {
  addCard,
  editProfile,
  editAvatar,
  getUserCards,
  getUserProfile,
} from './components/api';

let userId;
const cardGrid = document.querySelector('.cards-grid');

const profileAvatar = document.querySelector('.profile__avatar');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenPopupCard = document.querySelector('.profile__add-button');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');

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

const popupAvatarEdit = document.querySelector('#popup-edit-avatar');
const formInputAvatarLink = document.querySelector('.form__input-avatar-link');
const formEditAvatar = document.querySelector('.form-edit-avatar');
const buttonOpenAvatar = document.querySelector('.profile__avatar-button');

const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_invalid',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: '.form__input-save_disabled',
};

function handleProfileSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';

  editProfile(formInputEditTitle.value, formInputEditSubtitle.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;

      clearValidation(popupEdit, configValidation);
      closePopup(popupEdit);
    })

    .catch((e) => console.log(e))
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';

  const cardData = {
    name: formInputCardTitle.value,
    link: formInputCardLink.value,
    owner: {
      _id: userId,
    },
  };

  addCard(cardData.name, cardData.link)
    .then((res) => {
      const newCardElement = createCard(
        res,
        userId,
        handleDeleteCard,
        handleOpenImage,
        handleLikesCard
      );
      cardGrid.prepend(newCardElement);
      //formCard.reset();
      closePopup(popupCard);
    })
    .catch((e) => console.log(e))

    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';

  editAvatar(formInputAvatarLink.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(popupAvatarEdit);
      clearValidation(popupAvatarEdit, configValidation);
    })
    .catch((e) => console.log(e))

    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
}

Promise.all([getUserCards(), getUserProfile()])
  .then(([cards, userData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    cards.forEach((cardData) => {
      const newCard = createCard(
        cardData,
        userId,
        handleDeleteCard,
        handleOpenImage,
        handleLikesCard
      );
      cardGrid.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function handleOpenProfile() {
  openPopup(popupEdit);
  formInputEditTitle.value = profileTitle.textContent;
  formInputEditSubtitle.value = profileSubtitle.textContent;
  clearValidation(popupEdit, configValidation);
}

function handleOpenAvatar() {
  formInputAvatarLink.value = profileAvatar.src;
  openPopup(popupAvatarEdit);
  clearValidation(popupAvatarEdit, configValidation);
  formEditAvatar.reset();
}

function handleOpenImage(cardData) {
  popupImageFull.src = cardData.link;
  popupImageFull.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
  openPopup(popupImageOpen);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

buttonOpenEditProfile.addEventListener('click', handleOpenProfile);
buttonOpenAvatar.addEventListener('click', handleOpenAvatar);

buttonOpenPopupCard.addEventListener('click', () => {
  formCard.reset();
  clearValidation(popupCard, configValidation);
  openPopup(popupCard);
});

formEdit.addEventListener('submit', handleProfileSubmit);
formCard.addEventListener('submit', handleNewCardSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);

enableValidation(configValidation);
