let profileName = document.querySelector('.profile__person-name');
let profilejob = document.querySelector('.profile__person-job');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let inputName = popupForm.querySelector('.popup__person-name');
let inputDescription = popupForm.querySelector('.popup__person-job');

let editButton = document.querySelector('.profile__person-edit');
let closeButton = document.querySelector('.form__close')

inputName.setAttribute('value', profileName.textContent);
inputDescription.setAttribute('value', profilejob.textContent);


let submitButton = document.querySelector('.popup__submit');


function popupShow() {
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupShow);
closeButton.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profilejob.textContent = inputDescription.value;

    popupClose();
}

popupForm.addEventListener('submit', formSubmitHandler);
