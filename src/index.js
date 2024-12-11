import "./pages/index.css";
import {
  createCard,
  handleDeleteButtonClick,
  handleLikeButtonClick,
} from "./components/card";
import {openModal, closeModal, handleOverlayClick} from "./components/modal";
import {
  getCards,
  getUser,
  patchUser,
  patchUserAvatar,
  postCard,
} from "./components/api";

const cards = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const avatarBlock = document.querySelector(".profile__image");

const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupParagraph = imagePopup.querySelector(".popup__caption");

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editAvatarPopup = document.querySelector(".popup_type_avatar");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["description"];

const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];

const editAvatarForm = document.forms["edit-avatar"];
const avatarInput = editAvatarForm.elements["avatar"];

const handlers = [
  handleDeleteButtonClick,
  handleLikeButtonClick,
  handleImageClick,
];

let id;

function submitProfileForm(event) {
  event.preventDefault();
  renderSaving(editProfileForm, true);
  patchUser(
    JSON.stringify({
      name: nameInput.value,
      about: descriptionInput.value,
    })
  )
    .then((res) => {
      renderProfile(res);
    })
    .finally(() => renderSaving(editProfileForm, false));
}

function submitNewPlaceForm(event) {
  event.preventDefault();
  renderSaving(newPlaceForm, true);
  postCard(
    JSON.stringify({
      name: placeNameInput.value,
      link: linkInput.value,
    })
  )
    .then((res) => {
      cards.prepend(createCard(res, id, ...handlers));
    })
    .finally(() => {
      renderSaving(newPlaceForm, false);
      newPlaceForm.reset();
    });
}

function submitAvatarForm(event) {
  event.preventDefault();
  renderSaving(editAvatarForm, true);
  patchUserAvatar(
    JSON.stringify({
      avatar: avatarInput.value,
    })
  )
    .then((res) => {
      renderAvatar(res.avatar);
    })
    .finally(() => {
      renderSaving(editAvatarForm, false);
      editAvatarForm.reset();
    });
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupParagraph.textContent = name;
  openModal(imagePopup);
}

function renderSaving(form, flag) {
  const button = form.querySelector(".popup__button");
  button.textContent = flag ? "Сохранение..." : "Сохранить";
  button.disabled = flag;
  if (!flag) {
    closeModal(form.closest(".popup"));
  }
}

function renderCards(items) {
  items.forEach((item) => cards.append(createCard(item, id, ...handlers)));
}

function renderProfile(props) {
  document.querySelector(".profile__title").textContent = props.name;
  document.querySelector(".profile__description").textContent = props.about;
  renderAvatar(props.avatar);
  id = props._id;
}

function renderAvatar(link) {
  document.querySelector(
    ".profile__image"
  ).style = `background-image: url('${link}')`;
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
avatarBlock.addEventListener("click", () => openModal(editAvatarPopup));

editProfileForm.addEventListener("submit", (event) => submitProfileForm(event));
newPlaceForm.addEventListener("submit", (event) => submitNewPlaceForm(event));
editAvatarForm.addEventListener("submit", (event) => submitAvatarForm(event));

Promise.all([getUser(), getCards()]).then((values) => {
  const [responseProfile, responseCards] = [...values];
  renderProfile(responseProfile);
  renderCards(responseCards);
});
