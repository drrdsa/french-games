const colorBox = document.getElementById('color-box');
const options = document.getElementById('options');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const answersButton = document.getElementById('answers-button');
const quitButton = document.getElementById('quit-button');

const colors = {
    "red": "rouge", "blue": "bleu", "green": "vert", "yellow": "jaune",
    "black": "noir", "white": "blanc", "purple": "violet", "orange": "orange",
    "pink": "rose", "brown": "marron"
};

let currentKey;
let score = 0;
let round = 0;

function startGame() {
    round = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}/10`;
    feedback.textContent = "";
    startRound();
}

function startRound() {
    if (round >= 10) {
        endGame();
        return;
    }

    currentKey = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
    const correctColor = colors[currentKey];

    colorBox.style.backgroundColor = currentKey;
    options.innerHTML = ""; // Clear previous options

    const allColors = Object.values(colors);
    const shuffledColors = shuffleArray(allColors); // Shuffle for random options

    // *** Key Change: Ensure Correct Answer is Present ***
    let optionsToShow = shuffledColors.slice(0, 3); // Take 3 random colors

    if (!optionsToShow.includes(correctColor)) {
        // Replace one of the random colors with the correct answer
        const randomIndex = Math.floor(Math.random() * 3); // Random index among the 3
        optionsToShow[randomIndex] = correctColor;
    }

    optionsToShow.forEach(color => {
        const button = document.createElement('button');
        button.textContent = color;
        button.addEventListener('click', () => checkAnswer(color));
        options.appendChild(button);
    });
}

function checkAnswer(guess) {
    if (guess === colors[currentKey]) {
        score++;
        scoreDisplay.textContent = `Score: ${score}/10`;
        feedback.textContent = "Correct! (Correct!)";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrect. La bonne réponse est ${colors[currentKey]}. (Incorrect. The correct answer is ${colors[currentKey]}.`;
        feedback.style.color = "red";
    }
    round++;
    setTimeout(startRound, 1500); // Delay for feedback
}

function endGame() {
    feedback.textContent = `Game Over! Score final: ${score}/10 (Game Over! Final Score: ${score}/10)`;
    feedback.style.color = "black";
    restartButton.style.display = "inline-block";
    answersButton.style.display = "inline-block";
    quitButton.style.display = "inline-block";
}
answersButton.addEventListener('click', () => {
    const answers = Object.entries(colors).map(([english, french]) => `${english}: ${french}`).join("<br>");
    feedback.innerHTML = `Réponses(Answers): <br>${answers}`; // Use innerHTML for <br> tags
    feedback.style.color = "blue";
});

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

restartButton.addEventListener('click', startGame);
answersButton.addEventListener('click', () => {
  
});
quitButton.addEventListener('click', () => {
    window.location.href = "index.html"; // Redirect to main page
});

startGame(); // Initialize the game