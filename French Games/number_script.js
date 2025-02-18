const numberDisplay = document.getElementById('number-display');
const options = document.getElementById('options');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const answersButton = document.getElementById('answers-button');
const quitButton = document.getElementById('quit-button');
const clickModeButton = document.getElementById('click-mode-button');
const typeModeButton = document.getElementById('type-mode-button');

let currentNumber;
let score = 0;
let round = 0;
let gameMode = "click"; // Default mode
let answers = []; // Store answers for "See Answers"
let askedNumbers = []; // Keep track of numbers already asked

const numbers = {
    1: "un", 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six", 7: "sept", 8: "huit", 9: "neuf", 10: "dix",
    11: "onze", 12: "douze", 13: "treize", 14: "quatorze", 15: "quinze", 16: "seize", 17: "dix-sept",
    18: "dix-huit", 19: "dix-neuf", 20: "vingt", 21: "vingt-et-un", 22: "vingt-deux", 23: "vingt-trois",
    24: "vingt-quatre", 25: "vingt-cinq", 26: "vingt-six", 27: "vingt-sept", 28: "vingt-huit",
    29: "vingt-neuf", 30: "trente", 31: "trente-et-un"
};

function startGame() {
    round = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}/10`;
    feedback.textContent = "";
    answers = []; // Clear previous answers
    askedNumbers = []; // Clear asked numbers

    if (gameMode === "click") {
        options.innerHTML = "";
    } else {
        options.innerHTML = `
            <input type="text" id="answer-input" placeholder="Type your answer... (Écrivez votre réponse...)">
            <button id="submit-button">Submit (Soumettre)</button>`;
        const answerInput = document.getElementById('answer-input');
        const submitButton = document.getElementById('submit-button');

        submitButton.addEventListener('click', checkAnswer);
    }

    startRound();
}

function startRound() {
    if (round >= 10) {
        endGame();
        return;
    }

    // Generate a new number that hasn't been asked yet
    do {
        currentNumber = Math.floor(Math.random() * 31) + 1;
    } while (askedNumbers.includes(currentNumber));

    askedNumbers.push(currentNumber); // Add the number to the asked list

    numberDisplay.textContent = currentNumber;

    if (gameMode === "click") {
        options.innerHTML = "";

        const allNumbers = Object.values(numbers);
        const shuffledNumbers = shuffleArray(allNumbers);

        let optionsToShow = shuffledNumbers.slice(0, 3);
        const correctAnswer = numbers[currentNumber];
        if (!optionsToShow.includes(correctAnswer)) {
            const randomIndex = Math.floor(Math.random() * 3);
            optionsToShow[randomIndex] = correctAnswer;
        }

        optionsToShow.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.addEventListener('click', () => checkAnswer(number));
            options.appendChild(button);
        });
    } else {
        const answerInput = document.getElementById('answer-input');
        answerInput.value = "";
        answerInput.focus();
    }
}

function checkAnswer(guess) {
    let userAnswer;
    if (gameMode === "click") {
        userAnswer = guess;
    } else {
        const answerInput = document.getElementById('answer-input');
        userAnswer = answerInput.value.trim().toLowerCase();
    }

    const correctAnswer = numbers[currentNumber];
    const isCorrect = userAnswer === correctAnswer;

    answers.push({ number: currentNumber, userAnswer, correctAnswer, isCorrect }); // Store the answer

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = `Score: ${score}/10`;
        feedback.textContent = "Correct! (Correct!)";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrect. La bonne réponse est ${correctAnswer}. (Incorrect. The correct answer is ${correctAnswer})`;
        feedback.style.color = "red";
    }
    round++;

    // *** KEY CHANGE: Automatically go to next round ***
    if (round < 10) {
        setTimeout(startRound, 1500); // Delay before next question
    } else {
        endGame();
    }
}

function endGame() {
    feedback.textContent = `Game Over! Score final: ${score}/10 (Game Over! Final Score: ${score}/10)`;
    feedback.style.color = "black";
    restartButton.style.display = "inline-block";
    answersButton.style.display = "inline-block";
    quitButton.style.display = "inline-block";
}

function shuffleArray(array) { // Fisher-Yates shuffle
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}


answersButton.addEventListener('click', () => {
    const answersText = answers.map(ans => `${ans.number}: Your answer: ${ans.userAnswer}, Correct answer: ${ans.correctAnswer}, ${ans.isCorrect ? 'Correct' : 'Incorrect'}`).join("<br>");
    feedback.innerHTML = `Answers: <br>${answersText}`;
    feedback.style.color = "blue";
});

quitButton.addEventListener('click', () => {
    window.location.href = "index.html";
});

clickModeButton.addEventListener('click', () => {
    gameMode = "click";
    startGame();
});

typeModeButton.addEventListener('click', () => {
    gameMode = "type";
    startGame();
});

restartButton.addEventListener('click', startGame);

startGame();