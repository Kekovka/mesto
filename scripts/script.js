const profileName = document.querySelector('.profile__person-name');
const profilejob = document.querySelector('.profile__person-job');

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');


const editButton = document.querySelector('.profile__person-edit');
const addButton = document.querySelector('.profile__button-add');

const inputName = popupForm.querySelector('.popup__input-name');
const inputDescription = popupForm.querySelector('.popup__input-job');

inputName.setAttribute('value', profileName.textContent);
inputDescription.setAttribute('value', profilejob.textContent);

function showPopupEdit() {
    popupEdit.classList.add('popup_opened');
}

function showPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

function closePopup() {
    let popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
}

//Добавляем слушатель для методом открытия поп-апов редактирования профиля и добавление карточки места

editButton.addEventListener('click', showPopupEdit);
addButton.addEventListener('click', showPopupAdd);

//Добавляем функцию закрытия кнопке поп-апа

const editClose = popup.querySelector('.popup__close').addEventListener('click', closePopup);
const addClose = popupAdd.querySelector('.popup__close').addEventListener('click', closePopup);

//Меняем данные профиля

function editSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profilejob.textContent = inputDescription.value;

    closePopup();
}

popupForm.addEventListener('submit', editSubmit);


// Добавляем новую карточку места

const placesList = document.querySelector('.places__list');
const placePhotoInput = document.querySelector('.popup__place-photo');
const placeReviewInput = document.querySelector('.popup__place-name');
const popupFormAdd = document.querySelector('.popup__form-add');

const places = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(function (item) {

    const placeElem = placeTemplate.cloneNode(true);

    const placeReview = placeElem.querySelector('.place__review');
    placeReview.textContent = item.name;
    const placePhoto = placeElem.querySelector('.place__photo');
    placePhoto.src = item.link;

    const likeActive = placeElem.querySelector('.place__btn-like');
    likeActive.addEventListener('click', function (evt) {

        evt.target.classList.toggle('place__btn-like_active');

    });

    const trashBtn = placeElem.querySelector('.place__btn-trash');

    trashBtn.addEventListener('click', function () {
        trashBtn.closest('.place').remove();
    });

    placePhoto.addEventListener('click', function () {

        const imgTemplate = document.querySelector('#imgTemplate').content;
        const imgElem = imgTemplate.cloneNode(true);

        const imgElemPopup = imgElem.querySelector('.popup');

        function showElem() {
            imgElemPopup.classList.add('popup_opened');
        }

        setTimeout(showElem, 50);

        imgElem.querySelector('.popup__figure-img').src = placePhoto.src;
        imgElem.querySelector('.popup__figure-label').textContent = placeReview.textContent;

        const closePopup = imgElem.querySelector('.popup__close');

        function removeNode() {
            imgElemPopup.remove();
        };

        closePopup.addEventListener('click', function () {
            imgElemPopup.classList.remove('popup_opened');
            setTimeout(removeNode, 900);
        });

        const body = document.querySelector('.body');
        body.append(imgElem);

    });


    places.prepend(placeElem);
});

function placeAddSubmit(evt) {
    evt.preventDefault();

    const placeElem = placeTemplate.cloneNode(true);

    const placePhoto = placeElem.querySelector('.place__photo');
    placePhoto.src = placePhotoInput.value;
    const placeLabel = placeElem.querySelector('.place__review');
    placeLabel.textContent = placeReviewInput.value;

    const likeActive = placeElem.querySelector('.place__btn-like');
    likeActive.addEventListener('click', function (evt) {

        evt.target.classList.toggle('place__btn-like_active');

    });

    const trashBtn = placeElem.querySelector('.place__btn-trash');

    trashBtn.addEventListener('click', function () {
        trashBtn.closest('.place').remove();
    });

    placePhoto.addEventListener('click', function () {

        const imgTemplate = document.querySelector('#imgTemplate').content;
        const imgElem = imgTemplate.cloneNode(true);

        const imgElemPopup = imgElem.querySelector('.popup');

        imgElem.querySelector('.popup__figure-img').src = placePhoto.src;
        imgElem.querySelector('.popup__figure-label').textContent = placeLabel.textContent;


        function showElem() {
            imgElemPopup.classList.add('popup_opened');
        }

        setTimeout(showElem, 50);

        const closePopup = imgElem.querySelector('.popup__close');

        function removeNode() {
            imgElemPopup.remove();
        };

        closePopup.addEventListener('click', function () {
            imgElemPopup.classList.remove('popup_opened');
            setTimeout(removeNode, 900);
        });

        const body = document.querySelector('.body');
        body.append(imgElem);

    });

    places.prepend(placeElem);

    closePopup();
    placeReviewInput.value = '';
    placePhotoInput.value = '';
};

popupFormAdd.addEventListener('submit', placeAddSubmit);