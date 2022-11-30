import GlobalStyles from "../styles/GlobalStyles";
import Layout from "../components/Layout";

function MyApp({Component, pageProps}) {
  return (
    <main>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp;
