import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "./../../graphql/schema";

const server = new ApolloServer({ typeDefs, resolvers });
const handler = server.createHandler({ path: "/api/graphql" });

export default handler;
export const config = {
    api: {
        bodyParser: false
    }
};
