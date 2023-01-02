import styled from "styled-components";
import {useState, useContext} from "react";
import {UserContext} from "./contexts/UserContext";
import {FormButton} from "./StyledComponents";
import {StyledIcon} from "./StyledComponents";

export default function SigninForm({showPassword, onShowPassword}) {
  const {setUser} = useContext(UserContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFilter, setLoginFilter] = useState({
    username: "",
    password: "",
  });

  const handleSubmitSigninForm = event => {
    event.preventDefault();
    const getUser = async () => {
      try {
        const urlParents = `/api/parents?username=${loginFilter.username}&password=${loginFilter.password}`;
        const urlChildren = `/api/children?username=${loginFilter.username}&password=${loginFilter.password}`;
        const parentsResponse = await fetch(urlParents);
        if (parentsResponse.ok) {
          const parentsData = await parentsResponse.json();
          if (parentsData.password === loginFilter.password) {
            setUser(parentsData);
          } else {
            setLoginFailed(true);
            setUser(null);
          }
        } else {
          const childrenResponse = await fetch(urlChildren);
          if (childrenResponse.ok) {
            const childrenData = await childrenResponse.json();
            if (childrenData.password === loginFilter.password) {
              setUser(childrenData);
            } else {
              setLoginFailed(true);
              setUser(null);
            }
          }
        }
      } catch {
        setLoginFailed(true);
      }
    };
    !loginFailed && getUser();
  };

  return (
    <>
      <SignForm onSubmit={handleSubmitSigninForm}>
        <DetailsFieldset>
          <StyledDiv>
            <label>
              Username
              <InputUsername
                type="text"
                required
                name="username"
                placeholder="Type your username..."
                value={loginFilter.username}
                onChange={event => {
                  const usernameInput = event.target.value;
                  setLoginFilter({...loginFilter, username: usernameInput});
                }}
              />
            </label>
          </StyledDiv>
        </DetailsFieldset>
        <PasswordFieldset>
          <label>
            Password
            <PasswordDiv>
              <InputPassword
                type={showPassword ? "text" : "password"}
                required
                name="password"
                placeholder="Type your password..."
                value={loginFilter.password}
                onChange={event => {
                  const passwordInput = event.target.value;
                  setLoginFilter({...loginFilter, password: passwordInput});
                }}
              />
              <StyledIcon onClick={onShowPassword}>
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
                    width="1rem"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"
                    />
                  </svg>
                )}
              </StyledIcon>
            </PasswordDiv>
          </label>
          {loginFailed && <ErrorText>User not found</ErrorText>}
          <FormButton
            type="submit"
            onClick={() => setLoginFailed(false)}
            style={{
              alignSelf: "center",
              fontSize: "1rem",
              width: "10rem",
              padding: "0.5rem 0",
            }}
          >
            Sign in
          </FormButton>
        </PasswordFieldset>
      </SignForm>
    </>
  );
}
const SignForm = styled.form`
  margin: 1rem auto;
  border: 2px solid #5e8c49;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  border-radius: 1rem;
  font-size: 1.2rem;
`;

const DetailsFieldset = styled.fieldset`
  display: flex;
  width: 100%;
  align-items: center;
  border: none;
`;

const InputUsername = styled.input`
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

const PasswordDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const InputPassword = styled.input`
  width: 100%;
  z-index: 1;
  border: none;
  align-self: baseline;
`;

const StyledDiv = styled.div`
  width: 100%;
`;

const ErrorText = styled.p`
  margin: -0.5rem 0;
  color: red;
  font-size: 0.9rem;
  width: 100%;
`;
