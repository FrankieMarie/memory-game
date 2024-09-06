import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from './components/Button';
import { gameOverMessage } from './utils';

function App() {
  const [gameSquares, setGameSquares] = useState<number[]>([]);
  const [playerSquares, setPlayerSquares] = useState<number[]>([]);
  const [misses, setMisses] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const size = 25;
  const grid = [...new Array(size)];

  useEffect(() => {
    let hits = 0;
    let misses = 0;
    playerSquares.forEach((x) => {
      if (gameSquares.includes(x)) {
        ++hits;
      } else {
        ++misses;
      }
    });

    if (hits === 5) {
      const total = hits + misses;
      const percent = Math.round(100 - (100 * misses) / total);
      setGameOver(true);
      setMisses(`${misses}`);
      setAccuracy(percent);
    }
  }, [gameSquares, playerSquares]);

  const getNum = () => Math.floor(Math.random() * 24);

  const play = () => {
    const result: number[] = [];
    for (let i = 0; i < 5; i++) {
      let num = getNum();
      while (result.includes(num)) {
        num = getNum();
      }
      result.push(num);
    }

    setGameSquares(result);

    setTimeout(() => {
      setStarted(true);
    }, 2000);
  };

  const handlePlayerClick = (i: number) => {
    if (!playerSquares.includes(i)) {
      setPlayerSquares((prev) => [...prev, i]);
    }
  };

  const handleReset = () => {
    setGameSquares([]);
    setPlayerSquares([]);
    setStarted(false);
    setGameOver(false);
    setAccuracy(null);
    setMisses('');
  };

  const classes = (i: number) => {
    return clsx('h-28 w-28 rounded-md', {
      'bg-everforest-gray0':
        !gameSquares.includes(i) && !playerSquares.includes(i),
      'bg-everforest-blue': gameSquares.includes(i),
      'bg-everforest-light': started && !playerSquares.includes(i),
      'bg-everforest-green':
        playerSquares.includes(i) && gameSquares.includes(i),
      'bg-everforest-red':
        playerSquares.includes(i) && !gameSquares.includes(i),
    });
  };

  return (
    <main className="h-full bg-everforest-bg0">
      <div className="max-w-7xl p-8 text-center">
        <header className="mb-8">
          <h1 className="font-mono text-4xl text-everforest-tan">
            <span className="italic">Memory</span>
            <span className="font-bold uppercase">Game</span>
          </h1>
        </header>
        <div className="flex justify-center gap-8">
          <Button
            className="mb-8 font-semibold"
            disabled={started}
            onClick={play}
          >
            Play
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div className="mb-8 flex justify-center gap-8 text-center text-white">
          <p>Misses: {misses}</p>
          <p>
            Accuracy: {accuracy}
            {accuracy && '%'}
          </p>
        </div>
        <div className="relative mx-auto grid w-max grid-cols-5 gap-2">
          {grid.map((_, i) => (
            <button
              key={i}
              disabled={gameOver || !started}
              className={classes(i)}
              onClick={() => handlePlayerClick(i)}
            />
          ))}
          {accuracy && (
            <div className="absolute flex h-full w-full flex-col justify-center bg-everforest-bg0 bg-opacity-50 text-9xl font-bold text-white">
              {gameOverMessage(accuracy)}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
