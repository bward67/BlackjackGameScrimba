const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const playerEl = document.getElementById("player-el");

let sum = 0;
let cards = [];
let message = "";
let isAlive = false;
let hasBlackJack = false;
let player = {
  name: "Barbara",
  moneyInAccount: 2000,
};

playerEl.textContent = player.name + ": " + "R" + player.moneyInAccount;

function getRandomCard() {
  // this can't be a function expression using the arrow function or we won't have access to it above
  //we must get random numbers from 2 - 11
  //the ace will be 11 - so we don't want 1 we want 11 instead of 1
  //the J, Q and K will be 10 - so we don't want 12 & 13 we want 10 instead of 12 and 13
  //the remaining will be any random number
  let randomNumber = Math.ceil(Math.random() * 13);
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}

//we must do a conditional statement to decide what sum makes a winner, loser or take another card

const renderGame = () => {
  //we must display ALL the cards - so we put them into an array and we call this array cards
  cardsEl.textContent = "Cards: "; //but then we must add the cards array items to this and we can do it using a for loop - iterating over each item in the cards array and displaying them using cardsEl.textContent
  for (let i = 0; i < cards.length; i++) {
    //console.log(cards[i]);
    //now we set them to the cardsEl keeping the Cards: from above
    cardsEl.textContent += cards[i] + " ";
    //and now no matter how many times I click the new card button I will add another new card into the array and display it in the Cards: element
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum < 21) {
    message = "Go on, take another card - just press the New Card button";
  } else if (sum > 21) {
    message =
      "Busted! Sorry, but you lost. Maybe try your luck again by pressing the New Game button";
    isAlive = false;
  } else {
    message = "WINNER WINNER Chicken Dinner!";
    hasBlackJack = true;
  }

  //console.log({ firstCard, secondCard, sum });
  messageEl.textContent = message;
};

const startGame = () => {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum += firstCard + secondCard;
  renderGame();
};

const newCard = () => {
  //! but there are 2 problems -
  //1. we can continue to click the new card button and get a new card AFTER the game is over &
  //we can click the new card button and get a new Card even before we click the Start Game button
  //! so we only want to give a New Card IF isAlive is true && if hasBlackJack is false
  if (isAlive && !hasBlackJack) {
    //we want to draw a new card
    let newCard = getRandomCard();
    //now we must add the newCard to the sum
    sum += newCard;
    cards.push(newCard);
    //console.log({ newCard, cards });
    //but now how to display the newCard which is now in the cards Array -

    renderGame(); //and this will include the updated sum which has the 1st 2 cards in it b/c we did this in the startGame function: sumEl.textContent = "Sum: " + sum;
  }
};
