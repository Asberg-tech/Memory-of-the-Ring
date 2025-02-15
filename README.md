# Memory of the Ring

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/Asberg-tech/Memory-of-the-Ring)

A fantasy-themed memory card game built with HTML, CSS, and JavaScript. Match pairs of iconic characters and artifacts to test your memory in this engaging and visually appealing game.

## Features

- 16 unique cards (8 pairs) featuring fantasy-inspired characters and items
- Responsive design that adapts to different screen sizes
- Game statistics tracking:
  - Number of moves taken
  - Time elapsed
- Smooth card flip animations and hover effects
- Victory screen with game statistics
- Mobile-friendly interface

## How to Play

1. Open `index.html` in your web browser
2. Click any card to reveal its image
3. Click another card to find its match
4. If the cards match, they stay face up
5. If they don't match, they flip back after a short delay
6. Continue until all pairs are matched
7. Try to complete the game in fewer moves and less time!

## Technical Details

### Structure
```
Memory-of-the-Ring/
├── pages/
│   └── index.html
├── styles/
│   ├── main.css
│   └── colors.css
├── scripts/
│   └── game.js
└── images/
    ├── card.png
    ├── start.png
    └── [character images]
```

### Technologies Used
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- AI-Generated Images (DALL·E 3)

### Performance Optimizations
- CSS Hardware Acceleration
- Event Delegation
- DOM Caching
- Optimized Image Loading
- Efficient Animation Handling

## Development

The game is built using vanilla JavaScript with an object-oriented approach, featuring two main classes:
- `Card`: Handles individual card properties and behavior
- `MemoryGame`: Manages game logic and flow

No build process or dependencies required - simply clone and run!

## Contributing

Contributions are welcome! If you'd like to improve the game, please:

1. Fork the repository
2. Create a new branch for your feature
3. Submit a pull request with a clear description of your changes

Please ensure your code follows the existing style and includes appropriate documentation.

## Credits

- Game Development: Niklas Åsberg
- Artwork: AI-generated images
- Documentation and Testing: Assisted by AI tools

## License

This project is open source and available under the MIT License. You are free to use, modify, and distribute this code, provided you include the original license and attribution.

Copyright (c) 2024 Niklas Åsberg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
