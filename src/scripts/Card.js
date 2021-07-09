export class Card {
    constructor(data, templateSelector, handlePopupReview, handleDeleteCardClick, userId, { setLike, deleteLike }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.handlePopupReview = handlePopupReview;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._setLike = setLike;
        this._deleteLike = deleteLike;

        this._id = data._id // id карточки
        this._ownerId = data.owner._id // id создателя карточки
        this._userId = userId // id текущего пользователя
        
        this._getTemplate();
        this._createElements();
        this._setElementsListeners();
        this._checkLikedState();
    }

    _getTemplate() {
        const templateElement = document.querySelector(this._templateSelector).content;
        this._item = templateElement.querySelector('.elements__element').cloneNode(true);

        this._likeButton = this._item.querySelector('.elements__like');
        this._deleteButton = this._item.querySelector('.elements__trash');
        this._cardImage = this._item.querySelector('.elements__img');
        this._cardTitle = this._item.querySelector('.elements__title');
        this._likeCount = this._item.querySelector('.elements__like-count');
    }

    _createElements() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
    };

    _setElementsListeners() {
        this._deleteButton.addEventListener('click', this._handleDeleteCardClick);
        this._cardImage.addEventListener('click', () => this.handlePopupReview());
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('elements__like_active')) {
             this._disLike(this._data);
            console.log(this._data);
            } else { 
              this._like(this._data);
            }
          })
    };

    delete() {
        this._item.remove();
        this._item = null;
    };

    render() {
        if(!(this._ownerId === this._userId)) {
            this._deleteButton.style.display = 'none'
        }
        this._checkLikedState();
        return this._item;
    };

    _like(data) {
        this._addLikeClass();
        this._setLike(data);
    }

    _addLikeClass() {
        this._likeButton.classList.add('elements__like_active')
    }

    _disLike(data) {
        this._removeLikeClass();
        this._deleteLike(data);
    }

    _removeLikeClass() {
        this._likeButton.classList.remove('elements__like_active')
    }

    setLikeCount(data) {
        this._likeCount.textContent = String(data.likes.length);
    }

    _checkLikedState() {
        this._data.likes.forEach((likeOwner) => {
          if (likeOwner._id === this._ownerId) {
            this._addLikeClass();
          }
        })
    }
};
