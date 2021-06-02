export class Card {
    constructor(name, link, templateSelector, openPopup, popupPhoto, photo, photoName) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;

        this._createElements();
        this._setElementsListeners(openPopup, popupPhoto, photo, photoName);
        
    }

    _createElements() {
        const templateElement = document.querySelector(this._templateSelector).content;
        this._item = templateElement.querySelector('.elements__element').cloneNode(true);

        this._likeButton = this._item.querySelector('.elements__like');
        this._deleteButton = this._item.querySelector('.elements__trash');
        this._cardImage = this._item.querySelector('.elements__img')
        this._cardTitle = this._item.querySelector('.elements__title');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
    }

    _setElementsListeners(openPopup, popupPhoto, photo, photoName) {
        this._likeButton.addEventListener('click', (e) => this._handleLikeClick(e));
        this._deleteButton.addEventListener('click', (e) => this._handleRemoveClick(e));
        this._cardImage.addEventListener('click', () => this._handleOpenReview(openPopup, popupPhoto, photo, photoName));
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('elements__like_active');
    }

    _handleRemoveClick() {
        this._item.remove();
    }

    _handleOpenReview(openPopup, popupPhoto, photo, photoName) {
        openPopup(popupPhoto);
        
        photo.src = this._link;
        photo.alt = this._name;
        photoName.textContent = this._name;
    }

    render() {
        return this._item;
    }
}