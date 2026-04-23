// App State
let cards = [];
let currentIndex = 0;

// DOM Elements
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

// Load data from localStorage
function loadData() {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
        cards = JSON.parse(savedCards);
    } else {
        // Default cards
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

// Save data to localStorage
function saveData() {
    localStorage.setItem('flashcards', JSON.stringify(cards));
    updateProgress();
}

// Update progress display
function updateProgress() {
    const total = cards.length;
    const learned = cards.filter(card => card.learned).length;
    const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;
    
    progressBar.style.width = `${percentage}%`;
    masteryPercentage.textContent = `${percentage}%`;
    wordsLearnedElement.textContent = learned;
    totalWordsElement.textContent = total;
}

// Show current card
function showCard() {
    if (cards.length === 0) {
        termElement.textContent = "No cards yet";
        definitionElement.textContent = "Add some words to start learning!";
        return;
    }
    
    const currentCard = cards[currentIndex];
    termElement.textContent = currentCard.term;
    definitionElement.textContent = currentCard.definition;
    
    // Reset card flip state
    flashcard.classList.remove('card-flipped');
}

// Flip card
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('card-flipped');
});

// Mark as known
knowBtn.addEventListener('click', () => {
    if (cards.length > 0) {
        cards[currentIndex].learned = true;
        saveData();
        nextCard();
    }
});

// Next card
nextBtn.addEventListener('click', nextCard);

function nextCard() {
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    showCard();
}

// Shuffle cards
shuffleBtn.addEventListener('click', () => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    currentIndex = 0;
    showCard();
});

// Add new card
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = document.getElementById('term-input').value.trim();
    const definition = document.getElementById('definition-input').value.trim();
    
    if (term && definition) {
        cards.push({
            term: term,
            definition: definition,
            learned: false
        });
        
        saveData();
        form.reset();
        showCard();
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', loadData);

