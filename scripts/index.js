const cardTemplate = document.querySelector("#card-template").content;
const cards = document.querySelector(".places__list");

function createCard(props, deleteFunction) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = props.name;
  card.querySelector(".card__image").src = props.link;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunction);
  return card;
}

function deleteCard(event) {
  event.target.parentNode.remove();
}

function renderCards() {
  initialCards.forEach((item) => cards.append(createCard(item, deleteCard)));
}

renderCards();
