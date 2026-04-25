let cards = [];
let currentIndex = 0;

const flashcard = document.getElementById('flashcard');
const termElement = document.getElementById('current-term');
const definitionElement = document.getElementById('current-definition');
const knowBtn = document.getElementById('know-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const form = document.getElementById('add-card-form');
const progressBar = document.getElementById('progress-bar');
const masteryPercentage = document.getElementById('mastery-percentage');
const wordsLearnedElement = document.getElementById('words-learned');
const totalWordsElement = document.getElementById('total-words');

function loadData() {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
        cards = JSON.parse(savedCards);
    } else {
    
 cards = [
            { term: "gato", definition: "cat", learned: false },
            { term: "perro", definition: "dog", learned: false },
            { term: "casa", definition: "house", learned: false },
            { term: "libro", definition: "book", learned: false }
        ];
        saveData();
    }
    updateProgress();
    showCard();
}
