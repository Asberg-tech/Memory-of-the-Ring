/**
 * Memory of the Ring - A fantasy-themed memory card game
 * 
 * This game was developed with assistance from AI (Claude) to create
 * an engaging memory game experience with a fantasy theme.
 * 
 * The game features:
 * - 16 cards (8 pairs) with fantasy character images
 * - Card flip animations
 * - Move counter and timer
 * - Responsive design
 * 
 * @author Your Name
 * @version 1.0.0
 * @created 2024
 */

class MemoryGame {
    /**
     * Initializes a new instance of the Memory Game
     * Sets up the game board and binds necessary event listeners
     */
    constructor() {
        // Game state variables
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameStarted = false;
        this.timer = null;
        this.seconds = 0;

        // Cache DOM elements for better performance
        this.gameBoard = document.querySelector('.game-board');
        this.movesCount = document.getElementById('moves-count');
        this.timeElement = document.getElementById('time');
        this.resetButton = document.getElementById('reset-button');

        // Bind event listeners
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    /**
     * Initializes the game by creating and shuffling cards
     * Sets up the initial game state
     */
    initializeGame() {
        // Define card data with image paths
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

        // Create pairs of cards and shuffle them
        this.cards = [...cardData, ...cardData];
        this.shuffleCards();
        this.renderCards();
    }

    /**
     * Shuffles the cards array using the Fisher-Yates algorithm
     * Ensures random card placement each game
     */
    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    /**
     * Renders the cards on the game board
     * Creates card elements with front and back faces
     */
    renderCards() {
        this.gameBoard.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index;

            // Create card HTML structure
            cardElement.innerHTML = `
                <div class="card-front">
                    <img src="${card.imagePath}" alt="card front">
                </div>
                <div class="card-back"></div>
            `;

            // Add click handler
            cardElement.addEventListener('click', () => this.flipCard(index));
            this.gameBoard.appendChild(cardElement);
        });
    }

    /**
     * Handles card flip logic
     * Starts timer on first flip and checks for matches
     * @param {number} index - The index of the clicked card
     */
    flipCard(index) {
        // Start timer on first card flip
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }

        const card = this.gameBoard.children[index];

        // Prevent flipping if card is already flipped or two cards are showing
        if (card.classList.contains('flipped') || this.flippedCards.length >= 2) return;

        card.classList.add('flipped');
        this.flippedCards.push({ index, id: this.cards[index].id });

        // Check for match when two cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesCount.textContent = this.moves;
            this.checkMatch();
        }
    }

    /**
     * Checks if two flipped cards match
     * Updates game state and handles card visibility
     */
    checkMatch() {
        const [firstCard, secondCard] = this.flippedCards;
        const match = firstCard.id === secondCard.id;

        if (match) {
            this.matchedPairs++;
            this.flippedCards = [];

            // Check for game completion
            if (this.matchedPairs === this.cards.length / 2) {
                this.endGame();
            }
        } else {
            // Flip cards back after delay if no match
            setTimeout(() => {
                const firstCardElement = this.gameBoard.children[firstCard.index];
                const secondCardElement = this.gameBoard.children[secondCard.index];

                firstCardElement.classList.remove('flipped');
                secondCardElement.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }

    /**
     * Starts the game timer
     * Updates display every second
     */
    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            const minutes = Math.floor(this.seconds / 60);
            const remainingSeconds = this.seconds % 60;
            this.timeElement.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }, 1000);
    }

    /**
     * Handles game completion
     * Stops timer and shows completion message
     */
    endGame() {
        clearInterval(this.timer);
        setTimeout(() => {
            alert(`Congratulations! You won in ${this.moves} moves and ${this.seconds} seconds!`);
        }, 500);
    }

    /**
     * Resets the game state
     * Clears timer, moves, and rebuilds the board
     */
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

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new MemoryGame();
    game.initializeGame();
}); 