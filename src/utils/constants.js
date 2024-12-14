export const cards = document.querySelector(".places__list");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const placeAddButton = document.querySelector(".profile__add-button");
export const avatarBlock = document.querySelector(".profile__image");

export const popupCloseButtons = document.querySelectorAll(".popup__close");
export const popups = document.querySelectorAll(".popup");

export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupImage = imagePopup.querySelector(".popup__image");
export const imagePopupParagraph = imagePopup.querySelector(".popup__caption");

export const editProfilePopup = document.querySelector(".popup_type_edit");
export const newCardPopup = document.querySelector(".popup_type_new-card");
export const editAvatarPopup = document.querySelector(".popup_type_avatar");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

export const editProfileForm = document.forms["edit-profile"];
export const nameInput = editProfileForm.elements["name"];
export const descriptionInput = editProfileForm.elements["description"];

export const newPlaceForm = document.forms["new-place"];
export const placeNameInput = newPlaceForm.elements["place-name"];
export const linkInput = newPlaceForm.elements["link"];

export const editAvatarForm = document.forms["edit-avatar"];
export const avatarInput = editAvatarForm.elements["avatar"];

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input-type-error",
};