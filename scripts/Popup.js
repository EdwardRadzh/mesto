export class Popup {

    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        const popupList = Array.from(document.querySelectorAll('.popup'));
        popupList.forEach((popupElement) => {
            popupElement.addEventListener('mousedown', this._closeOnOverlay.bind(this))
        });
    };
    
    close() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _closeOnOverlay(evt) {
        if(evt.target.classList.contains('popup_opened')){
            this.close();
        };
    };

    setEventListeners() {
        this.popupElement.querySelector('.popup__close').addEventListener('click', () => this.close.bind(this));
    };

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        };
    };
};

