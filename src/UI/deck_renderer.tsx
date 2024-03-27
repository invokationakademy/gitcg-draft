import { Card, CharacterCard } from "../card_database/card";
import { CardRenderer, CardSize } from "./card_renderer";

export interface DeckRendererProps {
    characters: Array<CharacterCard | undefined>
    cards: Array<Card | undefined>
}

export function DeckRenderer({ characters, cards } : DeckRendererProps) {
    const row1 = cards.slice(0, 10)
    const row2 = cards.slice(10, 20)
    const row3 = cards.slice(20, 30)

    return (
        <div>
            {characters.map((c, idx) => <CardRenderer key={`${idx}-${c ? c.id : "blank"}`} card={c} size={CardSize.deck_characters} />)}
            <div>
              {renderRow(row1)}
              {renderRow(row2)}
              {renderRow(row3)}
            </div>
        </div>
    )
}

function renderRow(cards: Array<Card | undefined>) {
  if (cards.length == 0) {
    return null
  }

  return (
    <div>
      {cards.map((c, idx) => <CardRenderer key={`${idx}-${c ? c.id : "blank"}`} card={c} size={CardSize.deck_cards}/>)}
    </div>
  )
}