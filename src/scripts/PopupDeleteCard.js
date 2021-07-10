import { Popup } from '../scripts/Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = document.querySelector('.popup__form_delete');
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
    }

    open(id, element) {
        super.open();
        this.id = id;
        this.element = element;
    }

    _submitEvtHandler(evt) {
        evt.preventDefault();
        this._submit(this.id, this.element);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('click', this._submitEvtHandler);
        
      }
}