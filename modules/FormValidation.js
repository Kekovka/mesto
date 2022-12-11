export default class FormValidation {
	constructor(validationData, formSelecter) {
		this._formSelector = document.querySelector(formSelecter);

		this._submitButtonSelector = validationData.submitButtonSelector;
		this._inputSelector = validationData.inputSelector;
		this._inactiveButtonClass = validationData.inactiveButtonClass;
		this._inputErrorClass = validationData.inputErrorClass;
		this._errorClass = validationData.errorClass;

		this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
	};

	_setEventListener() {
		this._inputList.forEach((inputElem) => {
			inputElem.addEventListener('input', (evt) => {
				this._toggleButtonState();
				this._checkInputValidity(inputElem);
			});
		});
	};

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this.disableFormButton();
		} else {
			this._enableFormButton();
		};
	};

	_checkInputValidity(inputElem) {
		if (!inputElem.validity.valid) {
			this._showInputError(inputElem);
		} else {
			this._hideInputError(inputElem);
		};
	};

	_showInputError(inputElem) {


		const errorElement = this._formSelector.querySelector(`.${inputElem.id}-error`);

		inputElem.classList.add(this._inputErrorClass);
		errorElement.classList.add(this._errorClass);
		errorElement.textContent = inputElem.validationMessage;
	};

	_hideInputError(inputElem) {
		const errorElement = this._formSelector.querySelector(`.${inputElem.id}-error`);

		inputElem.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	};

	_hasInvalidInput() {
		return this._inputList.some((inputElem) => {
			return !inputElem.validity.valid;
		});
	};

	_enableFormButton() {
		const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
		buttonElement.classList.remove(this._inactiveButtonClass);
		buttonElement.disabled = false;
	};

	disableFormButton() {
		const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
		buttonElement.classList.add(this._inactiveButtonClass);
		buttonElement.disabled = true;
	};

	enableValidation() {
		this._setEventListener();
	};

};
