import axios from "axios";
import knex from "knex";
import { resolve as pathResolve } from "path";

class PokemonAPIService {
    private apiURL = "https://pokeapi.co/api/v2/";
    private api = "pokemon";

    private db = knex({
        client: "sqlite3",
        connection: {
            filename: pathResolve(process.env.PWD, "./pokemon.db")
        },
        useNullAsDefault: false
    });
    private dbTableName = "pokemon";

    public async callAPI(url: string, params: {} = {}) {
        const uri = ("/" + (url || this.api).replace(new RegExp(this.apiURL, "gi"), "") + "/")
            .replace(new RegExp("\\/{1,}", "g"), "/")
            .toLowerCase();
        const key = uri + JSON.stringify(params);

        const savedRecord = await this.db.first("value").from(this.dbTableName).where({ key });

        if (savedRecord) {
            return JSON.parse(savedRecord.value);
        } else {
            return axios({
                method: "GET",
                baseURL: this.apiURL,
                url: uri,
                params
            }).then(async (response) => {
                await this.db
                    .insert({
                        key,
                        value: JSON.stringify(response.data)
                    })
                    .into(this.dbTableName)
                    .onConflict("key")
                    .ignore();

                return response.data;
            });
        }
    }
}

export { PokemonAPIService };
