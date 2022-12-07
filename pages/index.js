import Head from "next/head";
import styled from "styled-components";
import RegisterButton from "../components/RegisterButton";
import RegisterForm from "../components/RegisterForm";
import SigninForm from "../components/SigninForm";
import SigninButton from "../components/SigninButton";

export default function Home({
  accessMode,
  signedIn,
  onClickRegister,
  onClickSignIn,
  loginMode,
  onClickParent,
  onClickChild,
  showPassword,
  onShowPassword,
  showConfirmedPassword,
  onShowConfirmedPassword,
  onSignIn,
}) {
  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      {!signedIn ? (
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
              <RegisterButton onClickRegister={onClickRegister} />
            </StyledDiv>
            <StyledDiv>
              <p>Already have an account? Awesome! Go ahead and log in.</p>
              <SigninButton onClickSignin={onClickSignIn} />
            </StyledDiv>
            {/* <p>Acces Mode: {accessMode}</p> */}
          </FlexContainer>
          {accessMode === "register" && (
            <>
              <RegisterForm
                loginMode={loginMode}
                onClickParent={onClickParent}
                onClickChild={onClickChild}
                showPassword={showPassword}
                onShowPassword={onShowPassword}
                showConfirmedPassword={showConfirmedPassword}
                onShowConfirmedPassword={onShowConfirmedPassword}
                onClickSignIn={onClickSignIn}
              />
            </>
          )}
          {accessMode === "signin" && (
            <SigninForm
              showPassword={showPassword}
              onShowPassword={onShowPassword}
              signedIn={signedIn}
              onSignIn={onSignIn}
            />
          )}
        </>
      ) : (
        <>
          <h1 style={{textAlign: "center"}}>Dashboard</h1>
          <p style={{textAlign: "center"}}>
            Children accounts linked to your account{" "}
          </p>
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
