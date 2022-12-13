import { showPopup, popupIllustrationImg, popupIllustrationLabel, popupIllustration } from './index.js'

export default class Card {
	constructor(cardData, templateSelector) {
		this._title = cardData.title;
		this._alt = cardData.title;
		this._imgSrc = cardData.link;

		this._templateElem = templateSelector;
	};

	_createTemplateElem() {
		const placeElem = document.querySelector(this._templateElem).content.querySelector('.place').cloneNode(true);
		return placeElem;
	};

	_fillIllustrationPopup() {
		popupIllustrationLabel.textContent = this._title;
		popupIllustrationImg.alt = this._title;
		popupIllustrationImg.src = this._imgSrc;
		showPopup(popupIllustration);
	};

	_likeCard() { 
		this._buttonLike.classList.toggle('place__btn-like_active'); 
	};

	_deleteCard() {
		this._cardElem.remove();
		this._cardElem = null;
	};

	_setEventListeners() {
		this._cardImage.addEventListener('click', () => {
			this._fillIllustrationPopup();
		});
		this._buttonLike.addEventListener('click', () => { 
			this._likeCard();
	    });
	   this._buttonDelete.addEventListener('click', () => {
			this._deleteCard();
	    });
	};

	createCardElem() {
		this._cardElem = this._createTemplateElem();
		this._cardImage = this._cardElem.querySelector('.place__photo');
		this._buttonLike = this._cardElem.querySelector('.place__btn-like');
		this._buttonDelete = this._cardElem.querySelector('.place__btn-trash');

		this._cardElem.querySelector('.place__review').textContent = this._title;
		this._cardImage.alt = this._title;
		this._cardImage.src = this._imgSrc;

		this._setEventListeners();

		return this._cardElem;
	};
};
