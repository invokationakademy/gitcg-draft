import './socials_renderer.css'

const YOUTUBE_LINK = "https://www.youtube.com/@blepthecat"
const FEEDBACK_LINK = "https://forms.gle/PSLmSzCvsxnsuWKP6"
const BUG_LINK = "https://forms.gle/61V8gk3MdsanSeG3A"

export function SocialsRenderer() {
    return (
        <div className="socials-box">
            <div className="socials-bar">
                <a className="youtube" target="_blank" rel="noreferrer" href={YOUTUBE_LINK}>🎓Visit Invokation Akademy on Youtube</a>
                <a className="youtube" target="_blank" rel="noreferrer" href={FEEDBACK_LINK}>🗒️Provide Feedback</a>
                <a className="youtube" target="_blank" rel="noreferrer" href={BUG_LINK}>⚠️Report an Issue</a>
            </div>
            <div className="version-box">
                <label className="version-title">Genius Invokation Drafter v1.0</label>
                <label className="version-text">Updated with v4.8 cards band balance changes!</label>
            </div>
        </div>
    )
}
