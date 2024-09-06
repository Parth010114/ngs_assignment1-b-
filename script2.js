// Render HTML for the UI
const cardSymbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝'];
let cards = [...cardSymbols, ...cardSymbols]; // Duplicate the symbols to create pairs
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

function generateBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for(i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class = "card-front">${cards[i]}</div>
            <div class = "card-back">?</div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.append(card);
    }

};

function shuffleCards() {
    for(let i = cards.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i+1));
        [cards[i], cards[random]] = [cards[random], cards[i]];
    }
};

// Implement the flip logic

function flipCard() {
    if (lockBoard) { 
        return;
    }
    if (this === firstCard) {
        return;
    }
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
};

function unflipCards() {
    lockBoard = true;

    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();

};

// Allow one flip and no rotation

// Allow second flip and compare with the first flip

// Matching algorithm (No flip if matched) or (flip them back)

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    matchedPairs++;
    
    if (matchedPairs == cardSymbols.length) {
        alert('You win, Game over');
    }
};

function checkForMatch() {
    const match = firstCard.innerHTML === secondCard.innerHTML;

    if (match) {
        disableCards();
    } else {
        unflipCards();
    }
};

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
};

// Restart

function restartGame() {
    matchedPairs = 0;
    shuffleCards();
    generateBoard();
};

document.addEventListener('DOMContentLoaded', () => {
    shuffleCards();
    generateBoard();
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});
