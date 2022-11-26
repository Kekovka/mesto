const showInputError = (formElement, inputElement, errorMessage, validationData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationData.inputErrorClass);
  errorElement.classList.add(validationData.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationData.inputErrorClass);
  errorElement.classList.remove(validationData.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement, validationData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
  } else {
    hideInputError(formElement, inputElement, validationData);
  };
};

const enableFormButton = (buttonElement, validationData) => {
  buttonElement.classList.add(validationData.interectiveElemClass);
  buttonElement.classList.remove(validationData.inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableFormButton = (buttonElement, validationData) => {
  buttonElement.classList.remove(validationData.interectiveElemClass);
  buttonElement.classList.add(validationData.inactiveButtonClass);
  buttonElement.disabled = true;
};

const toggleButtonState = (inputList, buttonElement, validationData) => {
  if (hasInvalidInput(inputList)) {
    disableFormButton(buttonElement, validationData);
  } else {
    enableFormButton(buttonElement, validationData);
  };
};

const setEventListeners = (formElement, validationData) => {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
  const submitButton = formElement.querySelector(validationData.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, validationData);
      toggleButtonState(inputList, submitButton, validationData);
    });
  });
};

const enableValidation = (validationData) => {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationData);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  interectiveElemClass: 'interective'
});