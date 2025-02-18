const itemDisplay = document.getElementById('item-display');
const englishNameDisplay = document.getElementById('english-name');
const options = document.getElementById('options');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const answersButton = document.getElementById('answers-button');
const quitButton = document.getElementById('quit-button');

let currentItem;
let score = 0;
let round = 0;
let answers = [];
let askedItems = [];

const items = {
    "l'attache-tout": { image: "l'attache-tout.jpg", english: "binder clip" },
    "le pupitre": { image: "le pupitre.jpg", english: "desk" },
    "le papier": { image: "le papier.jpg", english: "paper" },
    "la poubelle": { image: "la poubelle.jpg", english: "trash can" },
    "l'agrafeuse": { image: "l'agrafeuse.jpg", english: "stapler" },
    "la chaise": { image: "le chaise.jpg", english: "chair" }, // Corrected filename
    "le dossier": { image: "le dossier.jpg", english: "folder" },
    "les ciseaux": { image: "les ciseaux.jpg", english: "scissors" },
    "la gomme": { image: "la gomme.jpg", english: "eraser" },
    "le stylo": { image: "le stylo.jpg", english: "pen" },
    "le livre": { image: "le livre.jpg", english: "book" },
    "le cahier": { image: "le cahier.jpg", english: "notebook" },
    "le bâton": { image: "le bâton.jpg", english: "stick" },
    "le tableau": { image: "le tabeau.jpg", english: "board" }, // Corrected filename
    "le crayon": { image: "le crayon.jpg", english: "pencil" }
};


function startGame() {
    round = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}/15`;
    feedback.textContent = "";
    answers = [];
    askedItems = [];
    startRound();
}

function startRound() {
    if (round >= 15) {
        endGame();
        return;
    }

    do {
        currentItem = Object.keys(items)[Math.floor(Math.random() * Object.keys(items).length)];
    } while (askedItems.includes(currentItem));

    askedItems.push(currentItem);

    const itemData = items[currentItem];
    itemDisplay.querySelector('img').src = `images/${itemData.image}`; // Correct path if "images" is in same directory
    englishNameDisplay.textContent = itemData.english;

    options.innerHTML = "";
    const allItems = Object.keys(items);
    const shuffledItems = shuffleArray(allItems);

    let optionsToShow = shuffledItems.slice(0, 3);
    if (!optionsToShow.includes(currentItem)) {
        const randomIndex = Math.floor(Math.random() * 3);
        optionsToShow[randomIndex] = currentItem;
    }

    optionsToShow.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item;
        button.addEventListener('click', () => checkAnswer(item));
        options.appendChild(button);
    });
}

function checkAnswer(guess) {
    const isCorrect = guess === currentItem;

    answers.push({ item: currentItem, userAnswer: guess, isCorrect });

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = `Score: ${score}/15`;
        feedback.textContent = "Correct! (Correct!)";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrect. La bonne réponse est ${currentItem}. (Incorrect. The correct answer is ${currentItem})`;
        feedback.style.color = "red";
    }
    round++;

    if (round < 15) {
        setTimeout(startRound, 1500);
    } else {
        endGame();
    }
}

function endGame() {
    feedback.textContent = `Game Over! Score final: ${score}/15 (Game Over! Final Score: ${score}/15)`;
    feedback.style.color = "black";
    restartButton.style.display = "inline-block";
    answersButton.style.display = "inline-block";
    quitButton.style.display = "inline-block";
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

answersButton.addEventListener('click', () => {
    const answersText = answers.map(ans => `${ans.item} (${items[ans.item].english}): Your answer: ${ans.userAnswer}, ${ans.isCorrect ? 'Correct' : 'Incorrect'}`).join("<br>");
    feedback.innerHTML = `Answers: <br>${answersText}`;
    feedback.style.color = "blue";
});

quitButton.addEventListener('click', () => {
    window.location.href = "index.html";
});

restartButton.addEventListener('click', startGame);

startGame();