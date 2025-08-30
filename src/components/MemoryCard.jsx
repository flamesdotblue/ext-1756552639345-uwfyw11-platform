import { motion } from 'framer-motion';

export default function MemoryCard({ card, isFlipped, isMatched, onClick }) {
  const faceClasses = `${card.color} flex items-center justify-center w-full h-full rounded-2xl text-5xl select-none`;
  const backPattern = 'bg-gradient-to-br from-orange-200 to-amber-200';

  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-transform ${isMatched ? 'scale-95' : 'active:scale-[0.98]'} shadow-md`}
      aria-label={isFlipped ? `${card.name}` : 'Hidden card'}
      disabled={isMatched}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {/* Back */}
        <div className={`absolute inset-0 ${backPattern} rounded-2xl border border-orange-300 [backface-visibility:hidden] flex items-center justify-center`}>
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: isFlipped ? 0 : -10, scale: isFlipped ? 1 : 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="text-orange-700 text-4xl font-extrabold"
          >
            ?
          </motion.div>
        </div>

        {/* Front */}
        <div className={`${faceClasses} [transform:rotateY(180deg)] [backface-visibility:hidden] border border-white/30 shadow-inner`}
          role="img"
          aria-label={card.name}
        >
          <span className="drop-shadow-sm">{card.emoji}</span>
        </div>
      </div>
    </button>
  );
}
