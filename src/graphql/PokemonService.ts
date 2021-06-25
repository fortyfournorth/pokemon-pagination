import axios from "axios";

class PokemonAPIService {
    private apiURL = "https://pokeapi.co/api/v2/";
    private api = "pokemon";

    public callAPI(uri: string, params: {} = {}) {
        return axios({
            method: "GET",
            baseURL: this.apiURL,
            url: (uri || this.api).replace(new RegExp(this.apiURL, ""), ""),
            params
        }).then((response) => {
            return response.data;
        });
    }
}

export { PokemonAPIService };
