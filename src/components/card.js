const cardTemplate = document.querySelector("#card-template").content;

export function handleDeleteClick(event) {
  event.target.closest(".card").remove();
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
  const cardImage = card.querySelector(".card__image");
  card.querySelector(".card__title").textContent = props.name;
  cardImage.src = props.link;
  cardImage.alt = props.name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteClickHandler);
  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeClickHandler);
  cardImage.addEventListener("click", () =>
    imageClickHandler(props.name, props.link)
  );
  return card;
}
