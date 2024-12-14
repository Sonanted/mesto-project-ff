import "./pages/index.css";

import {
  getCards,
  getUser,
  patchUser,
  patchUserAvatar,
  postCard,
} from "./components/api";

import {
  createCard,
  handleDeleteButtonClick,
  handleLikeButtonClick,
} from "./components/card";

import {openModal, closeModal, handleOverlayClick} from "./components/modal";

import {clearValidation, enableValidation} from "./components/validation";

import {
  cards,
  profileEditButton,
  placeAddButton,
  avatarBlock,
  popupCloseButtons,
  popups,
  imagePopup,
  imagePopupImage,
  imagePopupParagraph,
  editProfilePopup,
  newCardPopup,
  editAvatarPopup,
  profileTitle,
  profileDescription,
  editProfileForm,
  nameInput,
  descriptionInput,
  newPlaceForm,
  placeNameInput,
  linkInput,
  editAvatarForm,
  avatarInput,
  validationConfig,
} from "./utils/constants";

const handlers = {
  deleteClickHandler: handleDeleteButtonClick,
  likeClickHandler: handleLikeButtonClick,
  imageClickHandler: handleImageClick,
};

let id;

function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : buttonText;
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      closeModal(evt.target.closest(".popup"));
    })
    .catch((err) => console.error(`Форма не отправлена: ${err}`))
    .finally(() => renderLoading(false, submitButton, initialText));
}

function submitProfileForm(event) {
  function makeRequest() {
    return patchUser({
      name: nameInput.value,
      about: descriptionInput.value,
    }).then((res) => renderProfile(res));
  }
  handleSubmit(makeRequest, event);
}

function submitNewPlaceForm(event) {
  function makeRequest() {
    return postCard({
      name: placeNameInput.value,
      link: linkInput.value,
    }).then((res) => cards.prepend(createCard(res, id, handlers)));
  }
  handleSubmit(makeRequest, event);
}

function submitAvatarForm(event) {
  function makeRequest() {
    return patchUserAvatar({
      avatar: avatarInput.value,
    }).then((res) => renderAvatar(res.avatar));
  }
  handleSubmit(makeRequest, event);
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupParagraph.textContent = name;
  openModal(imagePopup);
}

function renderCards(items) {
  items.forEach((item) => renderCard(item));
}

function renderCard(item, method = "prepend") {
  const card = createCard(item, id, handlers);
  cards[method](card);
}

function renderProfile(props) {
  profileTitle.textContent = props.name;
  profileDescription.textContent = props.about;
  renderAvatar(props.avatar);
  id = props._id;
}

function renderAvatar(link) {
  avatarBlock.style = `background-image: url('${link}')`;
}

popupCloseButtons.forEach((button) =>
  button.addEventListener("click", () => closeModal(button.closest(".popup")))
);

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", handleOverlayClick);
});

profileEditButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

placeAddButton.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  newPlaceForm.reset();
  openModal(newCardPopup);
});

avatarBlock.addEventListener("click", () => {
  clearValidation(editAvatarForm, validationConfig);
  editAvatarForm.reset();
  openModal(editAvatarPopup);
});

editProfileForm.addEventListener("submit", (event) => submitProfileForm(event));
newPlaceForm.addEventListener("submit", (event) => submitNewPlaceForm(event));
editAvatarForm.addEventListener("submit", (event) => submitAvatarForm(event));

Promise.all([getUser(), getCards()])
  .then(([responseProfile, responseCards]) => {
    enableValidation(validationConfig);
    renderProfile(responseProfile);
    renderCards(responseCards);
  })
  .catch((error) => console.error(`Ошибка при загрузке страницы: ${error}`));
