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


document.addEventListener('DOMContentLoaded', loadData);
