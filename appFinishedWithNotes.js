const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const playerEl = document.getElementById("player-el");
const messageEl = document.getElementById("message-el");

let player = {
  name: "Barbara",
  chips: 250,
};

playerEl.textContent = player.name + " : $" + player.chips;

let cards = [];
let sum = 0;
let message = "";
let hasBlackJack = false;
let isAlive = false; //we must start as false b/c the user has no cards when the screen loads

//we must get a randomCard from 2 - 13
//J will need to = to 10
//Q will need to = to 10
//K will need to = to 10
//Ace will need to = to 11
const getRandomCard = () => {
  let randomNumber = Math.ceil(Math.random() * 13);
  if (randomNumber === 1) {
    // so we will never get 1 or 11, 12 or 13
    return 11;
  } else if (randomNumber >= 11) {
    return 10;
  } else {
    return randomNumber;
  }
};
console.log(getRandomCard());

//we need an array to put the random cards into - it will start empty so there is nothing there when the page loads but when we click Start game we will push 2 random cards into the array
//! Both buttons will run a function called renderGame which will display the Cards: and Sum: and the sum will decide which message we want to display in the messageEl so we must do an if statement for this

const renderGame = () => {
  cardsEl.textContent = "Cards: "; // we want the space after
  //we want to display them in the cardsEl but in order to do this we must loop through the cards array and display each number with a space after it
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
    // the += will keep the Cards: from above
  }
  //we need to calculate the sum and display it in sumEl and it must be constantly adding to the sum so we must do +=
  sumEl.textContent = "Sum: " + sum;

  //we must do an if statement to show a different msg based on if we are still in the game or have blackjack or bust
  //the order of this is IMPORTANT
  if (sum > 21) {
    message = "You have gone Bust! - Start a new Game if you are brave enough";
    //we must set isAlive to false
    isAlive = false;
  } else if (sum === 21) {
    message = "Winner Winner Chicken Dinner!";
    //we must set hasBlackJack to true here or else the user will be able to click the start Game again
    hasBlackJack = true;
  } else {
    message = "Pick a New Card by clicking the New Card button";
  }
  messageEl.textContent = message;
};

const startGame = () => {
  isAlive = true; // b/c we start with it false
  let randomCard1 = getRandomCard();
  let randomCard2 = getRandomCard();
  console.log({ randomCard1, randomCard2 });

  cards = [randomCard1, randomCard2];
  sum = randomCard1 + randomCard2;
  renderGame();
};

const newCard = () => {
  //we only want the user to click a new card if isAlive is true and hasBlackJack is false
  if (isAlive && !hasBlackJack) {
    let anotherCard = getRandomCard();
    //we must add it to the sum with +=
    sum += anotherCard;
    //and then push it into the cards array
    cards.push(anotherCard);
    //then render the game which will display the Cards: and Sum: and the sum will decide which message we want to display in the messageEl
    renderGame();
  }
};

console.log(cards);
