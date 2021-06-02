import { initialCards } from '../scripts/initial-cards.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';

const openPopupButton = document.querySelector('.profile__edit');
const popupName = document.querySelector('.popup_type_profile');
const closeProfileButton = document.querySelector('.popup__close_type_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfile = popupName.querySelector('.popup__form_profile');
const nameInput = popupName.querySelector('.popup__input_value_name');
const jobInput = popupName.querySelector('.popup__input_value_description');
const addPlaceButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const openPopupAddCard = document.querySelector('.profile__add-button');
const closePopupAddCard = document.querySelector('.popup__close_type_add-button');
const placeInput = document.querySelector('.popup__input_value_place');
const linkInput = document.querySelector('.popup__input_value_link');
const placeTitle = document.querySelector('.elements__title');
const placeImg = document.querySelector('.elements__img');
const addCardButton = document.querySelector('.popup__btn_add-card');
const formPlace = popupAddCard.querySelector('.popup__form_place');
const popupPhoto = document.querySelector('.popup_type_open');
const photo = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-description');
const closePhoto = document.querySelector('.popup__close_type_photo-button');
const templateElement = document.querySelector('#template-element').content;
const elementsContainer = document.querySelector('.elements');
const popupList = Array.from(document.querySelectorAll('.popup'));
const inputError = document.querySelector('.popup__input-error');
const createCardButton = document.querySelector('.popup__btn_type_create-card');


// отправление данных в инпут
function setProfileInputValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

// закрытие попапа по клику на оверлэй
function closeOnOverlay() {
    popupList.forEach((popupElement) => {
        popupElement.addEventListener("mousedown", function(evt) {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popupElement);
            }
        })
    })
};
closeOnOverlay();

// закрытие попапа по esc
function closeByEsc(evt) {
    const currentPopup = document.querySelector('.popup_opened')
    if (evt.key === "Escape") {
          closePopup(currentPopup);
        }
    
}

// открыть попап
function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    document.addEventListener("keydown", closeByEsc);
    
}

// очистка полей
// function clearInputError(popup) {
//     // найти форму
//     const currentForm = popup.getElementsByTagName('form')[0]; // обратиться к нулевому элементу
//     if (currentForm) {
//         const formInputs = Array.from(currentForm.getElementsByTagName('input')); // находим инпуты
//         formInputs.forEach((input) => {
//             hideInputError(currentForm, input);
//         })
//         const button = currentForm.getElementsByTagName('button')[0];
//         toggleButtonState(button, formInputs);
//     }
// }

// закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closeByEsc);
}


// отправка данных из инпута на страницу
function addProfileSave() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// сохрание данных из попапа на страницу
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    addProfileSave();
    closePopup(popupName);
};

// добавить новую карточку
function handleCardSubmit(evt) {
    evt.preventDefault();
    addCard(placeInput.value, linkInput.value, 'start');
    closePopup(popupAddCard);
    formPlace.reset();
};
 
// заполненный шаблон карточки
function getCard (name, link) {
    const card = new Card(name, link, '#template-element', openPopup, popupPhoto, photo, photoName )

    return card.render();
}

// отрисовать карточку и повесить события
function addCard(name, link, position) {
    const newCard = getCard(name, link);
    (position === 'start') ? elementsContainer.prepend(newCard) : elementsContainer.append(newCard);
};

// перебор массива
initialCards.forEach((el) => {
    addCard(el.name, el.link);
});



formPlace.addEventListener('submit', handleCardSubmit);

openPopupButton.addEventListener("click", function () {
    openPopup(popupName);
    setProfileInputValues();
});

closeProfileButton.addEventListener('click', function () {
    closePopup(popupName);
    
    profileFormValidator.clearInputError(popupName);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

openPopupAddCard.addEventListener('click', function () {
    openPopup(popupAddCard);
    
});

closePopupAddCard.addEventListener('click', function () {
    closePopup(popupAddCard);
    addCardFormValidator.clearInputError(popupAddCard);
    formPlace.reset();
    
});

closePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
});


export const config = {
    formSelector:'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active',
};



const profileFormValidator = new FormValidator( {
    formSelector:'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active',
    }, 
    document.querySelector('form[name="profile-form"]')
);

profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator( {
    formSelector:'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active',
    }, 
    document.querySelector('form[name="add-card-form"]')
);

addCardFormValidator.enableValidation();

