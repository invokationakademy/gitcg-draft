import { createContext, useState, ReactNode } from 'react'
import { EN } from './files/locale-en'

const supportedLanguages = new Map([
    ["EN", EN]
])

interface ILocalizationString {
    key: string
    value: string
}

class LocalizationManager {
    public map: Map<string, string> = new Map()

    constructor(public languageCode: string) {
        const rawJson = supportedLanguages.get(languageCode)
        if (!rawJson) {
            return
        }

        const parsedData = JSON.parse(rawJson)
    
        // Parse generic strings
        parsedData['general'].forEach((data: ILocalizationString) => {
            this.map.set(data.key, data.value)
        })
    
        // Parse character strings
        parsedData['characters'].forEach((data: ILocalizationString) => {
            this.map.set(data.key, data.value)
            
            // Add talents from character names
            this.map.set(data.key.replace("Character_Name", "Card_Name_Talent"), `${data.value} ${this.map.get('Text_Talent')}`)
        })

        // Parse talents
        parsedData['talents'].forEach((data: ILocalizationString) => {
            this.map.set(data.key, data.value)
        })

        // Parse cards
        parsedData['cards'].forEach((data: ILocalizationString) => {
            this.map.set(data.key, data.value)
        })
    }
}

interface ILocalizationContextProps {
    children: ReactNode
}

interface ILocalizationContext {
    languageCode: string
    setLanguage: (languageCode: string) => void
    getString: (key: string) => string
}

export const LocalizationContext = createContext<ILocalizationContext>({
    languageCode: "EN",
    setLanguage: () => {},
    getString: () => "NULL_CONTEXT"
})

export function LocalizationContextComponent({children}: ILocalizationContextProps) {
    const [localizer, setLocalizer] = useState<LocalizationManager>(new LocalizationManager("EN"))

    const setLanguageCallback = (code: string) => {
        if (!supportedLanguages.get(code)) {
            return
        }

        setLocalizer(new LocalizationManager(code))
    }

    const getString = (key: string) => {
        const result = localizer.map.get(key)
        return result ? result : "MISSING_KEY"
    }

    return (
        <LocalizationContext.Provider value={{languageCode: localizer.languageCode, setLanguage: setLanguageCallback, getString: getString}}>
            {children}
        </LocalizationContext.Provider>
    )
}
