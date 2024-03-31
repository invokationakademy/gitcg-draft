import { createContext, useState, ReactNode } from 'react'
import { Card } from '../../card_database/card';

interface IDescriptionContext {
    card: Card | undefined
    setCard: (card: Card | undefined) => void
}

export const DescriptionContext = createContext<IDescriptionContext>({card: undefined, setCard: (_) => {}})

interface IDescriptionContextStateProps {
    children: ReactNode
}

export function DescriptionContextState({children}: IDescriptionContextStateProps) {
    const [card, setCard] = useState<Card | undefined>(undefined)
    const setCardFx = (card: Card | undefined) => {
        setCard(card)
    }

    return (
        <DescriptionContext.Provider value={{card: card, setCard: setCardFx}}>
            {children}
        </DescriptionContext.Provider>
    )
}