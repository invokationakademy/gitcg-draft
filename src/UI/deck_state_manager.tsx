import { useState, useRef } from 'react';

import { Card, CharacterCard } from "../card_database/card";
import { DeckRenderer } from './deck_renderer';
import { CardSelector } from './card_selector';
import { generate_deck_code } from '../utility/deck_export';
import { CardDatabase } from '../card_database/card_database';

const COPY_TEXT = "Copy to clipboard"
const COPIED_TEXT = "Copied!"

export function DeckStateManager() {
  const textRef = useRef<HTMLLabelElement | null>(null)
  const [characters, setCharacters] = useState<CharacterCard[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [retries, setRetries] = useState(0)
  const [copyText, setCopyText] = useState(COPY_TEXT)

  const addCard = (card: Card) => {
    if (card instanceof CharacterCard) {
      setCharacters([
        ...characters,
        card
      ])
    } else {
      let newCards = [...cards, card]
      newCards.sort((a,b) => a.id - b.id)

      setCards(newCards)
    }
  }

  const incrementRetries = () => {
    setRetries(retries + 1)
    setCopyText(COPY_TEXT)
  }

  const reset = () => {
    setCharacters([])
    setCards([])
  }

  // Check if we should be done drafting
  if (cards.length >= 30) {
    const copyToClipboard = async () => {
      try {
        if (textRef.current) {
          await navigator.clipboard.writeText(textRef.current.textContent ?? "");
          setCopyText(COPIED_TEXT)
        }
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '150px' }} >
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: '10px'}}>
          <label>Draft complete!</label>
          <label style={{fontSize: '16px', fontFamily: 'monospace'}} ref={textRef}>{generate_deck_code(characters, cards, retries)}</label>
          <label style={{fontSize: '16px'}}>If the deck code doesn't work, hit retry for a new code</label>
          <div style={{ display: 'block', flexDirection: 'row', alignItems: 'center'}}>
            <button style={{width: 150, height:40}} onClick={copyToClipboard}>{copyText}</button>
            <button style={{width: 50, height:40}} onClick={incrementRetries}>Retry</button>
          </div>
          <br/>
          <button style={{width: 100, height:40}} onClick={reset}>Draft again!</button>
        </div>
        <DeckRenderer characters={characters} cards={cards} width={10} />
      </div>
    )
  }

  let padded_chars: Array<CharacterCard | undefined> = [...characters]
  while (padded_chars.length < 3) {
    padded_chars.push(undefined)
  }

  let padded_cards: Array<Card | undefined> = [...cards]
  while (padded_cards.length < 30) {
    padded_cards.push(undefined)
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '150px' }} >
        <CardSelector deck_characters={characters} deck_cards={cards} addCard={addCard}/>
        <DeckRenderer characters={padded_chars} cards={padded_cards} width={10} />
      </div>
    )
}