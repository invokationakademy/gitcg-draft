import { Card, CharacterCard } from "../card_database/card"
import { CardRenderer, CardSize } from "./card_renderer"
import './card_button.css'

export interface CardButtonProps {
    card: Card
    addCard: (card: Card) => void
}

export function CardButton({card, addCard}: CardButtonProps) {
    const size: CardSize = (card instanceof CharacterCard) ? CardSize.character_select : CardSize.card_select

    return (
        <div className="cardBox">
            <label className="cardName">{card.display_name}</label>
            <CardRenderer card={card} size={size} onClick={addCard}/>
        </div>
    )
}
