import Head from "next/head";
import styled from "styled-components";
import RegisterButton from "../components/RegisterButton";
import RegisterForm from "../components/RegisterForm";
import {useState} from "react";
import SigninForm from "../components/SigninForm";
import SigninButton from "../components/SigninButton";

export default function Home() {
  const [accessMode, setAccessMode] = useState("");
  const [loginMode, setLoginMode] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>

      <MainSection>
        <Heading>kidsFi - Finance for kids</Heading>
        <StyledParagraph>
          The app every child needs to have a visual overview of their money.
        </StyledParagraph>
        <FlexContainer>
          <StyledDiv>
            <p>
              Don&apos;t take our word for it though, please register and try it
              out now.
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
          />
        )}
        {accessMode === "signin" && (
          <SigninForm
            showPassword={showPassword}
            onShowPassword={handleShowPassword}
          />
        )}
      </MainSection>
    </>
  );
}

const MainSection = styled.section`
  margin-top: 5rem;
  font-size: 1rem;
  width: 100%;
  min-height: 100vh;
  background-color: #e9f2ef;
  color: #401d1a;
`;

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
  display: flex;
  width: 100%;
  padding: 0 1rem 0;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  font-size: 1.2rem;
`;
