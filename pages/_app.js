import GlobalStyles from "../styles/GlobalStyles";
import Layout from "../components/Layout";
import {useState} from "react";

function MyApp({Component, pageProps}) {
  const [register, setRegister] = useState(false);
  const [parent, setParent] = useState(false);
  const [child, setChild] = useState(false);
  return (
    <main>
      <GlobalStyles />
      <Layout>
        <Component
          register={register}
          setRegister={setRegister}
          parent={parent}
          setParent={setParent}
          child={child}
          setChild={setChild}
          {...pageProps}
        />
      </Layout>
    </main>
  );
}

export default MyApp;
