const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const accountBalanceEl = document.getElementById("account-balance-el");

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let accountBalance = 1000;

accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

function getRandomCard() {
  let randomNumber = Math.ceil(Math.random() * 13);
  console.log(randomNumber);

  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber >= 11) {
    return 10;
  } else {
    return randomNumber;
  }
}

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  renderGame();
  accountBalance = accountBalance - 100;
  accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

  if (accountBalance <= 0) {
    accountBalanceEl.style.color = "red";
    accountBalanceEl.style.fontSize = "1.5rem";
    accountBalance = 0;
    messageEl.textContent = `Sorry, you have no money left in your account`;
    sum = "";
    cards = [];
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  sumEl.textContent = "Sum: " + sum;

  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message =
      "Wohoo! You've got Blackjack! We will now add $1000 to your account";
    hasBlackJack = true;
    accountBalance += 1000;
    renderGame();
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }

  messageEl.textContent = message;
}
function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
