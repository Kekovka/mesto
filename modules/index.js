import { initialCards } from './defaultCards.js';
import Card from './Card.js'
import FormValidation from './FormValidation.js';

const profileName = document.querySelector('.profile__person-name');
const profilejob = document.querySelector('.profile__person-job');

const popupAddCard = document.querySelector('.popup_add');
const popupEditProfile = document.querySelector('.popup_edit');

const popupFormEditProfile = document.querySelector('.popup__form-edit');
const popupFormAddCard = document.querySelector('.popup__form-add');

const buttonEditProfileOpen = document.querySelector('.profile__person-edit');
const buttonAddCardOpen = document.querySelector('.profile__button-add');

const inputName = popupFormEditProfile.querySelector('.popup__input-name');
const inputJob = popupFormEditProfile.querySelector('.popup__input-job');

const placePhotoInput = document.querySelector('.popup__place-photo');
const placeReviewInput = document.querySelector('.popup__place-name');
const placesContainer = document.querySelector('.places__list');

const popupIllustrationImg = document.querySelector('.popup__figure-img');
const popupIllustrationLabel = document.querySelector('.popup__figure-label');
const popupIllustration = document.querySelector('.popup_illustation');

const validationData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};

const placeAddValidatedForm = new FormValidation(validationData, popupFormAddCard);
const profileEditValidatedForm = new FormValidation(validationData, popupFormEditProfile);


function closePopupOverlayHandler(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    };
};

function closePopupEscapeInputHandler(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

//Функция открывания Поп-апа
function showPopup(popup) {
    popup.classList.add('popup_opened');

    popup.addEventListener('click', closePopupOverlayHandler);
    document.addEventListener('keydown', closePopupEscapeInputHandler);
};

//Функция закрытия Поп-апа
function closePopup(popup) {
    popup.classList.remove('popup_opened');

    popup.removeEventListener('click', closePopupOverlayHandler);
    document.removeEventListener('keydown', closePopupEscapeInputHandler);
};

//Функция редактирования данных профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profilejob.textContent = inputJob.value;

    closePopup(popupEditProfile);
};

function createCard(data) {
    const newPlaceCard = new Card(data, '#place').createCardElem(); 
    return newPlaceCard;
};

function renderCard(data) {
    placesContainer.prepend(createCard(data));
};

initialCards.forEach((item) => {
    renderCard(item);
})

// Рендер карточек из формы
function handleSubmitPlaceAdd(evt) {
    evt.preventDefault();

    renderCard({
        title: placeReviewInput.value,
        link: placePhotoInput.value,
    }, '#place');

    closePopup(popupAddCard);

    placeAddValidatedForm.disableFormButton();
    popupFormAddCard.reset();
};

// Событие для открытия окна редактирования карточки
buttonAddCardOpen.addEventListener('click', () => showPopup(popupAddCard));

//Cобытие открытия окна редактирования профиля
buttonEditProfileOpen.addEventListener('click', () => {
    showPopup(popupEditProfile);
    inputName.value = profileName.textContent;
    inputJob.value = profilejob.textContent;
});

//События сабмита форм редактирования и добавление карточки
popupFormEditProfile.addEventListener('submit', handleSubmitEditProfile);
popupFormAddCard.addEventListener('submit', handleSubmitPlaceAdd);

placeAddValidatedForm.enableValidation();
profileEditValidatedForm.enableValidation();

export { popupIllustrationImg, popupIllustrationLabel, popupIllustration, showPopup }
