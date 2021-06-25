import { gql } from "apollo-server-micro";
import { PokemonAPIService } from "./PokemonService";

const typeDefs = gql`
    type Stat {
        name: String
    }

    type PokemonStat {
        base_stat: Int
        effot: Int
        stat: Stat
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
    }

    type Query {
        pokemon(id: ID): Pokemon
        listPokemon(pageNo: Int, itemsPerPage: Int): [Pokemon]
    }
`;

const resolvers = {
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
