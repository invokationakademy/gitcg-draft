import React from 'react';
import { Card } from "../card_database/card";

const BLANK_CARD = "Characters/Character_Card_blank.png"

export enum CardSize{
    deck_cards = 0,
    deck_characters,
    card_select,
    character_select
}

export interface CardRendererProps {
    card: Card | undefined
    size: CardSize
    onClick?: (card: Card) => void
}

const styles = [
    // deck_cards
    {
        width: 469 * 0.25,
        height: 740 * 0.25
    },
    // deck_characters
    {
        width: 420 * 0.33,
        height: 720 * 0.33,
    },
    // card_select
    {
        width: 469 * 0.5,
        height: 740 * 0.5,
    },
    // deck_characters
    {
        width: 420 * 0.5,
        height: 720 * 0.5,
    }
]

export function CardRenderer({ card, size, onClick } : CardRendererProps) {
    if (!!card) {
        const handleClick = () => {
            if (!!onClick) {
                onClick(card)
            }
        }
        return (
            <img style={styles[size]} src={`${process.env.PUBLIC_URL}/assets/${card.image_file}`} alt={card.display_name} onClick={handleClick}/>
        )
    }

    return (
        <img style={styles[size]} src={`${process.env.PUBLIC_URL}/assets/${BLANK_CARD}`} alt={"Blank"}/>
    )
}