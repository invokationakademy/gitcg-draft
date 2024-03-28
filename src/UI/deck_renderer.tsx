import { Card, CharacterCard } from "../card_database/card";
import { CardRenderer, CardSize } from "./card_renderer";

export interface DeckRendererProps {
    characters: Array<CharacterCard | undefined>
    cards: Array<Card | undefined>
    width: number
}

export function DeckRenderer({ characters, cards, width } : DeckRendererProps) {
    const rows: Array<Card | undefined>[] = []

    for (let i = 0; i < 30; i += width) {
      rows.push(cards.slice(i, i + width))
    }

    return (
        <div>
            {characters.map((c, idx) => <CardRenderer key={`${idx}-${c ? c.id : "blank"}`} card={c} size={CardSize.deck_characters} />)}
            <div>
              {rows.map((row) => renderRow(row))}
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