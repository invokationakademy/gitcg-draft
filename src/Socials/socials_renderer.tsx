import './socials_renderer.css'

const YOUTUBE_LINK = "https://www.youtube.com/@blepthecat"
const FEEDBACK_LINK = "https://forms.gle/PSLmSzCvsxnsuWKP6"
const BUG_LINK = "https://forms.gle/61V8gk3MdsanSeG3A"

export function SocialsRenderer() {
    return (
        <div className="socials" style={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: '10px'}}>
            <a className="youtube" target="_blank" rel="noreferrer" href={YOUTUBE_LINK}>Click here to check out Invokation Akademy on YouTube!</a>
            <a className="youtube" target="_blank" rel="noreferrer" href={FEEDBACK_LINK}>Suggestions? Click here to provide feedback!</a>
            <a className="youtube" target="_blank" rel="noreferrer" href={BUG_LINK}>Encounter an issue? Click here to report it!</a>
        </div>
    )
}
