import axios from "axios";
import knex from "knex";
import { resolve as pathResolve } from "path";

/**
 * This Service is used to simply logic to call the
 * Pokemon API
 */
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

    /**
     * Calls the Pokemon API to retreve data
     *
     * A Local Database Cache Layer is put in place to reduce
     * calls to the API and make the application more responsive
     *
     * @param url The URL to use
     * @param params any GET parameters to send with Request
     * @returns the api response.data
     */
    public async callAPI(url: string, params: {} = {}) {
        // Figure out what that request URI should be
        const uri = ("/" + (url || this.api).replace(new RegExp(this.apiURL, "gi"), "") + "/")
            .replace(new RegExp("\\/{1,}", "g"), "/")
            .toLowerCase();
        // Create the Caching Key
        const key = uri + JSON.stringify(params);

        // Look for a value in the database for the cache key
        const savedRecord = await this.db.first("value").from(this.dbTableName).where({ key });

        // If a cached value is found...
        if (savedRecord) {
            // turn it into an Object from a String and return it
            return JSON.parse(savedRecord.value);
        } else {
            // else fetch the record from the API
            return axios({
                method: "GET",
                baseURL: this.apiURL,
                url: uri,
                params
            }).then(async (response) => {
                // Now that I have a record from the API
                // Save it to the Local Database for Caching
                // with the `key` value generated above
                await this.db
                    .insert({
                        key,
                        // Turn the response.data Object into a
                        // string before saving it
                        value: JSON.stringify(response.data)
                    })
                    .into(this.dbTableName)
                    .onConflict("key")
                    .ignore();

                // Now return the response.data
                return response.data;
            });
        }
    }
}

export { PokemonAPIService };
