const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupName = document.querySelector('.popup_type_profile');
const closeProfileButton = document.querySelector('.popup__close-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfile = popup.querySelector('.popup__form_profile');
const nameInput = popup.querySelector('.popup__input_value_name');
const jobInput = popup.querySelector('.popup__input_value_description');
const addPlaceButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const openPopupAddCard = document.querySelector('.profile__add-button');
const closePopupAddCard = document.querySelector('.popup__close-add-button');
const placeInput = document.querySelector('.popup__input_value_place');
const linkInput = document.querySelector('.popup__input_value_link');
const placeTitle = document.querySelector('.elements__title');
const placeImg = document.querySelector('.elements__img');
const addCardButton = document.querySelector('.popup__btn_add-card');
const formPlace = popupAddCard.querySelector('.popup__form_place');
const popupPhoto = document.querySelector('.popup_type_open');
const photo = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-description');
const closePhoto = document.querySelector('.popup__close-photo-button');
const templateElement = document.querySelector('#template-element').content;
const elementsContainer = document.querySelector('.elements');
const popupList = Array.from(document.querySelectorAll('.popup'));
const inputError = document.querySelector('.popup__input-error');
const createCardButton = document.querySelector('.popup__btn_type_create-card')

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
closeOnOverlay(popup);

// закрытие попапа по esc
function closeByEsc(evt) {
    popupList.forEach((popupElement) => {
    if (evt.key === "Escape") {
          closePopup(popupElement);
        }
    })
}

// открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closeByEsc);
    clearInputError(popup);
}

// очистка полей
function clearInputError(popup) {
    // найти форму
    const currentForm = popup.getElementsByTagName('form')[0]; // обратиться к нулевому элементу
    if (currentForm) {
        const formInputs = Array.from(currentForm.getElementsByTagName('input')); // находим инпуты
        formInputs.forEach((input) => {
            hideInputError(currentForm, input);
        })
        const button = currentForm.getElementsByTagName('button')[0];
        toggleButtonState(button, formInputs);
    }
}

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
    closePopup(popup);
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
    const item = templateElement.querySelector('.elements__element').cloneNode(true);
    const elementImg = item.querySelector('.elements__img');
    const elementTitle = item.querySelector('.elements__title');
    elementImg.src = link;
    elementImg.alt = name;
    elementTitle.textContent = name;
    item.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
        });
   
        item.querySelector('.elements__trash').addEventListener('click', function (evt) {
           evt.target.closest('.elements__element').remove();
       });
   
       item.querySelector('.elements__img').addEventListener('click', function(){
           openPopup(popupPhoto);
           photo.src = link;
           photo.alt = name;
           photoName.textContent = name;
       });
    return item
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
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

openPopupAddCard.addEventListener('click', function () {
    openPopup(popupAddCard);
});

closePopupAddCard.addEventListener('click', function () {
    closePopup(popupAddCard);
    formPlace.reset();
});

closePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
});


const config = {
    formSelector:'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active',
};

enableValidation(config);