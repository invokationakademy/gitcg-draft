import { Card, CharacterCard } from "../card_database/card"
import { CardRenderer, CardSize } from "./card_renderer"
import './card_button.css'

export interface CardButtonProps {
    card: Card
    addCard: (card: Card) => void
}

export function CardButton({card, addCard}: CardButtonProps) {
    const size: CardSize = (card instanceof CharacterCard) ? CardSize.card_select : CardSize.card_select

    const pickCard = () => {
        addCard(card)
    }

    return (
        <div className="cardBox">
            <div className="cardNameBox">
                <label className="cardName">{card.display_name}</label>
            </div>
            <CardRenderer card={card} size={size}/>
            <button className="pickButton" onClick={pickCard}>Pick</button>
        </div>
    )
}
