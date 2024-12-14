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
  deleteCard(card.dataId)
    .then(() => card.remove())
    .catch((error) => console.error(`Карточка не удалена: ${error}`));
}

export function handleLikeButtonClick(event) {
  const card = event.target.closest(`.${config.cardClass}`);
  (event.target.classList.contains(config.likeButtonActiveClass)
    ? deleteLikeFromCard(card.dataId)
    : putLikeOnCard(card.dataId)
  )
    .then((res) => {
      event.target.classList.toggle(config.likeButtonActiveClass);
      card.querySelector(`.${config.likeCountClass}`).textContent =
        res.likes.length;
    })
    .catch((error) =>
      console.error(`Количество лайков не было изменено: ${error}`)
    );
}

export function createCard(props, userId, handlers) {
  const card = cardTemplate
    .querySelector(`.${config.cardClass}`)
    .cloneNode(true);
  const cardImage = card.querySelector(`.${config.cardImageClass}`);
  const likeButton = card.querySelector(`.${config.likeButtonClass}`);
  const deleteButton = card.querySelector(`.${config.deleteButtonClass}`);

  card.dataId = props._id;
  card.querySelector(`.${config.cardTitleClass}`).textContent = props.name;

  cardImage.src = props.link;
  cardImage.alt = props.name;
  cardImage.addEventListener("click", () =>
    handlers.imageClickHandler(props.name, props.link)
  );

  likeButton.addEventListener("click", handlers.likeClickHandler);
  if (props.likes.find((item) => item._id == userId)) {
    likeButton.classList.add(config.likeButtonActiveClass);
  }

  deleteButton.addEventListener("click", handlers.deleteClickHandler);
  card.querySelector(`.${config.likeCountClass}`).textContent =
    props.likes.length;
  if (userId !== props.owner._id) {
    deleteButton.classList.add(config.deleteButtonHiddenClass);
  }

  return card;
}
