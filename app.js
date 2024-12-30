const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const accountBalanceEl = document.getElementById("account-balance-el");

let cards = [];
let sum = 0;
let message = "";
let accountBalance = 1000;
let hasBlackJack = false;
let isAlive = false;

accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;

//!  ---------  EVENT LISTENERS  ----------
document.addEventListener("click", function (e) {
  if (e.target.id === "start-btn") {
    startGame();
  } else if (e.target.id === "new-card-btn") {
    newCard();
  }
});

//!  --------- FUNCTIONS FOR EVENT LISTENERS ----------

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  cardsEl.textContent += ` ${firstCard}  ${secondCard}`;
  accountBalance = accountBalance - 100;
  accountBalanceEl.textContent = `Account Balance: $${accountBalance}`;
  // if (accountBalance < 1) {
  //   accountBalanceEl.style.color = "red";
  //   messageEl.textContent += `Your account balance is 0. Your account balance is ${accountBalance}. You must top up your account if you wish to play a new game`;
  // }
  renderGame();
}

function newCard() {
  //stop it from working if you get blackJack or go BUST
  // only run it if isAlive = true && hasBlackjack = false
  if (isAlive && !hasBlackJack) {
    let newCard = getRandomCard();
    sum += newCard;
    renderGame();
    cards.push(newCard);
    cardsEl.textContent += ` ${newCard}`;
  }
}
//!  --------- OTHER FUNCTIONS ----------

function renderGame() {
  sumEl.textContent = `Sum: ${sum}`;
  cardsEl.textContent = `Cards: `;
  cards.forEach((card) => (cardsEl.textContent += card + " "));

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
    messageEl.style.color = "black";
  } else if (sum === 21) {
    messageEl.style.color = "green";
    message = `Congratulations, YOU HAVE BLACKJACK! We will add $1000 to your account the next time you play a new game.`;
    accountBalance += 1000; //! how come this doesn't show up in the account until I click the START GAME btn again??
    hasBlackJack = false;
    isAlive = false; //? or else user can choose a newCard
    //? BUT now when the user gets Blackjack they can't get a NEW CARD b/c is now True and we set up the newCard function to only work if the user !hasBlackJack - SO MUST WE CHANGE THIS TO hasBlackJack = false?? or maybe we reset the game but then we must set the account balance in local storage so it remembers the amount ???
  } else if (sum > 21 && accountBalance < 1) {
    accountBalanceEl.style.color = "red";
    messageEl.style.fontSize = "2rem";
    message = `You have gone BUST. Your account balance is ${accountBalance}. You must top up your account if you wish to play a new game`;
    isAlive = false;
  } else if (sum > 21 && accountBalance > 1) {
    messageEl.style.color = "black";
    message = `You have gone BUST. Try again if you are brave enough!`;
    isAlive = false;
  }
  messageEl.textContent = message;
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  //ace should be 11 and 10, Jack, Queen and Kind should be 10
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}
