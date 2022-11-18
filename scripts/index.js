const profileName = document.querySelector('.profile__person-name');
const profilejob = document.querySelector('.profile__person-job');

const popupAddCard = document.querySelector('.popup_add');
const popupEditProfile = document.querySelector('.popup_edit');
const popupIllustration = document.querySelector('.popup_illustation');

const popupFormEditProfile = document.querySelector('.popup__form-edit');
const popupFormAddCard = document.querySelector('.popup__form-add');

const buttonEditProfileOpen = document.querySelector('.profile__person-edit');
const buttonEditProfileClose = document.querySelector('.popup__edit-close')
const buttonAddCardOpen = document.querySelector('.profile__button-add');
const buttonAddCardClose = document.querySelector('.popup__add-close');
const buttonPopupIllustrationClose = document.querySelector('.popup__illustration-close');

const inputName = popupFormEditProfile.querySelector('.popup__input-name');
const inputDescription = popupFormEditProfile.querySelector('.popup__input-job');

const placePhotoInput = document.querySelector('.popup__place-photo');
const placeReviewInput = document.querySelector('.popup__place-name');
const placesContainer = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;


//Функция открывания Поп-апа
function handleShowPopup(popup) {
    popup.classList.add('popup_opened');
};

//Функция закрытия Поп-апа
function handleClosePopup(popup) {
    popup.classList.remove('popup_opened');
};

//Функция редактирования данных профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profilejob.textContent = inputDescription.value;

    handleClosePopup(popupEditProfile);
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
    handleShowPopup(popupIllustration);

    buttonPopupIllustrationClose.addEventListener('click', () => {
        popupIllustration.classList.remove('popup_opened');       
            });

    popupIllustration.querySelector('.popup__figure-label').textContent = cardData.title;
    popupIllustration.querySelector('.popup__figure-img').alt = cardData.title;
    popupIllustration.querySelector('.popup__figure-img').src = cardData.src;
};

//Рендер карточек из коробки | массив с карточками находится в файле cards.js
initialCards.forEach((item) => renderCard(item));

//Рендер карточек из формы
function handlePlaceAddSubmit(evt) {
    evt.preventDefault();

    renderCard(evt);
    handleClosePopup(popupAddCard);
    
    document.querySelector('.popup__form-add').reset();
};


//Событие для открытия окна редактирования карточки
buttonAddCardOpen.addEventListener('click', () => handleShowPopup(popupAddCard));

//Cобытие открытия окна редактирования профиля 
buttonEditProfileOpen.addEventListener('click', () => { 
    handleShowPopup(popupEditProfile); 
    inputName.value = profileName.textContent; 
    inputDescription.value = profilejob.textContent; 
}); 

//События для закрытия поп-апов
buttonEditProfileClose.addEventListener('click', () => handleClosePopup(popupEditProfile));
buttonAddCardClose.addEventListener('click', () => handleClosePopup(popupAddCard));

//События сабмита форм редактирования и добавление карточки
popupFormEditProfile.addEventListener('submit', handleEditProfileSubmit);
popupFormAddCard.addEventListener('submit', handlePlaceAddSubmit);
