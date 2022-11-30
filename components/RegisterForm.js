import styled from "styled-components";
import {useState} from "react";

export default function RegisterForm({
  loginMode,
  onClickParent,
  onClickChild,
  showPassword,
  onShowPassword,
}) {
  const [inputPassword, setInputPassword] = useState("");
  const [inputRepeatPassword, setInputRepeatPassword] = useState("");

  const handleChangePassword = event => {
    setInputPassword(event.target.value);
    console.log(inputPassword);
  };

  const handleChangeRepeatPassword = event => {
    setInputRepeatPassword(event.target.value);
    console.log(inputRepeatPassword);
  };

  return (
    <RegForm>
      <LoginTypeFieldset>
        <DivParentRadioButton>
          <label>
            <input
              type="radio"
              name="register"
              value=""
              checked={loginMode === "parent" ? true : false}
              onClick={onClickParent}
            />
            {` Parent login`}
          </label>
        </DivParentRadioButton>
        <DivChildRadioButton>
          <label>
            <input type="radio" name="register" onClick={onClickChild} />
            {`    Child login`}
          </label>
        </DivChildRadioButton>
      </LoginTypeFieldset>
      {loginMode === "parent" && (
        <>
          <DetailsFieldset>
            <StyledDiv>
              <label>
                First Name
                <InputFirstName
                  type="text"
                  required
                  placeholder="Type your first name..."
                />
              </label>
            </StyledDiv>
            <StyledDiv>
              <label>
                Last Name
                <InputLastName
                  type="text"
                  required
                  placeholder="Type your last name..."
                />
              </label>
            </StyledDiv>
          </DetailsFieldset>
          <PasswordFieldset>
            <label>
              Choose a password
              <ChoosePasswordDiv>
                <InputChoosePassword
                  onChange={handleChangePassword}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Choose a safe password..."
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <icon onClick={onShowPassword}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54L2 5.27M12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"
                      />
                    </svg>
                  )}
                </icon>
              </ChoosePasswordDiv>
            </label>
            <label>
              Repeat password
              <InputRepeatPassword
                type="password"
                placeholder="Repeat password..."
                required
                onChange={handleChangeRepeatPassword}
              />
            </label>
          </PasswordFieldset>
          <CreateLoginButton
            onClick={event => {
              event.preventDefault();
            }}
          >
            Create parent login
          </CreateLoginButton>
        </>
      )}
      {loginMode === "child" && (
        <ChildLoginSection>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>
            To create a child login you must have a parent login. If you already
            have one please sign in. Otherwise, you can create your login right
            away.
          </p>
          <ButtonsDiv>
            <SigninButton
              onClick={event => {
                event.preventDefault();
              }}
            >
              Sign in
            </SigninButton>
            <CreateLoginButton
              onClick={event => {
                event.preventDefault();
              }}
            >
              Create parent login
            </CreateLoginButton>
          </ButtonsDiv>
        </ChildLoginSection>
      )}
    </RegForm>
  );
}

const RegForm = styled.form`
  margin: 1rem auto;
  border: 2px solid #688b51;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  border-radius: 1rem;
  font-size: 1.2rem;
`;

const LoginTypeFieldset = styled.fieldset`
  display: flex;
  border: none;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const DivParentRadioButton = styled.div`
  width: 50%;
`;

const DivChildRadioButton = styled.div`
  margin-left: auto;
  width: 50%;
`;

const DetailsFieldset = styled.fieldset`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  border: none;
`;

const InputFirstName = styled.input`
  width: 100%;
  border: none;
`;

const InputLastName = styled.input`
  margin-left: auto;
  width: 100%;
  border: none;
`;

const PasswordFieldset = styled.fieldset`
  width: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
`;

const ChoosePasswordDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const InputChoosePassword = styled.input`
  width: 90%;
  border: none;
  align-self: baseline;
`;

const InputRepeatPassword = styled.input`
  width: 100%;
  border: none;
`;

const StyledDiv = styled.div`
  width: 50%;
`;

const CreateLoginButton = styled.button`
  background-color: #688b51;
  border: none;
  border-radius: 8px;
  color: #e9f2ef;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  padding: 0.5rem 0;

  :hover {
    background-color: #224024;
    transform: scale(1.1);
  }
`;

const SigninButton = styled.button`
  background-color: #688b51;
  border: none;
  border-radius: 8px;
  color: #e9f2ef;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  padding: 0.5rem 0;

  :hover {
    background-color: #224024;
    transform: scale(1.1);
  }
`;

const ChildLoginSection = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonsDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
