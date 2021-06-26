export interface IPokemonRecord {
    id: string;
    name: string;
    height: number;
    weight: number;
    species: {
        habitat: {
            name: string;
        };
        color: {
            name: string;
        };
    };
    sprites: {
        official_artwork_front_default: string;
    };
    type: {
        name: string;
    }[];
    abilities: {
        name: string;
        is_hidden: boolean;
    }[];
}
