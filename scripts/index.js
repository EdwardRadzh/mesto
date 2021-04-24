let openPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_value_name');
let jobInput = popup.querySelector('.popup__input_value_description');

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

openPopupButton.addEventListener("click", togglePopup);

closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);