import MemoryCard from './MemoryCard';

export default function MemoryBoard({ cards, flippedIds, matchedIds, onCardClick }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-3xl mx-auto">
      {cards.map((card) => {
        const isFlipped = flippedIds.includes(card.id) || matchedIds.has(card.id);
        const isMatched = matchedIds.has(card.id);
        return (
          <MemoryCard
            key={card.id}
            card={card}
            isFlipped={isFlipped}
            isMatched={isMatched}
            onClick={() => onCardClick(card.id)}
          />
        );
      })}
    </div>
  );
}
