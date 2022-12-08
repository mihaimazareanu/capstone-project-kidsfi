import styled from "styled-components";
import {useState, useEffect} from "react";

export default function SigninForm({showPassword, onShowPassword, onSignIn}) {
  const [users, setUsers] = useState([]);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFilter, setLoginFilter] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleLoginFailed = () => {
    setLoginFailed(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const urlParents =
          loginFilter.firstName.length === 0
            ? `/api/parents`
            : `/api/parents?firstName=${loginFilter.firstName}`;
        const urlChildren =
          loginFilter.firstName.length === 0
            ? `/api/children`
            : `/api/children?firstName=${loginFilter.firstName}`;
        const parentsResponse = await fetch(urlParents);
        if (parentsResponse.ok) {
          const parentsData = await parentsResponse.json();
          if (parentsData.length > 0) {
            setUsers(parentsData);
          } else {
            const childrenResponse = await fetch(urlChildren);
            const childrenData = await childrenResponse.json();
            setUsers(childrenData);
          }
        } else {
          throw new Error(`Fetch failed`);
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    getUsers();
  }, [loginFilter]);

  const handleSubmitSigninForm = event => {
    event.preventDefault();
    users.length === 0
      ? handleLoginFailed()
      : users.map(user => {
          user.firstName === loginFilter.firstName && onSignIn();
        });
  };

  return (
    <>
      <SignForm onSubmit={handleSubmitSigninForm}>
        <DetailsFieldset>
          <StyledDiv>
            <label>
              First Name
              <InputFirstName
                type="text"
                required
                placeholder="Type your first name..."
                value={loginFilter.firstName}
                onChange={event => {
                  const firstNameInput = event.target.value;
                  setLoginFilter({...loginFilter, firstName: firstNameInput});
                }}
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
                value={loginFilter.lastName}
                onChange={event => {
                  const lastNameInput = event.target.value;
                  setLoginFilter({...loginFilter, lastName: lastNameInput});
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
                placeholder="Type your password..."
                value={loginFilter.password}
                onChange={event => {
                  const passwordInput = event.target.value;
                  setLoginFilter({...loginFilter, password: passwordInput});
                }}
              />
              <i onClick={onShowPassword}>
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
              </i>
            </PasswordDiv>
          </label>
          {loginFailed && <ErrorText>User not found</ErrorText>}
          <SigninButton>Sign in</SigninButton>
        </PasswordFieldset>
      </SignForm>
    </>
  );
}
const SignForm = styled.form`
  margin: 1rem auto;
  border: 2px solid #688b51;
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

const PasswordDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const InputPassword = styled.input`
  width: 90%;
  border: none;
  align-self: baseline;
`;

const StyledDiv = styled.div`
  width: 50%;
`;

const SigninButton = styled.button`
  align-self: center;
  background-color: #688b51;
  border: none;
  border-radius: 8px;
  color: #e9f2ef;
  /* margin-bottom: 0.5rem; */
  font-size: 1rem;
  width: 10rem;
  padding: 0.5rem 0;

  :hover {
    background-color: #224024;
    transform: scale(1.1);
  }
`;

const ErrorText = styled.p`
  margin: -0.5rem 0;
  color: red;
  font-size: 0.9rem;
  width: 100%;
`;
