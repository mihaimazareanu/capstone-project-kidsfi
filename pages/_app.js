import GlobalStyles from "../styles/GlobalStyles";
import Layout from "../components/Layout";
import {useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

function MyApp({Component, pageProps}) {
  const [accessMode, setAccessMode] = useState("");
  const [loginMode, setLoginMode] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [signedIn, setSignedIn] = useLocalStorage("signedIn", false);

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
    console.log(showPassword);
  };

  const handleShowConfirmedPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleSignIn = () => {
    setSignedIn(!signedIn);
  };

  return (
    <>
      <GlobalStyles />
      <main>
        <Layout>
          <Component
            {...pageProps}
            accessMode={accessMode}
            loginMode={loginMode}
            showPassword={showPassword}
            showConfirmedPassword={showConfirmedPassword}
            signedIn={signedIn}
            onClickRegister={handleClickRegister}
            onClickSignIn={handleClickSignIn}
            onClickParent={handleClickParent}
            onClickChild={handleClickChild}
            onShowPassword={handleShowPassword}
            onShowConfirmedPassword={handleShowConfirmedPassword}
            onSignIn={handleSignIn}
          />
        </Layout>
      </main>
    </>
  );
}

export default MyApp;
