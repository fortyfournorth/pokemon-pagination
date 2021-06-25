import "tailwindcss/tailwind.css";
import { Layout } from "./../components";

function MyApp({ Component, pageProps }) {
    return (
        <Layout title={"Pagination Training"}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
