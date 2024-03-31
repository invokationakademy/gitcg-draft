export enum GIResonance {
    None = 0,

    // Elemental
    Pyro = 1 << 0,
    Hydro = 1 << 1,
    Cryo = 1 << 2,
    Electro = 1 << 3,
    Dendro = 1 << 4,
    Anemo = 1 << 5,
    Geo = 1 << 6,

    // Origin
    Mondstadt = 1 << 7,
    Liyue = 1 << 8,
    Inazuma = 1 << 9,
    Sumeru = 1 << 10,
    Fontaine = 1 << 11,
    Natlan = 1 << 12,
    Snezhnaya = 1 << 13,

    // Affiliation
    Fatui = 1 << 14,
    Monster  = 1 << 15,
    Eremites = 1 << 16,
}

export enum GITag {
    None = 0,

    // Weapon Types
    Sword = 1 << 0,
    Polearm = 1 << 1,
    Bow = 1 << 2,
    Catalyst = 1 << 3,
    Claymore = 1 << 4,
    Weaponless = 1 << 5,

    // Card Types
    Arcane = 1 << 6,
    Artifact = 1 << 7,
    Companion = 1 << 8,
    Event = 1 << 9,
    Food = 1 << 10,
    Item = 1 << 11,
    Location = 1 << 12,
    Talent = 1 << 13,
    Weapon = 1 << 14,
}

export class Card {
    public constructor(
        public readonly id: number,
        public readonly code_key: number,
        public readonly display_name: string,
        public readonly image_file: string,
        public readonly tags: GITag,
        public readonly resonance: GIResonance,
        public readonly description: string[]) {}

    public HasTag(tag: GITag): boolean {
        return (this.tags & tag) === tag
    }
}

export class ElementalCard extends Card {
    public constructor(
        public readonly element: GIResonance,
        id: number, code_key: number, display_name: string, image_file: string, tags: GITag, description: string[]) {
        super(id, code_key, display_name, image_file, tags, GIResonance.None, description)
    }
}

export class WeaponCard extends Card {
    public constructor(
        public readonly weapon: GITag,
        id: number, code_key: number, display_name: string, image_file: string, tags: GITag, description: string[]) {
        super(id, code_key, display_name, image_file, tags, GIResonance.None, description)
    }
}

export class CharacterCard extends Card {
    public constructor(
        public readonly element: GIResonance,
        public readonly weapon: GITag,
        id: number, code_key: number, display_name: string, image_file: string,  tags: GITag, resonance: GIResonance, description: string[]) {
        super(id, code_key, display_name, image_file, tags, resonance, description)
    }
}