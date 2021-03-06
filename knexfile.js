const { resolve, sep } = require("path");

module.exports = {
    client: "sqlite3",
    connection: {
        filename: resolve(process.env.PWD || __dirname, `.${sep}pokemon.db`)
    },
    useNullAsDefault: false
};
