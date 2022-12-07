import Head from "next/head";
import styled from "styled-components";
import RegisterButton from "../components/RegisterButton";
import RegisterForm from "../components/RegisterForm";
import {useState, useEffect} from "react";
import SigninForm from "../components/SigninForm";
import SigninButton from "../components/SigninButton";

export default function Home() {
  const [accessMode, setAccessMode] = useState("");
  const [loginMode, setLoginMode] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [signedin, setSignedin] = useState(
    useEffect(() => {
      localStorage.getItem("signedinValue") ?? false;
    })
  );

  useEffect(() => {
    localStorage.setItem("signedinValue", signedin);
  }, [signedin]);

  const handleClickRegister = () => {
    setAccessMode("register");
  };

  const handleClickSignin = () => {
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

  const handleSignin = () => {
    setSignedin(true);
  };

  console.log(signedin);

  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      {!signedin ? (
        <>
          <Heading>kidsFi - Finance for kids</Heading>
          <StyledParagraph>
            The app every child needs to have a visual overview of their money.
          </StyledParagraph>
          <FlexContainer>
            <StyledDiv>
              <p>
                Don&apos;t take our word for it though, please register and try
                it out now.
              </p>
              <RegisterButton onClickRegister={handleClickRegister} />
            </StyledDiv>
            <StyledDiv>
              <p>Already have an account? Awesome! Go ahead and log in.</p>
              <SigninButton onClickSignin={handleClickSignin} />
            </StyledDiv>
          </FlexContainer>
          {accessMode === "register" && (
            <RegisterForm
              loginMode={loginMode}
              onClickParent={handleClickParent}
              onClickChild={handleClickChild}
              showPassword={showPassword}
              onShowPassword={handleShowPassword}
              showConfirmedPassword={showConfirmedPassword}
              onShowConfirmedPassword={handleShowConfirmedPassword}
              onClickSignin={handleClickSignin}
            />
          )}
          {accessMode === "signin" && (
            <SigninForm
              showPassword={showPassword}
              onShowPassword={handleShowPassword}
              signedin={signedin}
              onSignin={handleSignin}
            />
          )}
        </>
      ) : (
        <>
          <h1 style={{textAlign: "center"}}>Dashboard</h1>
          <p style={{textAlign: "center"}}>Under construction</p>
        </>
      )}
    </>
  );
}

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  padding-top: 1rem;
`;

const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1.3rem;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0.2rem;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  font-size: 1.2rem;
`;
