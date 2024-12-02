import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const generateFoodPosition = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    // Make sure food doesn't spawn on snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFoodPosition();
    }
    return newFood;
  }, [snake]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }

      if (gameOver || isPaused) return;

      const keyDirections = {
        ArrowUp: () => direction !== 'DOWN' && setDirection('UP'),
        ArrowDown: () => direction !== 'UP' && setDirection('DOWN'),
        ArrowLeft: () => direction !== 'RIGHT' && setDirection('LEFT'),
        ArrowRight: () => direction !== 'LEFT' && setDirection('RIGHT'),
      };

      if (keyDirections[e.key]) {
        keyDirections[e.key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch(direction) {
          case 'UP': head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE; break;
          case 'DOWN': head.y = (head.y + 1) % GRID_SIZE; break;
          case 'LEFT': head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE; break;
          case 'RIGHT': head.x = (head.x + 1) % GRID_SIZE; break;
          default: break;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 1);
          setFood(generateFoodPosition());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused, generateFoodPosition]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFoodPosition());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Snake Game</h1>
      
      <div className="mb-4 flex gap-4">
        <div className="text-xl">Score: {score}</div>
        <button 
          onClick={() => setIsPaused(prev => !prev)}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      <div 
        className="relative border-4 border-green-500 bg-gray-800"
        style={{
          width: `${GRID_SIZE * CELL_SIZE}px`,
          height: `${GRID_SIZE * CELL_SIZE}px`
        }}
      >
        {snake.map((segment, index) => (
          <div 
            key={index}
            className="absolute bg-green-500 rounded-sm"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              left: `${segment.x * CELL_SIZE}px`,
              top: `${segment.y * CELL_SIZE}px`,
              transition: 'all 0.1s'
            }}
          />
        ))}
        <div 
          className="absolute bg-red-500 rounded-full"
          style={{
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
            left: `${food.x * CELL_SIZE}px`,
            top: `${food.y * CELL_SIZE}px`
          }}
        />
      </div>

      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <button 
            onClick={restartGame}
            className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="mt-8 text-center text-gray-400">
        <p>Use arrow keys to move</p>
        <p>Press space to pause/resume</p>
      </div>
    </div>
  );
}

export default App;
