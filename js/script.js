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

//function to add placeholders for each letter

const placeholder = function (word) {
    progress.innerText = "";
    for (let i=0; i < word.length; i++) {
        progress.innerText = progress.innerText + "●";
    } 
};

placeholder(word);

//event listener for text input and Guess button

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const input = letterInput.value;
    console.log(input);
    letterInput.value = "";
});

 