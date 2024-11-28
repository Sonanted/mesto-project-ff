const cardTemplate = document.querySelector("#card-template").content;

export function handleDeleteClick(event) {
  event.target.parentNode.remove();
}

export function handleLikeClick(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function createCard(
  props,
  imageClickHandler,
  deleteClickHandler,
  likeClickHandler
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = props.name;
  card.querySelector(".card__image").src = props.link;
  card.querySelector(".card__image").alt = props.name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteClickHandler);
  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeClickHandler);
  card
    .querySelector(".card__image")
    .addEventListener("click", imageClickHandler);
  return card;
}
