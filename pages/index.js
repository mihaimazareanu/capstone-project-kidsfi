import styled from "styled-components";
import RegisterButton from "../components/RegisterButton";
import RegisterFormParent from "../components/RegisterFormParent";
import RegisterFormChild from "../components/RegisterFormChild";
import SigninForm from "../components/SigninForm";
import SigninButton from "../components/SigninButton";
import {UserContext} from "../components/UserContext";
import {useContext} from "react";

export default function Home({
  accessMode,
  onClickRegister,
  onClickSignIn,
  loginMode,
  onClickParent,
  onClickChild,
  showPassword,
  onShowPassword,
  showConfirmedPassword,
  onShowConfirmedPassword,
}) {
  const {user, setUser} = useContext(UserContext);
  console.log(user);
  return (
    <>
      {user === null || user.length === 0 ? (
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
          </FlexContainer>
          {accessMode === "register" && (
            <>
              <RegisterFormParent
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
            />
          )}
        </>
      ) : (
        <>
          {user.isParent && (
            <>
              <h1 style={{textAlign: "center"}}>
                {user.firstName}&apos;s Dashboard
              </h1>
              <p style={{textAlign: "center"}}>
                Children accounts linked to your account
              </p>
              <FlexSection>
                <ChildrenContainer>
                  {user.children && user.children.length === 0 ? (
                    <NoChildLogins>
                      You didn&apos;t create any child logins yet
                    </NoChildLogins>
                  ) : (
                    user.children.map(child => {
                      return (
                        <>
                          <ChildButton>{child.firstName}</ChildButton>
                        </>
                      );
                    })
                  )}
                </ChildrenContainer>
                <ButtonContainer>
                  <AddChildButton
                    onClick={
                      loginMode === "child" ? onClickParent : onClickChild
                    }
                  >
                    Add child login
                  </AddChildButton>
                  <LogoutButton onClick={() => setUser(null)}>
                    Logout
                  </LogoutButton>
                </ButtonContainer>
              </FlexSection>
              {loginMode === "child" && (
                <>
                  <RegisterFormChild
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
            </>
          )}
          {user.isChild && (
            <>
              <h1 style={{textAlign: "center"}}>Welcome {user.firstName} </h1>
              <ChildLogoutButton onClick={() => setUser(null)}>
                Logout
              </ChildLogoutButton>
            </>
          )}
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
const FlexSection = styled.section`
  display: flex;
`;

const ChildrenContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 50%;
  padding-right: 2rem;
  gap: 1rem;
`;

const AddChildButton = styled.button`
  background: #401d1a;
  color: #e9f2ef;
  width: 7rem;
  box-shadow: 4px 4px 8px 1px rgba(64, 29, 26, 0.65);
  border-radius: 5px;
  border: none;

  :hover {
    transform: scale(1.1);
  }
`;

const ChildButton = styled.button`
  background: #5e8c49;
  box-shadow: 4px 4px 8px 1px rgba(104, 139, 81, 0.65);
  border-radius: 5px;
  color: #e9f2ef;
  border: none;
  width: 7rem;

  :hover {
    background: #224024;
    box-shadow: 4px 4px 8px 1px rgba(34, 64, 36, 0.65);
    transform: scale(1.1);
  }
`;

const LogoutButton = styled.button`
  background-color: #a61f2b;
  border-radius: 5px;
  color: #e9f2ef;
  border: none;
  width: 7rem;
  box-shadow: 4px 4px 8px 1px rgba(166, 31, 43, 0.65);

  :hover {
    background-color: #a61f43;
    box-shadow: 4px 4px 8px 1px rgba(166, 31, 67, 0.65);
    transform: scale(1.1);
  }
`;

const ChildLogoutButton = styled.button`
  background-color: #a61f2b;
  border-radius: 5px;
  color: #e9f2ef;
  border: none;
  width: 7rem;
  box-shadow: 4px 4px 8px 1px rgba(166, 31, 43, 0.65);

  :hover {
    background-color: #a61f43;
    box-shadow: 4px 4px 8px 1px rgba(166, 31, 67, 0.65);
    transform: scale(1.1);
  }
`;

const NoChildLogins = styled.p`
  width: 100%;
  text-align: center;
`;
