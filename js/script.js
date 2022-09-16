//selects unordered list where guessed letters appear
const guessed = document.querySelector(".guessed-letters");
//selects Guess button
const guessButton = document.querySelector(".guess");
//selects text input
const letterInput = document.querySelector(".letter");
//selects empty paragraph for word in progress
const progress = document.querySelector(".word-in-progress");
//selects span inside paragraph where remaining guesses will display
const remaining = document.querySelector("span .remaining");
//selects empty paragraph where messages appear when player guesses a letter
const message = document.querySelector(".message");
//selects hidden button prompting player to play again
const playAgainButton = document.querySelector(".play-again");
//first word to guess
const word = "magnolia";
const guessedLetters = [];

//function to add placeholders for each letter

const placeholder = function (word) {
    progress.innerText = "";
    for (let i=0; i < word.length; i++) {
        progress.innerText = progress.innerText + "●";
    } 
};

placeholder(word);

//event handler for Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const playerInput = letterInput.value;
    console.log(playerInput);
    letterInput.value = "";
    message.innerText = "";
    const validationResult = validate(playerInput);
    console.log(validationResult);
    if (validationResult) {
        makeGuess(validationResult);
    }
});

//function to validate player's input
function validate(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Only enter one letter at a time";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Use letters - no special characters";
    } else return input;
}

//function to capture input
function makeGuess(letter) {
    letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter - please try again";
    } else {guessedLetters.push(letter);}
    console.log(guessedLetters);
};


