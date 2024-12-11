import {deleteCard, deleteLikeFromCard, putLikeOnCard} from "./api";

const config = {
  cardClass: "card",
  cardTitleClass: "card__title",
  cardImageClass: "card__image",
  likeButtonClass: "card__like-button",
  likeButtonActiveClass: "card__like-button_is-active",
  likeCountClass: "card__like-count",
  deleteButtonClass: "card__delete-button",
  deleteButtonHiddenClass: "card__delete-button_is-hidden",
};

const cardTemplate = document.querySelector("#card-template").content;

export function handleDeleteButtonClick(event) {
  const card = event.target.closest(`.${config.cardClass}`);
  deleteCard(card.dataId);
  card.remove();
}

export function handleLikeButtonClick(event) {
  const card = event.target.closest(`.${config.cardClass}`);
  (event.target.classList.toggle(config.likeButtonActiveClass)
    ? putLikeOnCard(card.dataId)
    : deleteLikeFromCard(card.dataId)
  ).then((res) => {
    card.querySelector(`.${config.likeCountClass}`).textContent =
      res.likes.length;
  });
}

export function createCard(
  props,
  userId,
  deleteClickHandler,
  likeClickHandler,
  imageClickHandler
) {
  const card = cardTemplate
    .querySelector(`.${config.cardClass}`)
    .cloneNode(true);
  const cardImage = card.querySelector(`.${config.cardImageClass}`);
  const cardLikeButton = card.querySelector(`.${config.likeButtonClass}`);

  card.dataId = props._id;
  card.querySelector(`.${config.cardTitleClass}`).textContent = props.name;
  cardImage.src = props.link;
  cardImage.alt = props.name;
  card
    .querySelector(`.${config.deleteButtonClass}`)
    .addEventListener("click", deleteClickHandler);
  cardLikeButton.addEventListener("click", likeClickHandler);
  if (props.likes.find((item) => item._id == userId)) {
    cardLikeButton.classList.add(config.likeButtonActiveClass);
  }
  cardImage.addEventListener("click", () =>
    imageClickHandler(props.name, props.link)
  );
  card.querySelector(`.${config.likeCountClass}`).textContent =
    props.likes.length;
  if (userId !== props.owner._id) {
    card
      .querySelector(`.${config.deleteButtonClass}`)
      .classList.add(config.deleteButtonHiddenClass);
  }
  return card;
}
