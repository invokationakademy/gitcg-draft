import { useContext } from 'react';
import { DescriptionContext } from './description_context';
import './description_renderer.css'

export function DescriptionRenderer() {
    const descriptionContext = useContext(DescriptionContext)
    const card = descriptionContext.card

    if (!card) {
        return null
    }

    const close = () => {
        descriptionContext.setCard(undefined)
    }

    return (
        <div className="description-bkg" onClick={close}>
            <div className="description-boundary">
                <div className="card-image-box">
                    <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/${card.image_file}`} alt={card.display_name}/>
                </div>
                <div className="description-box">
                    <label className="card-name">{card.display_name}</label>
                    {card.description.map((line, idx) => <label key={`${idx}-description`} className="card-description">{line}</label>)}
                    <label className="close-tooltip">click anywhere to close</label>
                </div>
            </div>
        </div>
    )
}