import { Card, CharacterCard } from "../card_database/card"
import { CardRenderer, CardSize } from "./card_renderer"
import './card_button.css'
import { useContext } from "react"
import { DescriptionContext } from "./Description/description_context"

export interface CardButtonProps {
    card: Card
    addCard: (card: Card) => void
}

export function CardButton({card, addCard}: CardButtonProps) {
    const size: CardSize = (card instanceof CharacterCard) ? CardSize.card_select : CardSize.card_select
    const descriptionContext = useContext(DescriptionContext)

    const pickCard = () => {
        addCard(card)
    }

    const showCardDescription = () => {
        if (card) {
          descriptionContext.setCard(card)
        }
    }
    
    return (
        <div className="cardBox">
            <div className="cardNameBox">
                <label className="cardName">{card.display_name}</label>
            </div>
            <CardRenderer card={card} size={size} onClick={pickCard}/>
            <button className="infoButton" onClick={showCardDescription}>See description</button>
        </div>
    )
}
