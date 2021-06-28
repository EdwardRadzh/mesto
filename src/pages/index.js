import '../../src/pages/index.css';
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';

const openPopupButton = document.querySelector('.profile__edit');
const closeProfileButton = document.querySelector('.popup__close_type_profile');
const openPopupAddCard = document.querySelector('.profile__add-button');
const closePopupAddCard = document.querySelector('.popup__close_type_add-button');
const closePhoto = document.querySelector('.popup__close_type_photo-button');


const popupWithImage = new PopupWithImage('.popup_type_open');

const cardsSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card(cardData.name, cardData.link, '#template-element', () => {
           
            // const { link, name } = cardData;
            popupWithImage.handlePopupReview(cardData.link, cardData.name);
            
        });

        const newCard = card.render();
        
        cardsSection.element.insertAdjacentElement('afterbegin', newCard);
        
    }
}, '.elements');

cardsSection.renderAll();

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__description'
});

const addCardPopup = new PopupWithForm (
    '.popup_type_add', 
    (cardData) => {
    cardsSection.addItem(cardData);
    addCardPopup.close();
    },
    userInfo
);

addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
    '.popup_type_profile', 
    (profileData) => { 
    userInfo.setUserInfo(profileData);
    editProfilePopup.close();
    },
    userInfo
);

editProfilePopup.setEventListeners();


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
    // editProfilePopup.clearInputError()
});

closePhoto.addEventListener('click', function () {
    popupWithImage.close();
});


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

