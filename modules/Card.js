import { showPopup, popupIllustrationImg, popupIllustrationLabel, popupIllustration } from './index.js'

export default class Card {
	constructor(cardData, templateSelector) {
		this._title = cardData.title;
		this._alt = cardData.title;
		this._imgSrc = cardData.link;

		this._TemplateElem = templateSelector;
	};

	_createTemplateElem() {
		const placeTemplateElem = document.querySelector(this._TemplateElem).content.cloneNode(true);
		return placeTemplateElem;
	};

	_setEventListeners() {
		this._cardElem.querySelector('.place__photo').addEventListener('click', () => {

			popupIllustrationLabel.textContent = this._title;
			popupIllustrationImg.alt = this._title;
			popupIllustrationImg.src = this._imgSrc;
			showPopup(popupIllustration);
		});

		this._cardElem.querySelector('.place__btn-like').addEventListener('click', (evt) =>
			evt.target.classList.toggle('place__btn-like_active'));

		this._cardElem.querySelector('.place__btn-trash').addEventListener('click', (evt) =>
			evt.target.closest('.place').remove());
	};

	createCardElem() {
		this._cardElem = this._createTemplateElem();
		const cardElemPhoto = this._cardElem.querySelector('.place__photo');

		this._cardElem.querySelector('.place__review').textContent = this._title;
		cardElemPhoto.alt = this._title;
		cardElemPhoto.src = this._imgSrc;

		this._setEventListeners();

		return this._cardElem;
	};
};