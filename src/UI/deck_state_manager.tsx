import { useState } from 'react';

import { Card, CharacterCard } from "../card_database/card";
import { DeckRenderer } from './deck_renderer';
import { CardSelector } from './card_selector';
import { generate_deck_code } from '../utility/deck_export';
import { CardDatabase } from '../card_database/card_database';

export function DeckStateManager() {
  const [characters, setCharacters] = useState<CharacterCard[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [retries, setRetries] = useState(0)

  const addCard = (card: Card) => {
    if (card instanceof CharacterCard) {
      setCharacters([
        ...characters,
        card
      ])
    } else {
      let newCards = [...cards, card]
      newCards.sort((a,b) => a.id - b.id)

      setCards(newCards)
    }
  }

  const incrementRetries = () => {
    setRetries(retries + 1)
  }

  // Check if we should be done drafting
  if (cards.length >= 30) {
    return (
      <div style={{ display: 'flex', flexDirection:'column' }}>
        <label>Here is your final deck</label>
        <div>
          <label>{generate_deck_code(characters, cards, retries)}</label>
          <button style={{width: 50, height:30}} onClick={incrementRetries}>Retry</button>
        </div>
        <DeckRenderer characters={characters} cards={cards} />
      </div>
    )
  }

  return (
      <div>
        <p>
          Pick your card:
        </p>
        <CardSelector deck_characters={characters} deck_cards={cards} addCard={addCard}/>
        <label>Current Deck:</label>
        <DeckRenderer characters={characters} cards={cards} />
      </div>
    )
}