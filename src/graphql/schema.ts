import { gql } from "apollo-server-micro";
import { PokemonAPIService } from "./PokemonService";

/**
 * This function returns the ID of a resource in the
 * provided URL
 * @param url the URL to pull the ID From.
 * @returns the ID taken from the URL
 */
const parseIdFromURL = (url: string) =>
    (url || "")
        .replace(new RegExp("?.+$", "gi"), "")
        .replace(new RegExp("https:\\/\\/", "gi"), "")
        .split("/")
        .filter((value) => value.length > 0)
        .filter((value) => Number(value) === parseInt(value))
        .reverse()[0];

/**
 * Generate the GraphQL Schema
 */
const typeDefs = gql`
    type Characteristics {
        id: ID
        possible_values: [Int]
        highest_stat: Stat
        description: String
        gene_modulo: Int
    }

    type Stat {
        id: ID
        name: String
        game_index: Int
        is_battle_only: Boolean
        characteristics: [Characteristics]
    }

    type PokemonStat {
        id: ID
        base_stat: Int
        effort: Int
        name: String
        stat: Stat
    }

    type AbilityPokemon {
        id: ID
        name: String
        is_hidden: Boolean
        slot: Int
        pokemon: Pokemon
    }

    type Ability {
        id: ID
        name: String
        is_main_series: Boolean
        pokemon: [AbilityPokemon]
    }

    type PokemonAbility {
        id: ID
        name: String
        is_hidden: Boolean
        slot: Int
        ability: Ability
    }

    type TypePokemon {
        id: ID
        name: String
        slot: Int
        pokemon: Pokemon
    }

    type Type {
        id: ID
        name: String
        pokemon: [TypePokemon]
    }

    type PokemonType {
        id: ID
        name: String
        slot: Int
        type: Type
    }

    type PokemonSprite {
        back_default: String
        back_female: String
        back_shiny: String
        back_shiny_female: String
        front_default: String
        front_female: String
        front_shiny: String
        front_shiny_female: String
        dream_world_front_default: String
        dream_world_front_female: String
        official_artwork_front_default: String
    }

    type Color {
        id: ID
        name: String
    }

    type Habitat {
        id: ID
        name: String
    }

    type Species {
        id: ID
        name: String
        base_happiness: Int
        capture_rate: Int
        color: Color
        gender_rate: Int
        habitat: Habitat
        has_gender_differences: Boolean
        hatch_counter: Int
        is_baby: Boolean
        is_legendary: Boolean
        is_mythical: Boolean
        order: Int
    }

    type Pokemon {
        id: ID
        name: String
        height: Int
        is_default: Boolean
        location_area_encounters: String
        order: Int
        weight: Int
        stats: [PokemonStat]
        abilities: [PokemonAbility]
        types: [PokemonType]
        sprites: PokemonSprite
        species: Species
    }

    type Query {
        pokemon(id: ID): Pokemon
        listPokemon(pageNo: Int, itemsPerPage: Int): [Pokemon]
    }
`;

/**
 * Generate the GraphQL Resolvers
 */
const resolvers = {
    PokemonSprite: {
        dream_world_front_default: (parent) => {
            return parent.other?.dream_world?.front_default;
        },
        dream_world_front_female: (parent) => {
            return parent.other?.dream_world?.front_female;
        },
        official_artwork_front_default: (parent) => {
            return parent.other["official-artwork"]?.front_default;
        }
    },
    TypePokemon: {
        id: (parent) => {
            return parseIdFromURL(parent.pokemon?.url);
        },
        name: (parent) => {
            return parent.pokemon?.name;
        },
        pokemon: (parent) => {
            return new PokemonAPIService().callAPI(parent.pokemon?.url);
        }
    },
    PokemonType: {
        id: (parent) => {
            return parseIdFromURL(parent.type?.url);
        },
        name: (parent) => {
            return parent.type?.name;
        },
        type: (parent) => {
            return new PokemonAPIService().callAPI(parent.type?.url);
        }
    },
    AbilityPokemon: {
        id: (parent) => {
            return parseIdFromURL(parent.pokemon?.url);
        },
        name: (parent) => {
            return parent.pokemon?.name;
        },
        pokemon: (parent) => {
            return new PokemonAPIService().callAPI(parent.pokemon?.url);
        }
    },
    PokemonAbility: {
        id: (parent) => {
            return parseIdFromURL(parent.ability?.url);
        },
        name: (parent) => {
            return parent.ability?.name;
        },
        ability: (parent) => {
            return new PokemonAPIService().callAPI(parent.ability?.url);
        }
    },
    Characteristics: {
        highest_stat: (parent) => {
            if (parent.highest_stat) {
                return new PokemonAPIService()
                    .callAPI(parent.highest_stat.url)
                    .then((itemResponse) => {
                        return itemResponse;
                    });
            } else {
                return null;
            }
        },
        description: (parent) => {
            if (parent.descriptions) {
                return (
                    parent.descriptions.filter((record) => record.language?.name === "en")[0]
                        .description || null
                );
            }

            return null;
        }
    },
    Stat: {
        characteristics: (parent) => {
            if (parent.characteristics) {
                return Promise.all(
                    parent.characteristics.map((record) =>
                        new PokemonAPIService().callAPI(record.url).then((itemResponse) => {
                            return itemResponse;
                        })
                    )
                );
            } else {
                return null;
            }
        }
    },
    PokemonStat: {
        id: (parent) => {
            return parseIdFromURL(parent.stat?.url);
        },
        name: (parent) => {
            return parent.stat?.name;
        },
        stat: (parent) => {
            if (parent.stat?.url) {
                return new PokemonAPIService().callAPI(parent.stat?.url).then((itemResponse) => {
                    return itemResponse;
                });
            }

            return null;
        }
    },
    Species: {
        color: (parent) => {
            return new PokemonAPIService().callAPI(parent.color?.url);
        },
        habitat: (parent) => {
            return new PokemonAPIService().callAPI(parent.habitat?.url);
        }
    },
    Pokemon: {
        species: (parent) => {
            return new PokemonAPIService().callAPI(parent.species?.url);
        }
    },
    Query: {
        pokemon: (_, { id }) => {
            return new PokemonAPIService().callAPI(`/pokemon/${id}`);
        },
        listPokemon: (_, { pageNo = 1, itemsPerPage = 10 }) => {
            const offset = (pageNo - 1) * itemsPerPage;
            const limit = itemsPerPage;

            return new PokemonAPIService()
                .callAPI("/pokemon", { offset, limit })
                .then((recordSet) => {
                    return Promise.all(
                        recordSet.results.map((record) =>
                            new PokemonAPIService().callAPI(record.url).then((itemResponse) => {
                                return itemResponse;
                            })
                        )
                    );
                });
        }
    }
};

export { typeDefs, resolvers };
