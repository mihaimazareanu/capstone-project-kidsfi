import GlobalStyles from "../styles/GlobalStyles";
// import Layout from "../components/Layout";
import {useState} from "react";
import {UserContextProvider} from "../components/UserContext";
import {PageContextProvider} from "../components/PageContext";

function MyApp({Component, pageProps}) {
  const [accessMode, setAccessMode] = useState("");
  const [loginMode, setLoginMode] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const handleClickRegister = () => {
    setAccessMode("register");
  };

  const handleClickSignIn = () => {
    setAccessMode("signin");
  };

  const handleClickParent = () => {
    setLoginMode("parent");
  };

  const handleClickChild = () => {
    setLoginMode("child");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmedPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  return (
    <>
      <GlobalStyles />
      <main>
        {/* <Layout> */}
        <PageContextProvider>
          <UserContextProvider>
            <Component
              {...pageProps}
              accessMode={accessMode}
              loginMode={loginMode}
              showPassword={showPassword}
              showConfirmedPassword={showConfirmedPassword}
              onClickRegister={handleClickRegister}
              onClickSignIn={handleClickSignIn}
              onClickParent={handleClickParent}
              onClickChild={handleClickChild}
              onShowPassword={handleShowPassword}
              onShowConfirmedPassword={handleShowConfirmedPassword}
            />
          </UserContextProvider>
        </PageContextProvider>
        {/* </Layout> */}
      </main>
    </>
  );
}

export default MyApp;
