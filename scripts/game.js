class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameStarted = false;
        this.timer = null;
        this.seconds = 0;

        // DOM elements
        this.gameBoard = document.querySelector('.game-board');
        this.movesCount = document.getElementById('moves-count');
        this.timeElement = document.getElementById('time');
        this.resetButton = document.getElementById('reset-button');

        // Bind event listeners
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    initializeGame() {
        // Card data with image paths
        const cardData = [
            { id: 1, imagePath: '../images/frodo.png' },
            { id: 2, imagePath: '../images/gandalf.png' },
            { id: 3, imagePath: '../images/aragorn.png' },
            { id: 4, imagePath: '../images/legolas.png' },
            { id: 5, imagePath: '../images/sauron.png' },
            { id: 6, imagePath: '../images/gollum.png' },
            { id: 7, imagePath: '../images/ring.png' },
            { id: 8, imagePath: '../images/gimli.png' }
        ];

        // Double the cards to create pairs
        this.cards = [...cardData, ...cardData];
        this.shuffleCards();
        this.renderCards();
    }

    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    renderCards() {
        this.gameBoard.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index;

            cardElement.innerHTML = `
                <div class="card-front">
                    <img src="${card.imagePath}" alt="card front">
                </div>
                <div class="card-back"></div>
            `;

            cardElement.addEventListener('click', () => this.flipCard(index));
            this.gameBoard.appendChild(cardElement);
        });
    }

    flipCard(index) {
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }

        const card = this.gameBoard.children[index];

        // Return if card is already flipped or matched
        if (card.classList.contains('flipped') || this.flippedCards.length >= 2) return;

        card.classList.add('flipped');
        this.flippedCards.push({ index, id: this.cards[index].id });

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesCount.textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [firstCard, secondCard] = this.flippedCards;
        const match = firstCard.id === secondCard.id;

        if (match) {
            this.matchedPairs++;
            this.flippedCards = [];

            if (this.matchedPairs === this.cards.length / 2) {
                this.endGame();
            }
        } else {
            setTimeout(() => {
                const firstCardElement = this.gameBoard.children[firstCard.index];
                const secondCardElement = this.gameBoard.children[secondCard.index];

                firstCardElement.classList.remove('flipped');
                secondCardElement.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            const minutes = Math.floor(this.seconds / 60);
            const remainingSeconds = this.seconds % 60;
            this.timeElement.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        setTimeout(() => {
            alert(`Congratulations! You won in ${this.moves} moves and ${this.seconds} seconds!`);
        }, 500);
    }

    resetGame() {
        clearInterval(this.timer);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.seconds = 0;
        this.gameStarted = false;
        this.movesCount.textContent = '0';
        this.timeElement.textContent = '00:00';
        this.initializeGame();
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new MemoryGame();
    game.initializeGame();
}); 