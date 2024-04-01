import React, { useContext } from 'react';
import { Card } from "../card_database/card";
import { DescriptionContext } from './Description/description_context';

const BLANK_CARD = "Characters/Character_Card_blank.png"

export enum CardSize{
    deck_cards = 0,
    card_select,
}

export interface CardRendererProps {
    card: Card | undefined
    size: CardSize
    onClick: () => void
}

const styles = [
    // deck_cards
    {
        width: 469 * 0.20,
        height: 740 * 0.20
    },
    // card_select
    {
        width: 469 * 0.4,
        height: 740 * 0.4,
    },
]

export function CardRenderer({ card, size, onClick } : CardRendererProps) {
    if (!!card) {
        return (
            <img style={styles[size]} src={`${process.env.PUBLIC_URL}/assets/${card.image_file}`} alt={card.display_name} onClick={onClick}/>
        )
    }

    return (
        <img style={styles[size]} src={`${process.env.PUBLIC_URL}/assets/${BLANK_CARD}`} alt={"Blank"}/>
    )
}