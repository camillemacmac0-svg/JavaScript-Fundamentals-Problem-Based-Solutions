let cards = [];
let currentIndex = 0;
let isShowAllMode = false;
let lastIndex = 0;
let flipCount = 0;

const flashcard = document.getElementById('flashcard');
const termElement = document.getElementById('current-term');
const definitionElement = document.getElementById('current-definition');
const knowBtn = document.getElementById('know-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const reviewBtn = document.getElementById('review-btn');
const form = document.getElementById('add-card-form');
const progressBar = document.getElementById('progress-bar');
const masteryPercentage = document.getElementById('mastery-percentage');
const wordsLearnedElement = document.getElementById('words-learned');
const totalWordsElement = document.getElementById('total-words');


function loadData() {
    cards = [
        { term: "agua", definition: "water", learned: false, markedUnmastered: false },
        { term: "gato", definition: "cat", learned: false, markedUnmastered: false },
        { term: "luna", definition: "moon", learned: false, markedUnmastered: false },
        { term: "perro", definition: "dog", learned: false, markedUnmastered: false },
        { term: "amigo", definition: "friend", learned: false, markedUnmastered: false },
        { term: "casa", definition: "house", learned: false, markedUnmastered: false }
    ];

    saveData();
    updateProgress();
    arrangeCardOrder();
    showCard();
}

function saveData() {
    localStorage.setItem('flashcards', JSON.stringify(cards));
    updateProgress();
}

function updateProgress() {
    const total = cards.length;
    const learned = cards.filter(card => card.learned === true).length;
    const percentage = total > 0
        ? Math.round((learned / total) * 100)
        : 0;

    progressBar.style.width = `${percentage}%`;
    masteryPercentage.textContent = `${percentage}%`;
    wordsLearnedElement.textContent = learned;
    totalWordsElement.textContent = total;
}

function arrangeCardOrder() {

    const notTouched = cards.filter(card =>
        card.markedUnmastered === false &&
        card.learned === false
    );

    const unmastered = cards.filter(card =>
        card.markedUnmastered === true
    );

    const mastered = cards.filter(card =>
        card.learned === true
    );

    cards = [...notTouched, ...unmastered, ...mastered];
}

function showCard() {

    flashcard.style.display = "block";

    const oldScreen = document.getElementById("status-screen");
    if (oldScreen) oldScreen.remove();

    if (cards.length === 0) {
        termElement.textContent = "No cards yet";
        definitionElement.textContent =
            "Add some words to start learning!";
        return;
    }

    if (isShowAllMode) {

        const currentCard = cards[currentIndex];

        termElement.textContent = currentCard.term;
        definitionElement.textContent =
            currentCard.definition;

        flashcard.classList.remove('card-flipped');
        flipCount = 0;

        return;
    }
const notTouched = cards.filter(card =>
        card.markedUnmastered === false &&
        card.learned === false
    );

    const allLearned =
        cards.length > 0 &&
        cards.every(card => card.learned === true);

    if (notTouched.length === 0) {

        flashcard.style.display = "none";

        let screen =
            document.getElementById("status-screen");

        if (!screen) {

            screen = document.createElement("div");
            screen.id = "status-screen";

            screen.style.width = "90%";
            screen.style.maxWidth = "750px";
            screen.style.height = "220px";
            screen.style.margin = "15px auto";

            screen.style.background = "#ffffff";
            screen.style.borderRadius = "8px";
            screen.style.border = "2px solid #ef4444";

            screen.style.display = "flex";
            screen.style.flexDirection = "column";
            screen.style.justifyContent = "center";
            screen.style.alignItems = "center";

            screen.style.boxShadow =
                "0 2px 5px rgba(0,0,0,0.1)";

            flashcard.parentNode.insertBefore(
                screen,
                flashcard
            );
        }

        


        





    
document.addEventListener('DOMContentLoaded', loadData);
