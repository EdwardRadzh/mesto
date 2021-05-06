const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = popup.querySelector('.popup__form_profile');
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

// отправление данных в инпут
function setProfileInputValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

// открытие попапа профиля
function openPopupProfile() {
    popup.classList.add('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        setProfileInputValues();
    }
};

// закрытие попапа профиля
function closePopupProfile() {
    popup.classList.remove('popup_opened');
}

// открыть попап для карточек
function openCardPopup() {
    popupAddCard.classList.add('popup_opened');
};

// закрыть попап для карточек
function closeCardPopup() {
    popupAddCard.classList.remove('popup_opened');
    formPlace.reset();
};

// отправка данных из инпута на страницу
function addProfileSave() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// сохрание данных из попапа на страницу
function formSubmitHandler (evt) {
    evt.preventDefault();
    addProfileSave();
    closePopupProfile();
};

// добавить новую карточку
function cardSubmitHandler(evt) {
    evt.preventDefault();
    addCard(placeInput.value, linkInput.value, 'start');
    closeCardPopup();
    formPlace.reset();
};


  // открыть попап с фото
  function openPopupPhoto() {
    popupPhoto.classList.add('popup_opened');
  }

  // закрыть попап с фото
  function closePopupPhoto() {
    popupPhoto.classList.remove('popup_opened');
  }


const templateElement = document.querySelector('#template-element').content;
const elementsContainer = document.querySelector('.elements');

// заполненный шаблон карточки
function getCard (name, link) {
    const item = templateElement.querySelector('.elements__element').cloneNode(true);
    const elementImg = item.querySelector('.elements__img');
    const elementTitle = item.querySelector('.elements__title');
    elementImg.src = link;
    elementTitle.textContent = name;
    return item
}

// отрисовать карточку и повесить события
function addCard(name, link, position) {
    const newCard = getCard(name, link);
    
     newCard.querySelector('.elements__like').addEventListener('click', function (evt) {
     evt.target.classList.toggle('elements__like_active');
     });

     newCard.querySelector('.elements__trash').addEventListener('click', function (evt) {
        evt.target.closest('.elements__element').remove();
    });

    newCard.querySelector('.elements__img').addEventListener('click', function(){
        openPopupPhoto();
        photo.src = link;
        photoName.textContent = name;
    });
    (position === 'start') ? elementsContainer.prepend(newCard) : elementsContainer.append(newCard);
};

// перебор массива
initialCards.forEach((el) => {
    addCard(el.name, el.link)
});


formPlace.addEventListener('submit', cardSubmitHandler);

openPopupButton.addEventListener("click", openPopupProfile);

closePopupButton.addEventListener('click', closePopupProfile);

formElement.addEventListener('submit', formSubmitHandler);

openPopupAddCard.addEventListener('click', openCardPopup);

closePopupAddCard.addEventListener('click', closeCardPopup);

closePhoto.addEventListener('click', closePopupPhoto);
