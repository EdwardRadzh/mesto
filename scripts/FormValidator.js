export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _setEventListeners() {
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            // проверить валидность инпута
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
        });
    });

    // устанавливаем кнопку
    // this.toggleButtonState(this._buttonElement, this._inputList);
    };

    _checkInputValidity = (inputElement) => {
        // проверить инпут на валидность
        if (inputElement.validity.valid){
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        };
        // если валидный, то прячем ошибку, если нет, то показываем
    
    };

    _hideInputError(inputElement) {
        // прячем ошибку
        // найти элемент текста ошибки
        
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorActiveClass);
        errorElement.textContent = '';
    };
    
    _showInputError(inputElement) {
        // показываем ошибку
        
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorActiveClass);
    };

    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

    toggleButtonState() {
        // если форма валидная, то включаем кнопку, если нет, то выключаем
        if (this._hasInvalidInput(this._inputList)) {
            // выключаем
            this._buttonElement.disabled = true;
        } else {
            // включаем
            this._buttonElement.disabled = false;
        };
    
    };

    clearInputError() {
        this._inputList.forEach((e) => {
            this._hideInputError(e);
            this.toggleButtonState();
        });
    };
    
    enableValidation() {
        this._setEventListeners();
    };
};