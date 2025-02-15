/**
 * Memory of the Ring - A fantasy-themed memory card game
 * 
 * AI Assistance Documentation:
 * This game was developed with the help of AI in several key areas:
 * 1. Architecture: AI helped design the class structure and separation of concerns
 * 2. Optimization: AI suggested performance improvements like DOM caching and event delegation
 * 3. Animation: AI provided guidance on efficient CSS transforms and hardware acceleration
 * 4. Testing: AI assisted in identifying edge cases and potential bugs
 * 
 * All AI suggestions were manually reviewed and implemented with human oversight.
 * The game's creative direction and final implementation decisions were made by the developer.
 * 
 * The game features:
 * - 16 cards (8 pairs) with fantasy character images
 * - Card flip animations
 * - Move counter and timer
 * - Responsive design
 * 
 * Implementation Note:
 * Both Card and MemoryGame classes are kept in the same file for simplicity
 * and to avoid CORS (Cross-Origin Resource Sharing) issues when running directly
 * from the file system. While it would be more modular to split these into
 * separate files using ES6 modules (import/export), this would require:
 * 1. Setting up a local web server
 * 2. Using the http/https protocol instead of file://
 * 3. Proper CORS configuration
 * 
 * For easy local development and testing, keeping everything in one file
 * allows the game to run by simply opening index.html in a browser.
 * 
 * @author Niklas Åsberg
 * @version 1.0.0
 * @created 2025-
 */

/**
 * Represents a single card in the memory game
 */
class Card {
    /**
     * Creates a new Card instance
     * @param {number} id - Unique identifier for matching pairs
     * @param {string} imagePath - Path to the card's image
     * @param {string} name - Name of the character/item
     */
    constructor(id, imagePath, name) {
        this.id = id;
        this.imagePath = imagePath;
        this.name = name;
        this.isFlipped = false;
        this.isMatched = false;
    }

    /**
     * Creates the DOM element for the card
     * @param {number} index - Position in the game board
     * @param {Function} flipCallback - Function to call when card is clicked
     * @returns {HTMLElement} The card's DOM element
     */
    createElement(index, flipCallback) {
        const element = document.createElement('div');
        element.classList.add('card');
        element.dataset.index = index;

        element.innerHTML = `
            <div class="card-front">
                <img src="${this.imagePath}" alt="${this.name}">
            </div>
            <div class="card-back"></div>
        `;

        element.addEventListener('click', () => flipCallback(index));
        return element;
    }
}

/**
 * Manages the game logic and flow
 * 
 * AI contribution: Helped optimize the game loop and state management,
 * particularly in handling card flips and match checking.
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
        this.victoryModal = document.getElementById('victory-modal');
        this.finalMoves = document.getElementById('final-moves');
        this.finalTime = document.getElementById('final-time');
        this.playAgainButton = document.getElementById('play-again-button');

        // Bind event listeners
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.playAgainButton.addEventListener('click', () => {
            this.victoryModal.classList.remove('show');
            this.resetGame();
        });
    }

    /**
     * Initializes the game by creating and shuffling cards
     * Sets up the initial game state
     */
    initializeGame() {
        // Define card data with image paths
        const cardData = [
            new Card(1, '../images/frodo.png', 'Frodo'),
            new Card(2, '../images/gandalf.png', 'Gandalf'),
            new Card(3, '../images/aragorn.png', 'Aragorn'),
            new Card(4, '../images/legolas.png', 'Legolas'),
            new Card(5, '../images/sauron.png', 'Sauron'),
            new Card(6, '../images/gollum.png', 'Gollum'),
            new Card(7, '../images/ring.png', 'The Ring'),
            new Card(8, '../images/gimli.png', 'Gimli')
        ];

        // Create pairs of cards and shuffle them
        this.cards = [...cardData, ...cardData.map(card => new Card(card.id, card.imagePath, card.name))];
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
            const cardElement = card.createElement(index, (idx) => this.flipCard(idx));
            this.gameBoard.appendChild(cardElement);
        });
    }

    /**
     * Handles card flip logic
     * 
     * AI contribution: Suggested using CSS transforms for better performance
     * and implementing proper state checks to prevent invalid moves.
     */
    flipCard(index) {
        // Start timer on first card flip
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }

        const card = this.cards[index];
        const cardElement = this.gameBoard.children[index];

        // Prevent flipping if card is already flipped or two cards are showing
        if (cardElement.classList.contains('flipped') || this.flippedCards.length >= 2 || card.isMatched) return;

        card.isFlipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push({ index, card });

        // Check for match when two cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesCount.textContent = this.moves;
            this.checkMatch();
        }
    }

    /**
     * Checks if two flipped cards match
     * 
     * AI contribution: Helped implement proper timing for card flips
     * and suggested using async/await for better animation control.
     */
    checkMatch() {
        const [firstCard, secondCard] = this.flippedCards;
        const match = firstCard.card.id === secondCard.card.id;

        if (match) {
            firstCard.card.isMatched = true;
            secondCard.card.isMatched = true;
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

                firstCard.card.isFlipped = false;
                secondCard.card.isFlipped = false;
                firstCardElement.classList.remove('flipped');
                secondCardElement.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }

    /**
     * Manages the game timer
     * 
     * AI contribution: Suggested using setInterval with proper cleanup
     * to prevent memory leaks.
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
     * Shows the victory screen with game statistics
     */
    showVictoryScreen() {
        this.finalMoves.textContent = this.moves;
        this.finalTime.textContent = this.timeElement.textContent;
        this.victoryModal.classList.add('show');
    }

    /**
     * Handles game completion
     * Stops timer and shows victory screen
     */
    endGame() {
        clearInterval(this.timer);
        setTimeout(() => {
            this.showVictoryScreen();
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