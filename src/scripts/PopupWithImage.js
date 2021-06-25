import { Popup } from '../scripts/Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    };

    open() {
        super.open();
    };

    handlePopupReview(link, description) {
        const photo = this.popupElement.querySelector('.popup__photo');
        const photoDescription = this.popupElement.querySelector('.popup__photo-description');

        photo.src = link;
        photoDescription.textContent = description;

        this.open();
    };
};