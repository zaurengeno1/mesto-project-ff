
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];


export function createCard(cardData, handleImageCard, handleDeleteButton, handleLikeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementName = cardElement.querySelector('.card__title');
  const cardElementDelete = cardElement.querySelector('.card__button-delete');
  const cardElementLike = cardElement.querySelector('.card__button-like');
  
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementName.textContent = cardData.name;

  cardElementImage.addEventListener('click', () => handleImageCard(cardData));
  cardElementDelete.addEventListener('click', handleDeleteButton);
  cardElementLike.addEventListener('click', handleLikeCard);
  

  return cardElement;
}

export function handleDeleteButton(evt) {
  evt.target.closest('.card').remove();
}

export function handleLikeCard(evt) {
  evt.target.classList.toggle('card__button-like_active');
}

