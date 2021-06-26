import "tailwindcss/tailwind.css";
import { Layout, apolloClient } from "./../components";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
    return (
        <Layout title={"Pagination Training"}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Layout>
    );
}

export default MyApp;
