import { Popup } from '../scripts/Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb, userInfo) {
        super(popupSelector);
        this._onSubmitCb = onSubmitCb;
        this._formElement = this.popupElement.querySelector('.popup__form');
        this._formAddCardElement = this.popupElement.querySelector('.popup__form_place');
        this._userInfo = userInfo;
    };

    _getInputValues() {
        const result = {}
        const inputs = Array.from(this._formElement.querySelectorAll('.popup__input'))
        inputs.forEach(input => {

            result[input.name] = input.value;
        });

        return result;
    };

    _setInputValues() {
        const inputs = Array.from(this._formElement.querySelectorAll('.popup__input'))
        const userNameInput = inputs.find((el) => el.id === 'username');
        const userDescriptionInput = inputs.find((el) => el.id === 'user-description');
        const { userName, userDescription } = this._userInfo.getUserInfo();
        userNameInput.value = userName;
        userDescriptionInput.value = userDescription;
    };

    open() {
        super.open();
        if (this.popupElement.classList.contains('popup_type_profile')) {
            this._setInputValues();
        };
    };


    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const cardData = this._getInputValues();
            this._onSubmitCb(cardData);
        });
    };

    close() {
        super.close();
        this._formElement.reset();
    };
};