import styled from "styled-components";
import {useState, useContext} from "react";
import dynamic from "next/dynamic";
import {UserContext} from "./contexts/UserContext";

const ReactPasswordChecklist = dynamic(
  () => import("react-password-checklist"),
  {
    ssr: false,
  }
);

export default function RegisterFormChild({
  onClickParent,
  showPassword,
  onShowPassword,
  showConfirmedPassword,
  onShowConfirmedPassword,
  // onClickSignIn,
}) {
  const {user, setUser} = useContext(UserContext);
  const [regInput, setRegInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = event => {
    const {name, value} = event.target;
    setRegInput(prev => ({
      ...prev,
      [name]: value,
    }));
    validateInput(event);
  };

  const validateInput = event => {
    const {name, value} = event.target;
    setError(prev => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "firstName":
          if (!value) {
            stateObj[name] = "Please enter your first name";
          }
          break;

        case "lastName":
          if (!value) {
            stateObj[name] = "Please enter your last name";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (
            regInput.confirmPassword &&
            value !== regInput.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm password do not match";
          } else {
            stateObj["confirmPassword"] = regInput.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (regInput.password && value !== regInput.password) {
            stateObj[name] = "Password and Confirm Password do not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmitRegisterFormChild = async event => {
    event.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(event.target));
      const body = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        isChild: true,
        parentID: user._id,
        accounts: [],
      };

      const endpoint = "/api/children";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      if (regInput.password === regInput.confirmPassword) {
        const response = await fetch(endpoint, options);

        if (response.ok) {
          const data = await response.json();
          alert(
            `A new child ${data.firstName} ${data.lastName} has been added`
          );
          setRegInput({
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
          });
          onClickParent();
          setUser({...user, children: [...user.children, data]});
        } else {
          throw new Error(`Fetch failed with status: ${response.status}`);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <RegForm onSubmit={handleSubmitRegisterFormChild}>
      <>
        <DetailsFieldset>
          <label>
            First Name
            <InputFirstName
              type="text"
              placeholder="Type your first name..."
              name="firstName"
              value={regInput.firstName}
              required
              onChange={onInputChange}
              onBlur={validateInput}
            />
          </label>
          {error.firstName && <ErrorSpan>{error.firstName}</ErrorSpan>}
          <label>
            Last Name
            <InputLastName
              type="text"
              placeholder="Type your last name..."
              name="lastName"
              value={regInput.lastName}
              required
              onChange={onInputChange}
              onBlur={validateInput}
            />
          </label>
          {error.lastName && <ErrorSpan>{error.lastName}</ErrorSpan>}
        </DetailsFieldset>
        <PasswordFieldset>
          <label>
            Choose a password
            <ChoosePasswordDiv>
              <InputChoosePassword
                onChange={onInputChange}
                onBlur={validateInput}
                value={regInput.password}
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Choose a safe password..."
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
            </ChoosePasswordDiv>
            <PasswordErrorSpan>
              <ReactPasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "lowercase",
                ]}
                minLength={8}
                value={regInput.password}
                valueAgain={regInput.confirmPassword}
                messages={{
                  minLength: "Password has more than 8 characters",
                  specialChar: "Password has special characters",
                  number: "Password has at least a number",
                  capital: "Password has at least a capital letter",
                  lowercase: "Password has at least one lower case letter",
                }}
                iconSize={12}
              />
            </PasswordErrorSpan>
            {error.password && <ErrorSpan>{error.password}</ErrorSpan>}
          </label>

          <label>
            Confirm password
            <ChoosePasswordDiv>
              <InputConfirmPassword
                name="confirmPassword"
                value={regInput.confirmPassword}
                type={showConfirmedPassword ? "text" : "password"}
                placeholder="Confirm password..."
                required
                onChange={onInputChange}
                onBlur={validateInput}
              />

              <i onClick={onShowConfirmedPassword}>
                {showConfirmedPassword ? (
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
            </ChoosePasswordDiv>
            {error.confirmPassword && (
              <ErrorSpan>{error.confirmPassword}</ErrorSpan>
            )}
          </label>
        </PasswordFieldset>
        <CreateLoginButton type="submit">Create child login</CreateLoginButton>
      </>
    </RegForm>
  );
}

const RegForm = styled.form`
  margin: 1rem auto;
  border: 2px solid #688b51;
  width: 95%;
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
  flex-direction: column;
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

const InputConfirmPassword = styled.input`
  width: 100%;
  border: none;
`;

const CreateLoginButton = styled.button`
  border: none;
  border-radius: 8px;
  color: #e9f2ef;
  background-color: #688b51;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  padding: 0.5rem 0;
  box-shadow: 4px 4px 8px 1px rgba(104, 139, 81, 0.65);

  :hover {
    background-color: #224024;
    box-shadow: 4px 4px 8px 1px rgba(34, 64, 36, 0.65);
    transform: scale(1.1);
    transition: ease-in 0.2s;
  }
`;

const ErrorSpan = styled.span`
  color: red;
  font-size: 0.9rem;
  width: 100%;
`;

const PasswordErrorSpan = styled.span`
  font-size: 0.8rem;
  width: 100%;
  display: flex;
  align-items: flex-end;
`;
