const profileName = document.querySelector('.profile__person-name');
const profilejob = document.querySelector('.profile__person-job');

const popupAddCard = document.querySelector('.popup_add');
const popupEditProfile = document.querySelector('.popup_edit');
const popupIllustration = document.querySelector('.popup_illustation');

const popupFormEditProfile = document.querySelector('.popup__form-edit');
const popupFormAddCard = document.querySelector('.popup__form-add');

const buttonEditProfileOpen = document.querySelector('.profile__person-edit');
const buttonPopupEditProfileClose = document.querySelector('.popup__edit-close')
const buttonAddCardOpen = document.querySelector('.profile__button-add');
const buttonPopupAddCardClose = document.querySelector('.popup__add-close');
const buttonPopupIllustrationClose = document.querySelector('.popup__illustration-close');

const inputName = popupFormEditProfile.querySelector('.popup__input-name');
const inputJob = popupFormEditProfile.querySelector('.popup__input-job');

const placePhotoInput = document.querySelector('.popup__place-photo');
const placeReviewInput = document.querySelector('.popup__place-name');
const placesContainer = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;


//Функция открывания Поп-апа
function showPopup(popup) {
    popup.classList.add('popup_opened');
};

//Функция закрытия Поп-апа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

//Функция редактирования данных профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profilejob.textContent = inputJob.value;

    closePopup(popupEditProfile);
};

//Функция создания карточки
function createCard (cardData) {
    const placeElem = placeTemplate.cloneNode(true);
    const placeElemReview = placeElem.querySelector('.place__review');
    const placeElemPhoto = placeElem.querySelector('.place__photo');
    const placeButtonLike = placeElem.querySelector('.place__btn-like');
    const placeButtonDelete = placeElem.querySelector('.place__btn-trash');
    
    cardData = {
        title: cardData.name || placeReviewInput.value,
        src: cardData.link || placePhotoInput.value,
    };

    placeElemReview.textContent = cardData.title;
    placeElemPhoto.alt = cardData.title;
    placeElemPhoto.src = cardData.src;

    placeButtonLike.addEventListener('click', (evt) => evt.target.classList.toggle('place__btn-like_active'));
    placeButtonDelete.addEventListener('click', () => placeButtonDelete.closest('.place').remove());
    placeElemPhoto.addEventListener('click', () => showIllustrationPopup(cardData));

    return placeElem;
};

//Функция рендера карточки
function renderCard(cardData) {
    placesContainer.prepend(createCard(cardData));
};

//Функция окрытия модального окна просмотра фотографии
function showIllustrationPopup (cardData) {
    showPopup(popupIllustration);

    popupIllustration.querySelector('.popup__figure-label').textContent = cardData.title;
    popupIllustration.querySelector('.popup__figure-img').alt = cardData.title;
    popupIllustration.querySelector('.popup__figure-img').src = cardData.src;
};

//Рендер карточек из коробки | массив с карточками находится в файле cards.js
initialCards.forEach((item) => renderCard(item));

//Рендер карточек из формы
function handleSubmitPlaceAdd(evt) {
    evt.preventDefault();

    renderCard(evt);
    closePopup(popupAddCard);
    
    document.querySelector('.popup__form-add').reset();
};


//Событие для открытия окна редактирования карточки
buttonAddCardOpen.addEventListener('click', () => showPopup(popupAddCard));

//Cобытие открытия окна редактирования профиля 
buttonEditProfileOpen.addEventListener('click', () => { 
    showPopup(popupEditProfile); 
    inputName.value = profileName.textContent; 
    inputJob.value = profilejob.textContent; 
}); 

//События для закрытия поп-апов
buttonPopupEditProfileClose.addEventListener('click', () => closePopup(popupEditProfile));
buttonPopupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));
buttonPopupIllustrationClose.addEventListener('click', () => closePopup(popupIllustration));

//События сабмита форм редактирования и добавление карточки
popupFormEditProfile.addEventListener('submit', handleSubmitEditProfile);
popupFormAddCard.addEventListener('submit', handleSubmitPlaceAdd);
