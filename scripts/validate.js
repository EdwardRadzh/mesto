const hideInputError = (formElement, inputElement) => {
    // прячем ошибку
    // найти элемент текста ошибки
    const {inputErrorClass, errorActiveClass} = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorActiveClass);
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement) => {
    // показываем ошибку
    const {inputErrorClass, errorActiveClass} = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorActiveClass);
}

const checkInputValidity = (formElement, inputElement, config) => {
    // проверить инпут на валидность
    if (inputElement.validity.valid){
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
    // если валидный, то прячем ошибку, если нет, то показываем

}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

// замена кнопки
const toggleButtonState = (buttonElement, inputList) => {
    // если форма валидная, то включаем кнопку, если нет, то выключаем
    if (hasInvalidInput(inputList)) {
        // выключаем
        buttonElement.disabled = true;
    } else {
        // включаем
        buttonElement.disabled = false;
    }

}

const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;
    // найти все инпуты
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // найти кнопку
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            // проверить валидность инпута
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonState(buttonElement, inputList);
        })
    })
    // установить слушатели каждому инпуту

    // устанавливаем кнопку
    toggleButtonState(buttonElement, inputList);
}


const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    // найти все формы на странице
    const formList = Array.from(document.querySelectorAll(formSelector));
    // повесить слушатели на импуты и кнопки
    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
}