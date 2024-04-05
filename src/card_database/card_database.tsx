import { Card, CharacterCard, GITag, WeaponCard, GIResonance, ElementalCard } from './card'
import { RAW_JSON } from './card_catalogue'

export class CardDatabase {
    private readonly allCards: Card[] = []

    // General categories
    private readonly characters: CharacterCard[] = []
    private readonly actionCards: Card[] = []

    // Extra categories for use later
    private readonly weapons: WeaponCard[] = []
    private readonly elementalArtifacts: ElementalCard[] = []
    private readonly food: Card[] = []

    // Special categories that are not in the regular pool
    private readonly talents: Card[] = []
    private readonly arcanes: Card[] = []
    private readonly resonances: Card[] = []

    public constructor() {
        // Hack - figure out how to properly load the JSON from server
        const parsedData = JSON.parse(RAW_JSON)

        let id = 0

        // Parse characters
        parsedData['characters'].forEach((data: any) => {
            let tags = GITag.None
            data.tags.forEach((tag: string) => tags |= GITag[tag as keyof typeof  GITag])

            let reso = GIResonance.None
            data.resonance.forEach((res: string) => reso |= GIResonance[res as keyof typeof GIResonance])

            let extraTags = data.resonance.slice(0, -1)
            

            let description = `Element: ${data.element}\nWeapon: ${data.weapon}\nOther tags: ${extraTags.join(",")}`

            let card = new CharacterCard(
                GIResonance[data.element as keyof typeof GIResonance],
                GITag[data.weapon as keyof typeof GITag],
                id,
                data.code_key,
                data.display_name,
                data.image_file,
                tags,
                reso,
                description)
            
            this.allCards.push(card)
            this.characters.push(card)

            ++id
        })

        // Parse talents. Talents should be in the same order as characters
        parsedData['talents'].forEach((data: any) => {
            let tags = GITag.None
            data.tags.forEach((tag: string) => tags |= GITag[tag as keyof typeof  GITag])

            let card = new Card(
                id,
                data.code_key,
                data.display_name,
                data.image_file,
                tags,
                GIResonance.None,
                data.description)
            
            this.allCards.push(card)
            this.talents.push(card)
            
            ++id
        })

        // Parse remaining cards
        parsedData['cards'].forEach((data: any) => {
            let tags = GITag.None
            data.tags.forEach((tag: string) => tags |= GITag[tag as keyof typeof  GITag])

            let card

            // Check if it is a weapon
            if ((tags & GITag.Weapon) === GITag.Weapon) {
                card = new WeaponCard(
                    GITag[data.weapon as keyof typeof GITag],
                    id,
                    data.code_key,
                    data.display_name,
                    data.image_file,
                    tags,
                    data.description)

                this.weapons.push(card)
            } else if (!!data.element) {
                card = new ElementalCard(
                    GIResonance[data.element as keyof typeof GIResonance],
                    id,
                    data.code_key,
                    data.display_name,
                    data.image_file,
                    tags,
                    data.description)

                this.elementalArtifacts.push(card)
            } else {
                card = new Card(
                    id,
                    data.code_key,
                    data.display_name,
                    data.image_file,
                    tags,
                    data.resonance ? GIResonance[data.resonance as keyof typeof  GIResonance] : GIResonance.None,
                    data.description)

                if (card.HasTag(GITag.Food)) {
                    // Add food to special list
                    this.food.push(card)
                }
    
                if (card.HasTag(GITag.Arcane)) {
                    // Arcanes shouldn't get added to the regular pool
                    this.arcanes.push(card)
                } else if (card.resonance != GIResonance.None) {
                    // Cards with resonance shouldn't get added to the regular pool
                    this.resonances.push(card)
                } else {
                    // Add to general pool
                    this.actionCards.push(card)
                }
            }

            this.allCards.push(card)
            ++id
        })
    }

    public GetCard(id: number) : Card {
        return this.allCards[id]
    }

    public GetTalent(char: CharacterCard) : Card {
        if (char.id >= this.talents.length) {
            console.error(`Talent for ${char.display_name} with id=${char.id} not found`)
        }
        return this.talents[char.id]
    }

    public GetAllCharacters() : readonly CharacterCard[] {
        return this.characters
    }

    public GetAllWeapons() : readonly WeaponCard[] {
        return this.weapons
    }

    public GetMatchingWeapons(filter: GITag) : readonly WeaponCard[] {
        return this.weapons.filter((card) => (card.weapon & filter) === card.weapon)
    }

    // Gets all generally available action cards. This does not return specialized action cards
    public GetAllActionCards() : readonly Card[] {
        return this.actionCards
    }

    public GetArcaneCards() : readonly Card[] {
        return this.arcanes
    }

    public GetResonanceCards(resonance: GIResonance) : readonly Card[] {
        return this.resonances.filter((card) => (card.resonance & resonance) === card.resonance)
    }

    public GetElementalCards(elements: GIResonance) : readonly Card[] {
        return this.elementalArtifacts.filter((card) => (card.element & elements) === card.element)
    }
}