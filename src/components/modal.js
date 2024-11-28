function handleEscapeKeyPress(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKeyPress);
}

export function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeKeyHandler);
}
