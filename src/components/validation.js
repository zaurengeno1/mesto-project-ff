function showError(formElement, inputElement, errorMessage, config) {
  const errorField = formElement.querySelector('#error-' + inputElement.id);
  errorField.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideError(formElement, inputElement, config) {
  const errorField = formElement.querySelector('#error-' + inputElement.id);
  errorField.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

function checkValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideError(formElement, inputElement, config);
  }
}

function disableButton(buttonSubmitForm) {
  //buttonSubmitForm.classList.add(config.incactiveButtonClass)
  buttonSubmitForm.disabled = true;
}

function enableButton(buttonSubmitForm) {
  //buttonSubmitForm.classList.remove(config.incactiveButtonClass)
  buttonSubmitForm.disabled = false;
}

function toggleButton(inputList, buttonSubmitForm, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonSubmitForm, config);
  } else {
    enableButton(buttonSubmitForm, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function setEventListener(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonSubmitForm = formElement.querySelector(
    config.submitButtonSelector
  );
  toggleButton(inputList, buttonSubmitForm, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(formElement, inputElement, config);
      toggleButton(inputList, buttonSubmitForm, config);
    });
  });
}

function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(formElement, config);
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonSubmitForm = formElement.querySelector(
    config.submitButtonSelector
  );

  //toggleButton(inputList, buttonSubmitForm, config);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, config);
  });
  disableButton(buttonSubmitForm);
}

export { enableValidation, clearValidation };
