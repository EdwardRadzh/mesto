import '../../src/pages/index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupDeleteCard } from '../scripts/PopupDeleteCard';
import { Api } from '../scripts/Api';

const openPopupButton = document.querySelector('.profile__edit');
const closeProfileButton = document.querySelector('.popup__close_type_profile');
const openPopupAddCard = document.querySelector('.profile__add-button');
const closePopupAddCard = document.querySelector('.popup__close_type_add-button');
const closePhoto = document.querySelector('.popup__close_type_photo-button');
const editAvatarButton = document.querySelector('.profile__photo-edit-button');

let userId = null;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
      authorization: '81d77c87-7194-433b-a4bb-047f8939c4ec',
      'Content-Type': 'application/json'
    }
  });

const popupWithImage = new PopupWithImage('.popup_type_open');

const cardsList = new Section({
    items: [],
    renderer: (item) => {
        const newCard = new Card(item, '#template-element', () => {
            popupWithImage.handlePopupReview(item.link, item.name);
        },  
        () => { 
            onDeleteBtnClick(item, newCard);

        },
        userId,
        {
            setLike: (data) => {
                api.setLike(data)
                .then((data) => {
                    newCard.setLikeCount(data)
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            deleteLike: (data) => {
                api.deleteLike(data)
                .then((data) => {
                    newCard.setLikeCount(data)
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        });
        const card = newCard.render();
        cardsList.element.prepend(card);
        
    }
}, '.elements')

Promise.all([
    api.getUserInfo(),
    api.getCards(),
  ])
    .then(([userData, initialCards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardsList.getInitialCards(initialCards.reverse());
        cardsList.renderAll();
    })
    .catch((err) => {
      console.log(err);
    });

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__description',
    userAvatarSelector: '.profile__photo'
});

const addCardPopup = new PopupWithForm (
    '.popup_type_add', 
    (cardData) => {
    addCardPopup.renderLoading(true); 

    api.postCard(cardData)
    .then((res) => {
        cardsList.addItem(res);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        addCardPopup.renderLoading(false);
        addCardPopup.close()
    })
    },
    userInfo
);

addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
    '.popup_type_profile', 
    (profileData) => {
    editProfilePopup.renderLoading(true);

    api.setUserInfoChanges(profileData)
    .then((res) => {
        userInfo.setUserInfo(res)
        editProfilePopup.close()
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        editProfilePopup.renderLoading(false);
    })
    },
    userInfo
);

editProfilePopup.setEventListeners();

const popupDeleteCard = new PopupDeleteCard('.popup_type_delete', (id, element) => {
    
    console.log(id);
    api.deleteCard(id)
    .then(() => {
        element.delete();
        console.log(element);
        popupDeleteCard.close();
    })
    .catch((err) => {
        console.log(err);
    })
});

popupDeleteCard.setEventListeners();

const onDeleteBtnClick = (id, element) => {
    popupDeleteCard.open(id, element);
}

const popupWithUpdateAvatarForm = new PopupWithForm(
    '.popup_type_edit',
    (data) => {
        popupWithUpdateAvatarForm.renderLoading(true);
        api.setUserAvatar(data)
      .then((res) => {
        userInfo.handleUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithUpdateAvatarForm.renderLoading(false);
        popupWithUpdateAvatarForm.close();
      })
    },
);

popupWithUpdateAvatarForm.setEventListeners();


openPopupButton.addEventListener("click", function () {
    editProfilePopup.open();
    profileFormValidator.clearInputError();
});

closeProfileButton.addEventListener('click', function () {
    editProfilePopup.close();
});

openPopupAddCard.addEventListener('click', function () {
    addCardPopup.open();
    addCardFormValidator.toggleButtonState();
    addCardFormValidator.clearInputError();
});

closePopupAddCard.addEventListener('click', function () {
    addCardPopup.close();
    addCardFormValidator.clearInputError();
    addCardPopup.checkBtnEnable()
});

closePhoto.addEventListener('click', function () {
    popupWithImage.close();
});

editAvatarButton.addEventListener('click', function() {
    popupWithUpdateAvatarForm.open()
    editAvatarValidator.clearInputError()
})


export const config = {
    formSelector:'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active',
};


const profileFormValidator = new FormValidator( 
    config,
    document.querySelector('form[name="profile-form"]')
);

profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator( 
    config, 
    document.querySelector('form[name="add-card-form"]')
);

addCardFormValidator.enableValidation();

const editAvatarValidator = new FormValidator(
    config,
    document.querySelector('form[name="avatar-form"]')
);

editAvatarValidator.enableValidation();


