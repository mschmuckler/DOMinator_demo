const randomNum = () => Math.floor(Math.random() * 1500);

const appendCardToDeck = (card) => {
  const deck = $l("#deck-list");
  const board = $l("#board-list");
  const cardData = JSON.parse(card.currentTarget.response).card;

  const newCard = $l(["li"]);
  newCard.addClass(`card ${cardData.id} ${cardData.colorIdentity}`);

  const deleteButton = $l(["button"]);
  deleteButton.html("DISCARD");
  deleteButton.on("click", () => newCard.remove() );

  const playButton = $l(["button"]);
  playButton.html("PLAY");
  playButton.on("click", () => {
    setTimeout(() => {
      playButton.remove();
      deleteButton.html("DESTROY");
      newCard.addClass("in-play");
      newCard.on("click", () => newCard.toggle("tapped"));
      board.append(newCard);
    }, 100)
  });

  const cardImg = $l(["img"]);
  cardImg.attr("src", cardData.imageUrl)

  newCard.append(cardImg);
  newCard.append(deleteButton);
  newCard.append(playButton);
  deck.append(newCard);
};

$l(() => {

  const addButton = $l("#add-card-btn");
  addButton.on("click", () => {
    $l.ajax({
      method: "GET",
      url: `https://api.magicthegathering.io/v1/cards/${ randomNum() }`,
      success: (card) => appendCardToDeck(card),
    });
  });

  const deleteAllButton = $l("#delete-all-btn");
  deleteAllButton.on("click", () => {
    const allCards = $l("li");
    allCards.remove();
  });

});
