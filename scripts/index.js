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
function showPopup(popup) {
    popup.classList.add('popup_opened');

};

//Функция закрытия Поп-апа
function closePopup(popup) {
    popup.classList.remove('popup_opened');

};

//Функция редактирования данных профиля
function profileEditSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profilejob.textContent = inputDescription.value;

    closePopup(popupEditProfile);

};

//Функция добавления карточки
function createCard(cardName, cardLink) {

    const placeElem = placeTemplate.cloneNode(true);
    const placeElemReview = placeElem.querySelector('.place__review');
    const placeElemPhoto = placeElem.querySelector('.place__photo');
    const placeButtonLike = placeElem.querySelector('.place__btn-like');
    const placeButtonDelete = placeElem.querySelector('.place__btn-trash');

    placeElemReview.textContent = cardName;
    placeElemPhoto.alt = cardName;
    placeElemPhoto.src = cardLink;

    placeButtonLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__btn-like_active');

    });


    placeButtonDelete.addEventListener('click', function () {
        placeButtonDelete.closest('.place').remove();

    });

    //Открытие модального окна просмотра фотографии
    placeElemPhoto.addEventListener('click', function () {
        showPopup(popupIllustration);

        buttonPopupIllustrationClose.addEventListener('click', () => closePopup(popupIllustration));

        popupIllustration.querySelector('.popup__figure-label').textContent = cardName;
        popupIllustration.querySelector('.popup__figure-img').src = cardLink;
        popupIllustration.querySelector('.popup__figure-img').alt = cardName;

    });

    return placeElem;
};

//Рендер карточек из формы
function placeAddSubmit(evt) {
    evt.preventDefault();

    placesContainer.prepend(createCard(placeReviewInput.value, placePhotoInput.value));

    closePopup(popupAddCard);
    document.querySelector('.popup__form-add').reset();

};

//Рендер карточек из коробки | массив с карточками находится в файле cards.js
initialCards.forEach(function (item) {
    placesContainer.prepend(createCard(item.name, item.link));

});

//Cобытие открытия окна редактирования профиля
buttonEditProfileOpen.addEventListener('click', () => {
    showPopup(popupEditProfile);
    inputName.value = profileName.textContent;
    inputDescription.value = profilejob.textContent;

});

//Событие для открытия окна редактирования карточки
buttonAddCardOpen.addEventListener('click', () => showPopup(popupAddCard));

//События для закрытия поп-апов
buttonEditProfileClose.addEventListener('click', () => closePopup(popupEditProfile));
buttonAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

//События сабмита форм редактирования и добавление карточки
popupFormEditProfile.addEventListener('submit', profileEditSubmit);
popupFormAddCard.addEventListener('submit', placeAddSubmit);
