import { useContext } from "react";
import { Card, CharacterCard } from "../card_database/card";
import { DescriptionContext } from "./Description/description_context";
import { CardRenderer, CardSize } from "./card_renderer";

export interface DeckRendererProps {
    characters: Array<CharacterCard | undefined>
    cards: Array<Card | undefined>
    width: number
}

export function DeckRenderer({ characters, cards, width } : DeckRendererProps) {
  const descriptionContext = useContext(DescriptionContext)

    const showCardDescription = (card: Card | undefined) => {
        if (card) {
          descriptionContext.setCard(card)
        }
    }
    
    const rows: Array<Card | undefined>[] = []

    for (let i = 0; i < 30; i += width) {
      rows.push(cards.slice(i, i + width))
    }

    return (
        <div>
            {characters.map((c, idx) => <CardRenderer key={`${idx}-${c ? c.id : "blank"}`} card={c} size={CardSize.deck_cards} onClick={() => showCardDescription(c)}/>)}
            <div>
              {rows.map((row) => renderRow(row, showCardDescription))}
            </div>
        </div>
    )
}

function renderRow(cards: Array<Card | undefined>, showCardDescription: (card: Card | undefined) => void) {
  if (cards.length == 0) {
    return null
  }

  return (
    <div>
      {cards.map((c, idx) => <CardRenderer key={`${idx}-${c ? c.id : "blank"}`} card={c} size={CardSize.deck_cards} onClick={() => showCardDescription(c)}/>)}
    </div>
  )
}