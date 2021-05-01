const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_value_name');
const jobInput = popup.querySelector('.popup__input_value_description');
const addPlaceButton = document.querySelector('.profile__add-button');
const like = document.querySelector('.elements__like');


function setProfileInputValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function togglePopup() {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        setProfileInputValues();   
        // console.log(nameInput.value);
    }
};

function getProfileSave() {
    // console.log(nameInput.value);
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    // console.log(nameInput.value, evt);
    getProfileSave();
    togglePopup();
}

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const templateElement = document.querySelector('#template-element').content;
  const elementsContainer = document.querySelector('.elements');

//   for (let i = 0; i < initialCards.length; i = i + 1) {
//       const currentItem = initialCards[i];
//       const item = templateElement.querySelector('.elements__element').cloneNode(true);
//       item.querySelector('.elements__img').src = currentItem.link;
//       item.querySelector('.elements__title').textContent = currentItem.name;
//       elementsContainer.append(item);
//   }

  initialCards.forEach(function(card) {
    const item = templateElement.querySelector('.elements__element').cloneNode(true);
    item.querySelector('.elements__img').src = card.link;
    item.querySelector('.elements__title').textContent = card.name;
    elementsContainer.append(item);
  })


openPopupButton.addEventListener("click", togglePopup);

closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);
    

