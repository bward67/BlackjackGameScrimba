const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const accountBalanceEl = document.getElementById("account-balance-el");
const cardDetailsEl = document.getElementById("card-details");

let cards = [];
let sum = 0;
let message = "";
let accountBalance = 1000;

document.getElementById("new-card-btn").disabled = true;

accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

//!  ---------  EVENT LISTENERS  ----------
document.addEventListener("click", function (e) {
  if (e.target.id === "start-btn") {
    handleStartGame();
  } else if (e.target.id === "new-card-btn") {
    handleNewCard();
  } else if (e.target.id === "close-btn") {
    handleCloseBtn();
  } else if (e.target.id === "top-up-btn") {
    handleTopUp();
  }
});

cardDetailsEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(cardDetailsEl);
  messageEl.style.color = "white";
  messageEl.style.backgroundColor = "transparent";

  messageEl.textContent = " Want to play a round? Each round costs $100";

  cardDetailsEl.style.display = "none";

  document.getElementById("confirmation-note").style.display = "block";

  document.getElementById("confirmation-note").textContent = `${formData.get(
    "name"
  )}, you have successfully added $${formData.get("amount")} to your account.`;

  setInterval(function () {
    document.getElementById("confirmation-note").style.display = "none";
  }, 3000);
  messageEl.style.color = "white";
  messageEl.style.backgroundColor = "transparent";

  messageEl.textContent = " Want to play a round? Each round costs $100";
  sum = 0;
  cards = [];
  cardsEl.textContent = `Cards: ${cards}`;
  sumEl.textContent = `Sum: `;
  // console.log({ cards, sum });

  accountBalance += Number(formData.get("amount"));
  accountBalanceEl.style.color = "rgb(164, 162, 162)";
  accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

  document.getElementById("new-card-btn").disabled = true;
  document.getElementById("start-btn").disabled = false;
});

//!  --------- FUNCTIONS FOR EVENT LISTENERS ----------

function handleStartGame() {
  document.getElementById("confirmation-note").style.display = "none";

  document.getElementById("start-btn").disabled = false;
  document.getElementById("new-card-btn").disabled = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  cardsEl.textContent += ` ${firstCard}  ${secondCard}`;
  messageEl.style.color = "white";

  if (accountBalance < 0) {
    accountBalance = 0;
  } else if (accountBalance > 0) {
    accountBalance = accountBalance - 100;
  } else if (accountBalance === 0) {
    cardDetailsEl.style.display = "flex";
  }

  accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

  renderGame();
}

function handleNewCard() {
  let newCard = getRandomCard();
  sum += newCard;
  renderGame();
  cards.push(newCard);
  cardsEl.textContent += ` ${newCard}`;
}

function handleCloseBtn() {
  cardDetailsEl.style.display = "none";
}

function handleTopUp() {
  cardDetailsEl.style.display = "flex";
}
//!  --------- OTHER FUNCTIONS ----------

function renderGame() {
  sumEl.textContent = `Sum: ${sum}`;
  cardsEl.textContent = `Cards: `;
  cards.forEach((card) => (cardsEl.textContent += card + " "));

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    if (accountBalance > 1) {
      messageEl.style.color = "yellow";

      message = `Congratulations, YOU HAVE BLACKJACK! We have added $1000💰️ to your account.`;

      accountBalance += 1000;
      accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

      document.getElementById("new-card-btn").disabled = true;
      document.getElementById("start-btn").disabled = false;

      cards = [];
      sum = 0;
    } else if (accountBalance < 1) {
      messageEl.style.color = "yellow";

      message = `Congratulations, YOU HAVE BLACKJACK! We have added $1000💰️ to your account.`;
      accountBalance += 1000;
      accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

      document.getElementById("new-card-btn").disabled = true;
      document.getElementById("start-btn").disabled = false;
    }
  } else if (sum > 21) {
    if (accountBalance <= 0) {
      accountBalance = 0; // so we can't go into negative numbers

      accountBalanceEl.style.color = "red";
      messageEl.style.color = "white";
      messageEl.style.backgroundColor = "red";
      messageEl.style.padding = "1rem";
      message = `You have gone BUST & your account balance is ${accountBalance}. You must top up your account if you wish to play a new game.`;

      document.getElementById("start-btn").disabled = true;
      document.getElementById("new-card-btn").disabled = true;

      cardDetailsEl.style.display = "flex";
    } else if (accountBalance > 1) {
      messageEl.style.fontSize = "1.3rem";
      message = `You have gone BUST. Try again if you are brave enough!`;

      document.getElementById("new-card-btn").disabled = true;
    }
  }
  messageEl.textContent = message;
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  //ace should be 11 and 10, Jack, Queen and King should be 10
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 9) {
    return 10;
  } else {
    return randomNumber;
  }
}

//? THINGS STILL TO DO:

//! set up local Storage for accountBalance
