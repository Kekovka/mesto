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

	_fillIllustrationPopup() {
		popupIllustrationLabel.textContent = this._title;
		popupIllustrationImg.alt = this._title;
		popupIllustrationImg.src = this._imgSrc;
		showPopup(popupIllustration);
	};

	_likeCard() { 
		this._buttonLike.classList.toggle('place__btn-like_active'); 
	};

	_deleteCard(evt) {
		evt.target.closest('.place').remove();
		this._cardElem = null;
	};

	_setEventListeners() {
		this._cardImage.addEventListener('click', (evt) => {
			this._fillIllustrationPopup();
		});
		this._buttonLike.addEventListener('click', (evt) => { 
			this._likeCard();
	    });
	   this._buttonDelete.addEventListener('click', (evt) => {
			this._deleteCard(evt);
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
