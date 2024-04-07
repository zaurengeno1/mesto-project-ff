import { deleteCard, addLike, deleteLike } from '../components/api.js';

function createCard(
  cardData,
  userId,
  handleDeleteCard,
  handleOpenImage,
  handleLikesCard
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementName = cardElement.querySelector('.card__title');
  const cardElementDelete = cardElement.querySelector('.card__button-delete');
  const cardElementLike = cardElement.querySelector('.card__button-like');
  const cardElementLikeCounter = cardElement.querySelector(
    '.card__button-like-count'
  );

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementName.textContent = cardData.name;
  cardElementLikeCounter.textContent = cardData.likes.length;
  cardElement.id = cardData._id;
  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardElementLike.classList.add('card__button-like_active');
  }

  if (cardData.owner._id === userId) {
    cardElementDelete.addEventListener('click', () => {
      handleDeleteCard(cardData._id);
    });
  } else {
    cardElementDelete.remove();
  }

  cardElementLike.addEventListener('click', (evt) =>
    handleLikesCard(evt, cardData._id)
  );

  cardElementImage.addEventListener('click', () => handleOpenImage(cardData));

  return cardElement;
}

//МОЖНО ЛУЧШЕ. потом...
function handleLikesCard(evt, cardData) {
  const likeNumber = evt.target.parentNode.querySelector(
    '.card__button-like-count'
  );
  if (evt.target.classList.contains('card__button-like_active')) {
    deleteLike(cardData)
      .then((res) => {
        evt.target.classList.remove('card__button-like_active');
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardData)
      .then((res) => {
        evt.target.classList.add('card__button-like_active');
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDeleteCard(cardElement) {
  deleteCard()
    .then(() => {
      //evt.target.closest('.card').remove();
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, handleDeleteCard, handleLikesCard };
