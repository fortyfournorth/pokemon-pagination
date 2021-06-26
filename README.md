# Pagination NextJS Training

Your Task is to create a a Nice Paginated List of Pokemon.

The final application should not allow for invlid page numbers.

## Scripts

-   `dev`: Run NextJS in Development Mode
-   `build`: Build NextJS for Production Mode
-   `start`: Run NextJS in Production Mode
-   `lint`: Run the NextJS Linter
-   `knex:make <name>`: Make a KnexJS migration file
-   `knex:latest`: Run all of the migration files
-   `knex:up`: Run the next migration file
-   `knex:down`: Revert the last migration file run

## Resources

-   [NextJS](https://nextjs.org/docs/getting-started)
-   [KnexJS](http://knexjs.org/)
-   [GraphQL](https://graphql.org/)
-   [Apollo](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/)
-   [tailwindcss](https://tailwindcss.com/docs)
-   [axios](https://www.npmjs.com/package/axios)
-   [@44north/classnames](https://www.npmjs.com/package/@44north/classnames)
-   [PokeAPI](https://pokeapi.co/)
-   [Christopher's CodePen Pokemon Pagination Example](https://codepen.io/CodeVachon/pen/QWpwZqe)

## GraphQL Query to Run

you can visit [/api/graphql](http://localhost:3000/api/graphql) on your running NextJS instance to see everything available to you through the GraphQL implementation we setup.

You can run this query to get a list of Pokemon in the System.

```gql
{
    listPokemon(itemsPerPage: 3, pageNo: 1) {
        id
        name
        height
        weight
        species {
            habitat {
                name
            }
            color {
                name
            }
        }
        sprites {
            official_artwork_front_default
        }
        types {
            name
        }
        abilities {
            name
            is_hidden
        }
    }
}
```

To make this api more responsive, we have setup an SQLite3 Database to cache responses from the RestfulAPI. The means that the first time you call an endpoint with a set of parameters, the response may be slow, but subsequent requests to the same endpoint with the same parameteres will be quick.
