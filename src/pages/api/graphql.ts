import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "./../../graphql/schema";

/**
 * Setup and Configure a GraphQL Micro Server
 */

const server = new ApolloServer({ typeDefs, resolvers });
const handler = server.createHandler({ path: "/api/graphql" });

export default handler;

// Tell NextJS not to pre-parse any requests to this endpoint
export const config = {
    api: {
        bodyParser: false
    }
};
