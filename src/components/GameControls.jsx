import { Rocket, RefreshCw } from 'lucide-react';

export default function GameControls({ moves, matches, totalPairs, onNewGame, gameWon }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-orange-100">
          <span className="text-stone-500 text-sm">Moves</span>
          <span className="text-xl font-bold text-stone-800">{moves}</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-orange-100">
          <span className="text-stone-500 text-sm">Matches</span>
          <span className="text-xl font-bold text-stone-800">{matches}/{totalPairs}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onNewGame}
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-2.5 text-base font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          aria-label="Start a new game"
        >
          <RefreshCw className="w-5 h-5" />
          New Game
        </button>
        <span className="hidden sm:inline-flex items-center gap-2 text-orange-600 font-medium">
          <Rocket className="w-5 h-5" /> Let's go!
        </span>
      </div>

      {gameWon && (
        <div className="sm:hidden w-full text-center text-emerald-600 font-semibold">You did it!</div>
      )}
    </div>
  );
}
