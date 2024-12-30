const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const playerEl = document.getElementById("player-el");

let cards = [];
let isAlive = false;
let hasBlackJack = false;
let sum = 0;
let message = "";
// cardsEl.textContent = "Cards: ";
// sumEl.textContent = "Sum: ";
let player = {
  name: "Barbara",
  money: "1000",
};

playerEl.textContent = player.name + ": " + "R" + player.money;

//! we must make it so that if the user draws a 1/Ace it gives them an 11 and if they draw 11, 12 or 13 (J, Q or K) it gives them a 10 - we will do this with an if statement using random numbers - we must create a getRandomCard function that will do this and we will use the function in both start game and new card to get the cards

function getRandomCard() {
  let randomNumber = Math.ceil(Math.random() * 13);
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}
//console.log(getRandomCard());

function renderGame() {
  //this will be run in both start game and new card functions
  //it will control/update the sumEl and cardsEl here and NOT in the startGame and newCard function
  //we will control/update the message here too
  //! display the cards in the cardsEl here
  cardsEl.textContent = "Cards: ";
  //! we will loop through the cards array and print EACH item in it one by one
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  //! display the sum
  sumEl.textContent = "Sum: " + sum;

  //! we must change the message when the user is either a winner, a loser or still in the game therefore ask if they want a new card
  if (sum === 21) {
    message = "WINNER WINNER Chicken Dinner! Collect your money!";
    hasBlackJack = true;
  } else if (sum > 21) {
    message =
      "You have gone BUST! You are out of the game but if you wish to play again just click the START GAME button";
    isAlive = false;
  } else {
    message = "You are still in the game - click NEW CARD to get a new card";
  }
  messageEl.textContent = message;
}

function startGame() {
  //we must set isAlive to true
  isAlive = true;

  //we will create 2 cards here & display them as soon as we click the start game and put them in the cards array
  let randomCard1 = getRandomCard();
  let randomCard2 = getRandomCard();
  cards = [randomCard1, randomCard2]; // I don't want the ,
  //   cardsEl.textContent += cards; // NO! this will be controlled in RenderGame()
  sum = randomCard1 + randomCard2;
  //   sumEl.textContent += sum; // NO! this will be controlled in RenderGame()
  //then we will get their sum and display it in the Sum:
  renderGame();
}

function newCard() {
  //! we should NOT be able to click this if the game has been won or the user has busted so only if they are still alive
  if (isAlive && !hasBlackJack) {
    let newCard = getRandomCard();

    // cardsEl.textContent += " " + newCard; // NO! this will be controlled in RenderGame()
    sum += newCard;
    cards.push(newCard);
    renderGame();
  }
}
