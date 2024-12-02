# React Snake Game 🐍

A modern implementation of the classic Snake game built with React and styled with Tailwind CSS. This project features smooth controls, responsive design, and a clean user interface.

## Features 🎮

- Smooth snake movement with arrow key controls
- Score tracking
- Food generation system
- Collision detection
- Pause/Resume functionality
- Game Over state with restart option
- Responsive design
- Modern UI with Tailwind CSS

## Technologies Used 🛠️

- React 18
- Vite
- Tailwind CSS
- JavaScript (ES6+)

## Prerequisites 📋

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation 💻

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd snake-game
```

3. Install dependencies:
```bash
npm install
```

## Running the Game 🎯

To start the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:5173`

## How to Play 🕹️

- Use **Arrow Keys** to control the snake's direction
- Press **Space Bar** to pause/resume the game
- Eat the red food dots to grow the snake and increase your score
- Avoid hitting the snake's own body
- Click "Play Again" when game is over to restart

## Game Controls 🎮

- ⬆️ Up Arrow: Move Up
- ⬇️ Down Arrow: Move Down
- ⬅️ Left Arrow: Move Left
- ➡️ Right Arrow: Move Right
- Space Bar: Pause/Resume

## Project Structure 📁

```
snake-game/
├── src/
│   ├── App.jsx          # Main game component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles and Tailwind imports
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Building for Production 🏗️

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing 🤝

Feel free to fork this project and make improvements. Pull requests are welcome!

## License 📄

This project is open source and available under the MIT License.
