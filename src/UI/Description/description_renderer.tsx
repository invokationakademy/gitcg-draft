import { useContext } from 'react';
import { DescriptionContext } from './description_context';
import './description_renderer.css'
import { LocalizationContext } from '../../localization/localizationContext';
import { CharacterCard } from '../../card_database/card';

export function DescriptionRenderer() {
    const descriptionContext = useContext(DescriptionContext)
    const localizationContext = useContext(LocalizationContext)
    const card = descriptionContext.card

    if (!card) {
        return null
    }

    const close = () => {
        descriptionContext.setCard(undefined)
    }

    let splitDesc: string[]

    if (card instanceof CharacterCard)
    {
        splitDesc = card.description.split('\n')
    }
    else
    {
        splitDesc = localizationContext.getString(card.description).split('\n')
    }

    return (
        <div className="description-bkg" onClick={close}>
            <div className="description-boundary">
                <div className="card-image-box">
                    <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/${card.image_file}`} alt={card.display_name}/>
                </div>
                <div className="description-box">
                    <label className="card-name">{localizationContext.getString(card.display_name)}</label>
                    {splitDesc.map((line, idx) => <label key={`${idx}-description`} className="card-description">{(line)}</label>)}
                    <label className="close-tooltip">click anywhere to close</label>
                </div>
            </div>
        </div>
    )
}