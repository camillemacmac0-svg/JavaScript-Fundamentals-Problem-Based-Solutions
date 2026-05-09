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

        if (allLearned) {

            screen.innerHTML = `

                    <div style="
                        font-size:1.2rem;
                        color:#1e40af;
                        line-height:1.6;
                    ">
                        📚 Add new words to continue learning<br><br>
                        🔄 Use <strong>Review Unmastered</strong> anytime
                    </div>
                </div>
            `;

        } else {

            screen.innerHTML = `
                <div style="text-align:center;padding:10px;">
                    <div style="
                        font-size:2rem;
                        font-weight:bold;
                        color:#dc2626;
                        margin-bottom:15px;
                    ">
                        📖 You Haven't Mastered<br>
                        All Words Yet
                    </div>

                    <div style="

                     <div style="
                        font-size:1.2rem;
                        color:#1e40af;
                        line-height:1.6;
                    ">
                        Click <strong>"Review Unmastered"</strong><br>
                        to continue learning your words.
                    </div>
                </div>
            `;
        }

        flashcard.classList.remove('card-flipped');
        flipCount = 0;

        return;
    }
    
currentIndex = 0;

    const currentCard = cards[currentIndex];

    termElement.textContent = currentCard.term;
    definitionElement.textContent =
        currentCard.definition;

    flashcard.classList.remove('card-flipped');
    flipCount = 0;
}

function showOnlySelectedUnmastered() {

    const unmasteredList = cards.filter(card =>
        card.markedUnmastered === true
    );

    if (unmasteredList.length === 0) {

        const allLearned =
            cards.every(card => card.learned === true);

        if (allLearned) {

            alert(
                "🎉 You have already mastered all words!\n\nPlease add new words to continue learning."
            );

        } else {

            alert(
                "⚠️ You have no unmastered words yet!\n\nPlease click 'NOT MASTERED' on the words you want to review."
            );
        }

        return;
    }

    alert(
        "📖 You haven't mastered all words yet.\nLet's review them now!"
    );

    flashcard.style.display = 'none';

    const oldContainer =
        document.getElementById('all-words-container');

    if (oldContainer) oldContainer.remove();

    const allContainer =
        document.createElement('div');

    allContainer.id = 'all-words-container';

    allContainer.style.display = 'grid';
    allContainer.style.gridTemplateColumns = '1fr 1fr';
    allContainer.style.gap = '15px';
    allContainer.style.padding = '20px';

    flashcard.parentNode.insertBefore(
        allContainer,
        flashcard.nextSibling
    );

    unmasteredList.forEach((card) => {

        const wordBox =
            document.createElement('div');

        wordBox.style.background = 'white';
        wordBox.style.padding = '15px';
        wordBox.style.borderRadius = '10px';
        wordBox.style.boxShadow =
            '0 2px 5px rgba(0,0,0,0.1)';

        wordBox.innerHTML = `<strong>${card.term}</strong>`;

        wordBox.style.cursor = 'pointer';

        wordBox.onclick = function() {

            isShowAllMode = true;

            flashcard.style.display = 'block';

            allContainer.remove();

            reviewBtn.textContent =
                "Review Unmastered";

            reviewBtn.style.background = "#ef4444";

            currentIndex = cards.findIndex(
                c => c.term === card.term
            );

if (currentIndex < 0) currentIndex = 0;

            showCard();
        };

        allContainer.appendChild(wordBox);
    });

    reviewBtn.textContent = "Back to Normal";
    reviewBtn.style.background = "#6b7280";

    isShowAllMode = true;
}

flashcard.addEventListener('click', () => {

    if (flipCount === 0) {

        flashcard.classList.add('card-flipped');
        flipCount = 1;

    } else if (flipCount === 1) {

        flashcard.classList.remove('card-flipped');
        flipCount = 2;

    } })

knowBtn.addEventListener('click', () => {

    if (cards.length === 0) return;

    if (!cards[currentIndex].learned) {

        cards[currentIndex].learned = true;
        cards[currentIndex].markedUnmastered = false;

        saveData();
        arrangeCardOrder();
    }

    const allLearned =
        cards.every(card => card.learned === true);

    if (allLearned) {
 termElement.textContent =
            "🎉 You mastered all words!";

        definitionElement.textContent =
            "📚 Add new words to learn more\n👇 Tap here to review all words";

        flashcard.classList.remove('card-flipped');

        isShowAllMode = false;

        return;
    }

    showCard();
});

nextBtn.addEventListener('click', () => {

    if (cards.length > 0) {

        cards[currentIndex].learned = false;
        cards[currentIndex].markedUnmastered = true;

        saveData();
        arrangeCardOrder();

        showCard();
    }
});

shuffleBtn.addEventListener('click', () => {

    for (let i = cards.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [cards[i], cards[j]] =
            [cards[j], cards[i]];
    }

    currentIndex = 0;

    showCard();
});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const term =
        document.getElementById('term-input')
        .value.trim();

    const definition =
        document.getElementById('definition-input')
        .value.trim();

    if (term && definition) {

        cards.push({
            term: term,
            definition: definition,
            learned: false,
            markedUnmastered: false
        });

        saveData();

        form.reset();

        arrangeCardOrder();

        currentIndex = 0;

        showCard();
    }
});





document.addEventListener('DOMContentLoaded', loadData);
