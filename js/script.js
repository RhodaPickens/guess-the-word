//selects unordered list where guessed letters appear
const guessed = document.querySelector(".guessed-letters");
//selects Guess button
const guessButton = document.querySelector(".guess");
//selects text input
const letterInput = document.querySelector(".letter");
//selects empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
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
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
        wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//event handler for Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const playerInput = letterInput.value;
    const validationResult = validate(playerInput);
    if (validationResult) {
        makeGuess(playerInput);
    }
    letterInput.value = "";
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
    } else {
        return input;
    }
};

//function to capture input
function makeGuess(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter - please try again";
    } else {guessedLetters.push(letter);
            displayGuessed();
            updateWordInProgress(guessedLetters);
            }
};

//function to update guessed letters
function displayGuessed() {
    guessed.innerHTML = "";
    guessedLetters.forEach(function (letter) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    })
};

//function to update the word in progress
function updateWordInProgress(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const correctArray = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            correctArray.push(letter.toUpperCase());
        } else {
            correctArray.push("●");
        }
    wordInProgress.innerText = correctArray.join("");
    checkIfWon();
    }; 
}

//Check if the player has won
function checkIfWon() {
 if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
 }
};

