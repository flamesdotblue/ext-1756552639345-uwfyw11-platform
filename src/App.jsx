import { useEffect, useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import GameControls from './components/GameControls';
import MemoryBoard from './components/MemoryBoard';

const ALL_SHAPES = [
  { emoji: '🔵', name: 'blue circle', color: 'bg-blue-400' },
  { emoji: '🟥', name: 'red square', color: 'bg-red-400' },
  { emoji: '🔺', name: 'red triangle', color: 'bg-rose-400' },
  { emoji: '🟢', name: 'green circle', color: 'bg-green-400' },
  { emoji: '⭐', name: 'yellow star', color: 'bg-yellow-300' },
  { emoji: '💜', name: 'purple heart', color: 'bg-purple-400' },
];

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // ids currently face up (max 2)
  const [matched, setMatched] = useState(new Set()); // ids permanently matched
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [peekAll, setPeekAll] = useState(true);
  const [startedAt, setStartedAt] = useState(null);

  const totalPairs = useMemo(() => ALL_SHAPES.length, []);

  const gameWon = matched.size > 0 && matched.size === cards.length;

  const createDeck = () => {
    // Duplicate shapes to create pairs and give each card a unique id
    const base = ALL_SHAPES.map((s, i) => ({ key: `${s.name}-${i}`, ...s }));
    const dup = base.flatMap((s, idx) => [
      { id: `${idx}-a`, pair: idx, ...s },
      { id: `${idx}-b`, pair: idx, ...s },
    ]);
    return shuffle(dup);
  };

  const resetGame = () => {
    setCards(createDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setIsLocked(false);
    setPeekAll(true);
    setStartedAt(null);
  };

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!peekAll) return;
    const t = setTimeout(() => setPeekAll(false), 1400);
    return () => clearTimeout(t);
  }, [cards, peekAll]);

  const onCardClick = (id) => {
    if (isLocked) return;
    if (matched.has(id)) return;
    if (flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    if (!startedAt) setStartedAt(Date.now());
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      const ca = cards.find((c) => c.id === a);
      const cb = cards.find((c) => c.id === b);
      const isMatch = ca && cb && ca.pair === cb.pair;

      setTimeout(() => {
        if (isMatch) {
          const nextMatched = new Set(matched);
          nextMatched.add(a);
          nextMatched.add(b);
          setMatched(nextMatched);
        }
        setFlipped([]);
        setIsLocked(false);
      }, isMatch ? 500 : 900);
    }
  };

  const matchesFound = matched.size / 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 text-stone-800 flex flex-col">
      <Hero3D />

      <main className="relative z-0 container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-5xl flex-1 pb-12">
        <section className="text-center -mt-10 sm:-mt-16 mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-orange-600 drop-shadow-sm">
            Match the Shapes!
          </h1>
          <p className="mt-2 text-base sm:text-lg text-stone-700">
            Flip two cards to find a pair. Bright, friendly shapes for tiny hands.
          </p>
        </section>

        <GameControls
          moves={moves}
          matches={matchesFound}
          totalPairs={totalPairs}
          onNewGame={resetGame}
          gameWon={gameWon}
        />

        <MemoryBoard
          cards={cards}
          flippedIds={peekAll ? cards.map((c) => c.id) : flipped}
          matchedIds={matched}
          onCardClick={onCardClick}
        />

        {gameWon && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-full px-5 py-3 text-lg font-semibold shadow">
              Yay! You matched all the shapes!
            </div>
          </div>
        )}
      </main>

      <footer className="pb-6 text-center text-sm text-stone-500">
        Built for play and learning.
      </footer>
    </div>
  );
}
