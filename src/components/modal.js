const config = {
  popupClass: "popup",
  popupOpenedClass: "popup_is-opened",
};

function handleEscapeKeyPress(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(`.${config.popupOpenedClass}`));
  }
}

export function openModal(element) {
  element.classList.add(config.popupOpenedClass);
  document.addEventListener("keydown", handleEscapeKeyPress);
}

export function handleOverlayClick(event) {
  if (event.target.classList.contains(config.popupClass)) {
    closeModal(event.target);
  }
}

export function closeModal(element) {
  element.classList.remove(config.popupOpenedClass);
  document.removeEventListener("keydown", handleEscapeKeyPress);
}
