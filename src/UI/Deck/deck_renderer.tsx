import { useContext } from "react";
import { Card, CharacterCard } from "../../card_database/card";
import { DescriptionContext } from "../Description/description_context";
import './deck_renderer.css'
import { LocalizationContext, ILocalizationContext } from "../../localization/localizationContext";

export interface DeckRendererProps {
    characters: Array<CharacterCard>
    cards: Array<Card>
    width: number
}

export function DeckRenderer({ characters, cards, width } : DeckRendererProps) {
  const descriptionContext = useContext(DescriptionContext)
  const localizationContext = useContext(LocalizationContext)

    const showCardDescription = (card: Card) => {
          descriptionContext.setCard(card)
    }
    
    const rows: Array<Card>[] = []

    for (let i = 0; i < 30 && i < cards.length; i += width) {
      rows.push(cards.slice(i, i + width))
    }

    return (
        <div className="deckrenderer-boundary">
            <div className="deckrenderer-characters">
              {characters.map((c, idx) => renderCharacter(idx, c, showCardDescription))}
            </div>
            <div className="deckrenderer-cards">
              {rows.map((row, idx) => renderRow(idx, row, localizationContext, showCardDescription))}
            </div>
        </div>
    )
}

function renderCharacter(index: number, card: Card, showCardDescription: (card: Card) => void) {
  return (
    <img className="deckrenderer-characters-item" key={index} src={`${process.env.PUBLIC_URL}/assets/Small_${card.image_file}`} alt={card.display_name} onClick={() => showCardDescription(card)}/>
  )
}

function renderRow(index: number, cards: Array<Card>, loc: ILocalizationContext, showCardDescription: (card: Card) => void) {
  if (cards.length == 0) {
    return null
  }

  return (
    <div className="deckrenderer-cards-row" key={index}>
      {cards.map((c, idx) => renderDeckCard(idx, c, loc, showCardDescription))}
    </div>
  )
}

function renderDeckCard(index: number, card: Card, loc: ILocalizationContext, showCardDescription: (card: Card) => void) {
  const cardName = loc.getString(card.display_name)
  return (
    <img className="deckrenderer-cards-item" key={index} src={`${process.env.PUBLIC_URL}/assets/Small_${card.image_file}`} title={cardName} alt={cardName} onClick={() => showCardDescription(card)}/>
  )
}