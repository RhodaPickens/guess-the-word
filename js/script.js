//selects unordered list where guessed letters appear
const guessed = document.querySelector(".guessed-letters");
//selects Guess button
const guessButton = document.querySelector(".guess");
//selects text input
const letterInput = document.querySelector(".letter");
//selects empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
//selects paragraph where remaining guesses will display
const remaining = document.querySelector(".remaining");
//selects span inside paragraph where remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
//selects empty paragraph where messages appear when player guesses a letter
const message = document.querySelector(".message");
//selects hidden button prompting player to play again
const playAgainButton = document.querySelector(".play-again");

//first word to guess
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];
    const trimmedWord = randomWord.trim();
    word = trimmedWord;
    placeholder(word);
};

//function to add placeholders for each letter
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
        wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

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
            countGuessesRemaining(letter);
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

//Count guesses remaining
function countGuessesRemaining(guess) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)) {
        message.innerText = `Success! The word has the letter ${guess}`;
    } else {
        message.innerText = `Sorry, the word does not contain the letter ${guess}.`;
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `The game is over! The word was <span class="highlight">${word}</span>.`;
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Check if the player has won
function checkIfWon() {
 if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
 }
};



