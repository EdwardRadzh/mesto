export class Popup {

    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._saveCardBtn = this.popupElement.querySelector('.popup__btn_type_create-card');
    };

    open() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };
    
    close() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        
    };

    checkBtnEnable() {
        if (this._saveCardBtn) {
            this._saveCardBtn.disabled = true;
        };
    }

    setEventListeners() {
        this.popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
          });
    };

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        };
    };
};

