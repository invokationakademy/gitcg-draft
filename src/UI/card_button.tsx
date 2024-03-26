import { Card, CharacterCard } from "../card_database/card"
import { CardRenderer, CardSize } from "./card_renderer"

export interface CardButtonProps {
    card: Card
    addCard: (card: Card) => void
}

export function CardButton({card, addCard}: CardButtonProps) {
    const size: CardSize = (card instanceof CharacterCard) ? CardSize.character_select : CardSize.card_select

    return (
        <div style={{display: 'flex', flexDirection: 'column', width:420}}>
            <label>{card.display_name}</label>
            <button style={{backgroundColor: 'transparent'}}>
                <CardRenderer card={card} size={size} onClick={addCard}/>
            </button>
        </div>
    )
}
