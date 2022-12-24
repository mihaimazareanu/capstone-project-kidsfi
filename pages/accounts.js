import Head from "next/head";
import {useContext, useState, useEffect} from "react";
import Lottie from "react-lottie";
import {UserContext} from "../components/contexts/UserContext";
import animationDataUnderConstruction from "../public/lotties/under-construction.json";
import animationDataPiggyAccount from "../public/lotties/piggy-account.json";
import animationDataMouse from "../public/lotties/mouse.json";
import animationDataStocks from "../public/lotties/stocks.json";
import animationDataLoan from "../public/lotties/loan.json";
import animationDataGraph from "../public/lotties/graph.json";
import Layout from "../components/Layout";
import styled from "styled-components";

export default function Accounts() {
  const {user} = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [accountType, setAccountType] = useState("");

  const accountName = user?.accounts?.map(account => account.name);

  const toggleShowDetails = type => {
    setAccountType(type);
    setShowDetails(type !== accountType ? true : !showDetails);
    setShowMoreDetails(false);
  };

  const piggyBank = user?.accounts
    ? user?.accounts?.find(account => {
        if (account.name === "Piggy bank") {
          return true;
        } else {
          return false;
        }
      })
    : null;
  const savingsAccount = user?.accounts
    ? user.accounts.find(account => {
        if (account.name === "Savings account") {
          return true;
        } else {
          return false;
        }
      })
    : null;

  const [date, setDate] = useState(null);

  useEffect(() => {
    if (savingsAccount?.startDate) {
      const date = new Date(savingsAccount.startDate);
      const formattedDate = date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      setDate(formattedDate);
    }
  }, []);

  // const stocksAccount = user?.accounts
  //   ? user?.accounts?.find(account => {
  //       if (account.name === "Stocks account") {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     })
  //   : null;

  const loanAccount = user?.accounts
    ? user?.accounts?.find(account => {
        if (account.name === "Loan account") {
          return true;
        } else {
          return false;
        }
      })
    : null;

  // default Options for Lottie animations
  const defaultOptionsUnderConstruction = {
    loop: true,
    autoplay: true,
    animationData: animationDataUnderConstruction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsPiggyAccount = {
    loop: true,
    autoplay: true,
    animationData: animationDataPiggyAccount,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsMouse = {
    loop: true,
    autoplay: true,
    animationData: animationDataMouse,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsStocks = {
    loop: true,
    autoplay: true,
    animationData: animationDataStocks,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsLoan = {
    loop: true,
    autoplay: true,
    animationData: animationDataLoan,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsGraph = {
    loop: true,
    autoplay: true,
    animationData: animationDataGraph,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      <Layout />
      {user?.isChild ? (
        user.accounts?.length !== 0 ? (
          <>
            <StyledAnimationContainer>
              {accountName?.includes("Piggy bank") && (
                <StyledButton onClick={() => toggleShowDetails("piggy bank")}>
                  <Lottie
                    options={defaultOptionsPiggyAccount}
                    width={"5rem"}
                    height={"5rem"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Savings account") && (
                <StyledButton
                  onClick={() => toggleShowDetails("savings account")}
                >
                  <Lottie
                    options={defaultOptionsMouse}
                    width={"5rem"}
                    height={"5rem"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Stocks account") && (
                <StyledButton
                  onClick={() => toggleShowDetails("stocks account")}
                >
                  <Lottie
                    options={defaultOptionsStocks}
                    width={"5rem"}
                    height={"5rem"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Loan account") && (
                <StyledButton onClick={() => toggleShowDetails("loan account")}>
                  <Lottie
                    options={defaultOptionsLoan}
                    width={"5rem"}
                    height={"5rem"}
                  />
                </StyledButton>
              )}
            </StyledAnimationContainer>
            {showDetails && (
              <StyledSection>
                {accountType === "piggy bank" && (
                  <>
                    {piggyBank.startAmount && (
                      <>
                        <p>Current amount: {piggyBank?.startAmount} €</p>
                        <button
                          onClick={() => setShowMoreDetails(!showMoreDetails)}
                        >
                          {showMoreDetails ? "Hide details" : "Show details"}
                        </button>
                        {showMoreDetails && (
                          <>
                            <ul>
                              <li>List of all deposits</li>
                              <li>Deposit 1</li>
                              <li>Deposit 2</li>
                              <li>Deposit 3</li>
                            </ul>
                            <ul>
                              <li>List of all withdrawals</li>
                              <li>Withdrawal 1</li>
                              <li>Withdrawal 2</li>
                              <li>Withdrawal 3</li>
                            </ul>
                            <select>
                              <option value="">Select one...</option>
                              <option value="Since the beginning">
                                Since the beginning
                              </option>
                              <option value="Since yesterday">
                                Since yesterday
                              </option>
                              <option value="Since 7 days ago">
                                Since 7 days ago
                              </option>
                              <option value="Since one month ago">
                                Since one month ago
                              </option>
                              <option value="Since one year ago">
                                Since one year ago
                              </option>
                              <option value="Since beginnin of the year">
                                Since beginnin of the year
                              </option>
                            </select>
                            <Lottie
                              options={defaultOptionsGraph}
                              width={"20rem"}
                              height={"20rem"}
                            />
                          </>
                        )}

                        <form>
                          <label>
                            Would you like to add something to your piggy bank?
                            <input type="text" /> €
                            <button type="submit">Add amount</button>
                          </label>
                        </form>
                        <form>
                          <label>
                            Did you take money from your piggy bank?
                            <input type="text" /> €
                            <button type="submit">Subtract amount</button>
                          </label>
                        </form>
                      </>
                    )}
                  </>
                )}
                {accountType === "savings account" && (
                  <>
                    <p>Start amount: {savingsAccount.startAmount} €</p>
                    <p>Current amount: {savingsAccount.startAmount} €</p>

                    <button
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                    >
                      {showMoreDetails ? "Hide details" : "Show details"}
                    </button>
                    {showMoreDetails && (
                      <>
                        <p>Start date: {date}</p>
                        <select>
                          <option value="">Select one...</option>
                          <option value="Since the beginning">
                            Since the beginning
                          </option>
                          <option value="Since yesterday">
                            Since yesterday
                          </option>
                          <option value="Since 7 days ago">
                            Since 7 days ago
                          </option>
                          <option value="Since one month ago">
                            Since one month ago
                          </option>
                          <option value="Since one year ago">
                            Since one year ago
                          </option>
                          <option value="Since beginnin of the year">
                            Since beginnin of the year
                          </option>
                        </select>
                        <Lottie
                          options={defaultOptionsGraph}
                          width={"20rem"}
                          height={"20rem"}
                        />
                      </>
                    )}
                  </>
                )}
                {accountType === "stocks account" && (
                  <p>Stocks account details</p>
                )}
                {accountType === "loan account" && (
                  <>
                    <p>Start amount: {loanAccount.startAmount} €</p>
                    <p>Current amount: {loanAccount.startAmount} €</p>

                    <button
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                    >
                      {showMoreDetails ? "Hide details" : "Show details"}
                    </button>
                    {showMoreDetails && (
                      <>
                        <p>Start date: {date}</p>
                        <select>
                          <option value="">Select one...</option>
                          <option value="Since the beginning">
                            Since the beginning
                          </option>
                          <option value="Since yesterday">
                            Since yesterday
                          </option>
                          <option value="Since 7 days ago">
                            Since 7 days ago
                          </option>
                          <option value="Since one month ago">
                            Since one month ago
                          </option>
                          <option value="Since one year ago">
                            Since one year ago
                          </option>
                          <option value="Since beginnin of the year">
                            Since beginnin of the year
                          </option>
                        </select>
                        <Lottie
                          options={defaultOptionsGraph}
                          width={"20rem"}
                          height={"20rem"}
                        />
                      </>
                    )}
                  </>
                )}
              </StyledSection>
            )}
          </>
        ) : (
          <p>
            You don&apos;t have any accounts yet. Please ask your parents to
            create some for you.
          </p>
        )
      ) : (
        <Lottie
          options={defaultOptionsUnderConstruction}
          width={"36%"}
          height={"28%"}
          style={{paddingTop: "15rem"}}
        />
      )}
    </>
  );
}

const StyledAnimationContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5%;
  align-items: flex-end;
`;

const StyledSection = styled.section`
  width: 100%;
  border: 3px solid #5e8c49;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  padding-left: 1rem;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
`;
