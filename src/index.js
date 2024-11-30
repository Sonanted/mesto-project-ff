import "./pages/index.css";
import {initialCards} from "./components/cards";
import {
  createCard,
  handleDeleteClick,
  handleLikeClick,
} from "./components/card";
import {openModal, closeModal, handleOverlayClick} from "./components/modal";

const cards = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupParagraph = imagePopup.querySelector(".popup__caption");

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["description"];

const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];

function submitProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function submitNewPlaceForm(event) {
  event.preventDefault();
  cards.prepend(
    createCard(
      {name: placeNameInput.value, link: linkInput.value},
      deleteCard,
      likeCard,
      imagePopupFunction
    )
  );
  newPlaceForm.reset();
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupParagraph.textContent = name;
  openModal(imagePopup);
}

function renderCards() {
  initialCards.forEach((item) =>
    cards.append(
      createCard(item, handleImageClick, handleDeleteClick, handleLikeClick)
    )
  );
}

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".popup")));
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", handleOverlayClick);
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => openModal(newCardPopup));

editProfileForm.addEventListener("submit", (event) => {
  submitProfileForm(event);
  closeModal(editProfilePopup);
});

newPlaceForm.addEventListener("submit", (event) => {
  submitNewPlaceForm(event);
  closeModal(newCardPopup);
});

renderCards();
