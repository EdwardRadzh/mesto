let openPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let saveInfoButton = document.querySelector('.popup__btn');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_description');
let profilePopupOpened = false;

function setProfileInputValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function togglePopup() {
    popup.classList.toggle('popup_opened');
    profilePopupOpened = !profilePopupOpened;
    if (profilePopupOpened) {
        setProfileInputValues();   
        // console.log(nameInput.value);
    }
};

openPopupButton.addEventListener("click", togglePopup);

closePopupButton.addEventListener('click', togglePopup);



function onProfileSave() {
    // console.log(nameInput.value);
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    // console.log(nameInput.value, evt);
    onProfileSave();
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
    

