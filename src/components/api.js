const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '5fda5020-1c17-4a05-b27b-64030e37329c',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

function getUserCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

//отправка информация о пользователе на сервер
function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

//запрос на добавление карточек
function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

function editAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => checkResponse(res));
}

export {
  getUserProfile,
  getUserCards,
  addCard,
  editProfile,
  editAvatar,
  deleteCard,
  addLike,
  deleteLike,
};
