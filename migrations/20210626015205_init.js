exports.up = function (knex) {
    return knex.schema.createTable("pokemon", (table) => {
        table.increments("id");
        table.timestamps(true, true);
        table.string("key", 255).notNull().unique();
        table.text("value");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("pokemon");
};
