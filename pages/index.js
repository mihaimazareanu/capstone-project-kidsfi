import styled from "styled-components";
import RegisterButton from "../components/RegisterButton";
import RegisterFormParent from "../components/RegisterFormParent";
import RegisterFormChild from "../components/RegisterFormChild";
import SigninForm from "../components/SigninForm";
import SigninButton from "../components/SigninButton";
import {UserContext} from "../components/contexts/UserContext";
import {PageContext} from "../components/contexts/PageContext";
import {AccountContext} from "../components/contexts/AccountContext";
import {useContext, useState} from "react";
import {LogoutButton} from "../components/StyledComponents";
import {FormButton} from "../components/StyledComponents";
import {StartPageButton} from "../components/StyledComponents";
import {AddChildButton} from "../components/StyledComponents";
import Lottie from "react-lottie";
import animationDataWelcome from "../public/lotties/Welcome.json";
import animationDataFinance from "../public/lotties/Finance.json";
import animationDataPiggyBank from "../public/lotties/piggy-bank.json";
import animationDataArrows from "../public/lotties/arrows.json";
import Link from "next/link";
import Layout from "../components/Layout";

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
  const {handleClickLink} = useContext(PageContext);
  const {account, handleAccount} = useContext(AccountContext);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accountType, setAccountType] = useState("");

  // default Options for Lottie animations
  const defaultOptionsWelcome = {
    loop: true,
    autoplay: true,
    animationData: animationDataWelcome,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsFinance = {
    loop: true,
    autoplay: true,
    animationData: animationDataFinance,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsPiggyBank = {
    loop: true,
    autoplay: true,
    animationData: animationDataPiggyBank,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsArrows = {
    loop: true,
    autoplay: true,
    animationData: animationDataArrows,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // function to toggle if the section to add money accounts should be displayed or not
  const toggleSelectedChild = id => {
    selectedChild === id ? setSelectedChild(null) : setSelectedChild(id);
  };

  // function to be executed when "Add account" button is pressed
  const handleSubmitAccount = async event => {
    event.preventDefault();
    try {
      const body = {
        name: accountType,
        startAmount: account.startAmount,
        interestRate: account.interestRate,
        stockName: account.stockName,
        WKN: account.WKN,
        startDate: account.startDate,
        pcs: account.pcs,
      };
      const endpoint = `/api/children/${selectedChild}/accounts`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(endpoint, options);
      if (response.ok) {
        console.log(account);
        console.log(user);
        setUser(prevUser => {
          const updatedUser = {
            ...prevUser,
            children: prevUser.children.map(child => {
              if (child._id === selectedChild) {
                return {
                  ...child,
                  accounts: [...child.accounts, account],
                };
              }
              return child;
            }),
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
        setShowAddAccount(!showAddAccount);
        setAccountType("");
      } else {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user === null ? (
        <>
          <Layout />
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
          <Lottie
            options={defaultOptionsFinance}
            width={"100%"}
            height={"100%"}
          ></Lottie>
        </>
      ) : (
        <>
          <Layout />
          {user?.isParent ? (
            <>
              <h1 style={{textAlign: "center", paddingTop: "1rem"}}>
                {user.firstName}&apos;s Dashboard
              </h1>
              <p style={{textAlign: "center"}}>
                Children accounts linked to your account
              </p>
              <FlexSection>
                <ChildrenContainer>
                  {user?.children?.length === 0 ? (
                    <NoChildLogins>
                      You didn&apos;t create any child logins yet
                    </NoChildLogins>
                  ) : (
                    user?.children?.map(child => {
                      return (
                        <>
                          <section>
                            <FormButton
                              style={{width: "7rem"}}
                              onClick={() => toggleSelectedChild(child._id)}
                            >
                              {child.firstName}
                            </FormButton>
                          </section>
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
                  <LogoutButton
                    onClick={() => {
                      setUser(null);
                      onClickParent();
                      setSelectedChild(null);
                      setShowAddAccount(false);
                      handleAccount(null);
                      handleClickLink("home");
                    }}
                  >
                    Logout
                  </LogoutButton>
                </ButtonContainer>
              </FlexSection>
              {user?.children?.map(child => {
                return (
                  selectedChild === child._id && (
                    <>
                      <ChildSection>
                        <article
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <h2 style={{textAlign: "center", marginLeft: "1rem"}}>
                            {child.firstName}&apos;s accounts:
                          </h2>
                          <StartPageButton
                            style={{
                              alignSelf: "flex-end",
                              background: "none",
                            }}
                            onClick={() => setShowAddAccount(!showAddAccount)}
                          >
                            <svg
                              style={{marginRight: "1rem"}}
                              width="39"
                              height="39"
                              viewBox="0 0 39 39"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.5 28.875C20.0312 28.875 20.4769 28.695 20.8369 28.335C21.1956 27.9762 21.375 27.5312 21.375 27V21.375H27.0469C27.5781 21.375 28.0156 21.195 28.3594 20.835C28.7031 20.4762 28.875 20.0312 28.875 19.5C28.875 18.9688 28.695 18.5231 28.335 18.1631C27.9762 17.8044 27.5312 17.625 27 17.625H21.375V11.9531C21.375 11.4219 21.1956 10.9844 20.8369 10.6406C20.4769 10.2969 20.0312 10.125 19.5 10.125C18.9688 10.125 18.5238 10.3044 18.165 10.6631C17.805 11.0231 17.625 11.4688 17.625 12V17.625H11.9531C11.4219 17.625 10.9844 17.8044 10.6406 18.1631C10.2969 18.5231 10.125 18.9688 10.125 19.5C10.125 20.0312 10.3044 20.4762 10.6631 20.835C11.0231 21.195 11.4688 21.375 12 21.375H17.625V27.0469C17.625 27.5781 17.805 28.0156 18.165 28.3594C18.5238 28.7031 18.9688 28.875 19.5 28.875ZM19.5 38.25C16.9062 38.25 14.4688 37.7575 12.1875 36.7725C9.90625 35.7887 7.92188 34.4531 6.23438 32.7656C4.54688 31.0781 3.21125 29.0938 2.2275 26.8125C1.2425 24.5312 0.75 22.0938 0.75 19.5C0.75 16.9062 1.2425 14.4688 2.2275 12.1875C3.21125 9.90625 4.54688 7.92188 6.23438 6.23438C7.92188 4.54688 9.90625 3.21062 12.1875 2.22562C14.4688 1.24187 16.9062 0.75 19.5 0.75C22.0938 0.75 24.5312 1.24187 26.8125 2.22562C29.0938 3.21062 31.0781 4.54688 32.7656 6.23438C34.4531 7.92188 35.7887 9.90625 36.7725 12.1875C37.7575 14.4688 38.25 16.9062 38.25 19.5C38.25 22.0938 37.7575 24.5312 36.7725 26.8125C35.7887 29.0938 34.4531 31.0781 32.7656 32.7656C31.0781 34.4531 29.0938 35.7887 26.8125 36.7725C24.5312 37.7575 22.0938 38.25 19.5 38.25ZM19.5 34.5C23.6562 34.5 27.1956 33.0394 30.1181 30.1181C33.0394 27.1956 34.5 23.6562 34.5 19.5C34.5 15.3438 33.0394 11.8044 30.1181 8.88188C27.1956 5.96062 23.6562 4.5 19.5 4.5C15.3438 4.5 11.805 5.96062 8.88375 8.88188C5.96125 11.8044 4.5 15.3438 4.5 19.5C4.5 23.6562 5.96125 27.1956 8.88375 30.1181C11.805 33.0394 15.3438 34.5 19.5 34.5Z"
                                fill="#401D1A"
                              />
                            </svg>
                          </StartPageButton>
                        </article>
                        <AccountsList>
                          {child.accounts.length !== 0 ? (
                            child.accounts.map(account => (
                              <>
                                <ListElementsContainer>
                                  <li>{account.name}</li>
                                  <li style={{margin: "0 3rem 0 auto"}}>
                                    {account.startAmount} €
                                  </li>
                                </ListElementsContainer>
                              </>
                            ))
                          ) : (
                            <p>No accounts yet.</p>
                          )}
                        </AccountsList>
                      </ChildSection>
                      {showAddAccount && (
                        <>
                          <ChildSection>
                            <label
                              htmlFor="addAccount"
                              style={{margin: "1rem"}}
                            >
                              What type of account would you like to add?
                            </label>
                            <StyledSelect
                              id="addAccount"
                              required
                              onChange={event => {
                                setAccountType(event.target.value);
                              }}
                            >
                              <option value="">Select an option...</option>
                              <option value="Piggy bank">Piggy bank</option>
                              <option value="Savings account">
                                Savings account
                              </option>
                              <option value="Stocks account">
                                Stocks account
                              </option>
                              <option value="Loan account">Loan account</option>
                            </StyledSelect>
                          </ChildSection>
                          {accountType === "Piggy bank" && (
                            <>
                              <StyledForm
                                onSubmit={handleSubmitAccount}
                                style={{
                                  flexDirection: "row",
                                  gap: "1rem",
                                  padding: "1rem 0",
                                }}
                              >
                                <label>
                                  {`Current amount €   `}
                                  <StyledInput
                                    onChange={event =>
                                      handleAccount({
                                        ...account,
                                        name: "Piggy bank",
                                        startAmount: event.target.value,
                                      })
                                    }
                                    required
                                    type="text"
                                  />
                                </label>
                                <AddChildButton
                                  type="submit"
                                  style={{
                                    alignSelf: "center",
                                  }}
                                >
                                  Add account
                                </AddChildButton>
                              </StyledForm>
                            </>
                          )}
                          {accountType === "Savings account" && (
                            <>
                              <StyledForm onSubmit={handleSubmitAccount}>
                                <StyledFieldset>
                                  <label>
                                    {`Start date    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          name: "Savings account",
                                          startDate: event.target.value,
                                        })
                                      }
                                      type="date"
                                      required
                                    />
                                  </label>
                                  <label>
                                    {`Start amount €    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          startAmount: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                  </label>
                                </StyledFieldset>
                                <StyledFieldset>
                                  <label>
                                    {`Interest rate    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          interestRate: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                    {` %`}
                                  </label>
                                  <AddChildButton style={{alignSelf: "center"}}>
                                    Add account
                                  </AddChildButton>
                                </StyledFieldset>
                              </StyledForm>
                            </>
                          )}
                          {accountType === "Stocks account" && (
                            <>
                              <StyledForm onSubmit={handleSubmitAccount}>
                                <StyledFieldset>
                                  <label>
                                    {`Stock name    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          name: "Stocks account",
                                          stockName: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                    />
                                  </label>
                                  <label>
                                    {`WKN    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          WKN: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                  </label>
                                </StyledFieldset>
                                <StyledFieldset>
                                  <label>
                                    {`Buy date   `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          startDate: event.target.value,
                                        })
                                      }
                                      type="date"
                                      required
                                    />
                                  </label>
                                  <label>
                                    {`Buy amount €    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          startAmount: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                  </label>
                                </StyledFieldset>
                                <StyledFieldset>
                                  <label>
                                    {`No of stocks    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          pcs: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                  </label>
                                  <AddChildButton style={{alignSelf: "center"}}>
                                    Add account
                                  </AddChildButton>
                                </StyledFieldset>
                              </StyledForm>
                            </>
                          )}
                          {accountType === "Loan account" && (
                            <>
                              <StyledForm onSubmit={handleSubmitAccount}>
                                <StyledFieldset>
                                  <label>
                                    {`Start date    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          name: "Loan account",
                                          startDate: event.target.value,
                                        })
                                      }
                                      type="date"
                                      required
                                    />
                                  </label>
                                  <label>
                                    {`Start amount €    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          startAmount: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                  </label>
                                </StyledFieldset>
                                <StyledFieldset>
                                  <label>
                                    {`Interest rate    `}
                                    <StyledInput
                                      onChange={event =>
                                        handleAccount({
                                          ...account,
                                          interestRate: event.target.value,
                                        })
                                      }
                                      type="text"
                                      required
                                      style={{width: "3rem"}}
                                    />
                                    {` %`}
                                  </label>
                                  <AddChildButton style={{alignSelf: "center"}}>
                                    Add account
                                  </AddChildButton>
                                </StyledFieldset>
                              </StyledForm>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )
                );
              })}
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
          ) : (
            user && (
              <>
                <StyledAnimationContainer>
                  <div style={{width: "40%"}}>
                    <h1 style={{textAlign: "center"}}>
                      Welcome {user.firstName}
                    </h1>
                    <p>Want to see your accounts?</p>
                    <Lottie
                      style={{marginTop: "-2rem"}}
                      options={defaultOptionsArrows}
                      width={"20%"}
                      height={"50%"}
                    />
                  </div>
                  <div style={{height: "100%", width: "60%"}}>
                    <Lottie
                      options={defaultOptionsWelcome}
                      width={"100%"}
                      height={"100%"}
                    ></Lottie>
                  </div>
                </StyledAnimationContainer>
                <PiggyBankAnimationContainer>
                  <Link
                    style={{width: "50%"}}
                    href="/accounts"
                    onClick={() => handleClickLink("accounts")}
                  >
                    <Lottie
                      style={{
                        marginLeft: "1rem",
                      }}
                      options={defaultOptionsPiggyBank}
                      width={"80%"}
                      height={"80%"}
                    />
                  </Link>
                  <LogoutButton
                    style={{margin: "1rem 1rem 0 auto"}}
                    onClick={() => {
                      setUser(null);
                      handleClickLink("home");
                    }}
                  >
                    Logout
                  </LogoutButton>
                </PiggyBankAnimationContainer>
              </>
            )
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
  /* justify-content: flex-end; */
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

const NoChildLogins = styled.p`
  width: 100%;
  text-align: center;
`;

const ChildSection = styled.section`
  width: 100%;
  border: 3px solid #5e8c49;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 1rem;
`;

const StyledSelect = styled.select`
  border: 1px solid #5e8c49;
  border-radius: 5px;
  margin: 0 1rem 1rem 1rem;
  color: #401d1a;
`;

const StyledForm = styled.form`
  width: 100%;
  border: 3px solid #5e8c49;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 1rem;
  padding: 0 1rem;
`;

const StyledFieldset = styled.fieldset`
  width: 100%;
  border: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 1px solid #5e8c49;
  border-radius: 5px;
  color: #401d1a;
`;

const StyledAnimationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-left: 1rem;
`;

const AccountsList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;
const ListElementsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 5rem;
`;

const PiggyBankAnimationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
