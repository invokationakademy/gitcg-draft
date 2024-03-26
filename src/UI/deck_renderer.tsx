import { Card, CharacterCard } from "../card_database/card";
import { CardRenderer, CardSize } from "./card_renderer";

export interface DeckRendererProps {
    characters: CharacterCard[]
    cards: Card[]
}

export function DeckRenderer({ characters, cards } : DeckRendererProps) {
    let cards_copy = [...cards]
  
    const row1 = cards_copy.slice(0, 10)
    
    let row2: Card[] = []
    let row3: Card[] = []

    if (cards_copy.length > 10) {
      cards_copy.splice(0, 10)
      row2 = cards_copy.slice(0, 10)
    }

    if (cards_copy.length > 10) {
      cards_copy.splice(0, 10)
      row3 = cards_copy.slice(0, 10)
    }

    return (
        <div>
            {characters.map((c) => <CardRenderer key={c.id} card={c} size={CardSize.deck_characters} />)}
            <div>
              {renderRow(row1)}
              {renderRow(row2)}
              {renderRow(row3)}
            </div>
        </div>
    )
}

function renderRow(cards: Card[]) {
  if (cards.length == 0) {
    return null
  }

  return (
    <div>
      {cards.map((c, idx) => <CardRenderer key={`${idx}-${c.id}`} card={c} size={CardSize.deck_cards}/>)}
    </div>
  )
}