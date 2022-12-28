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
import {
  FormButton,
  PasswordDiv,
  StyledForm,
  StyledInput,
  StyledList,
} from "../components/StyledComponents";

export default function Accounts() {
  const {user, setUser} = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [fetchReload, setFetchReload] = useState(false);

  const accountName = user?.accounts?.map(account => account.name);

  const toggleShowDetails = type => {
    setAccountType(type);
    setShowDetails(type !== accountType ? true : !showDetails);
    setShowMoreDetails(false);
  };

  const [piggyBank, setPiggyBank] = useState(null);

  function calculate() {
    let addAmount = Number(
      user?.accounts?.find(account => {
        if (account.name === "Piggy bank") {
          return true;
        } else {
          return false;
        }
      }).startAmount
    );
    piggyBank?.transactions?.forEach(transaction => {
      if (transaction.typeOfTransaction === "deposit") {
        addAmount = addAmount + Number(transaction.amount);
        return;
      } else if (transaction.typeOfTransaction === "withdrawal") {
        addAmount = addAmount - Number(transaction.amount);
        return;
      } else {
        alert("Type of transaction is missing");
        return;
      }
    });
    return addAmount;
  }

  const amount = calculate();

  useEffect(() => {
    if (user) {
      setPiggyBank(
        user?.accounts?.find(account => {
          if (account.name === "Piggy bank") {
            return true;
          } else {
            return false;
          }
        })
      );
      if (!currentAmount && currentAmount !== 0) {
        setCurrentAmount(
          user?.accounts?.find(account => {
            if (account.name === "Piggy bank") {
              return true;
            } else {
              return false;
            }
          }).startAmount
        );
        setFetchReload(!fetchReload);
      }
    }
  }, [user]);

  const [currentAmount, setCurrentAmount] = useState(piggyBank?.startAmount);

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

  const stocksAccount = user?.accounts
    ? user?.accounts?.find(account => {
        if (account.name === "Stocks account") {
          return true;
        } else {
          return false;
        }
      })
    : null;

  const loanAccount = user?.accounts
    ? user?.accounts?.find(account => {
        if (account.name === "Loan account") {
          return true;
        } else {
          return false;
        }
      })
    : null;

  // function to update the piggy bank account

  const updateAccount = async (event, type) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const amount = data.amount;
    const transaction = {
      amount: amount,
      date: Date.now(),
      typeOfTransaction: type,
    };
    const accountId = user?.accounts?.find(
      account => account.name === accountType
    )?._id;
    try {
      await fetch(
        `/api/children/${user._id}/accounts/${accountId}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: accountId,
            transaction: transaction,
          }),
        }
      );
      // setUser(prevUser => {
      //   const updatedUser = {
      //     ...prevUser,
      //     accounts: prevUser.accounts.map(account => {
      //       if (account._id === accountId) {
      //         return {
      //           ...account,
      //           transactions: [...account.transactions, transaction],
      //         };
      //       }
      //       return account;
      //     }),
      //   };
      //   localStorage.setItem("user", JSON.stringify(updatedUser));
      //   return updatedUser;
      // });
      setFetchReload(!fetchReload);
    } catch (error) {
      alert(error.message);
    }
    event.target.reset();
  };

  useEffect(() => {
    const calculateCurrentAmount = () => {
      let addAmount = Number(piggyBank?.startAmount);
      piggyBank?.transactions?.forEach(transaction => {
        if (transaction.typeOfTransaction === "deposit") {
          addAmount = addAmount + Number(transaction.amount);
          return;
        } else if (transaction.typeOfTransaction === "withdrawal") {
          addAmount = addAmount - Number(transaction.amount);
          return;
        } else {
          alert("Type of transaction is missing");
          return;
        }
      });
      setCurrentAmount(addAmount);
    };

    if (user) {
      const getUser = async () => {
        try {
          const urlChildren = `/api/children/?firstName=${user.firstName}`;
          const childrenResponse = await fetch(urlChildren);
          if (childrenResponse.ok) {
            const childrenData = await childrenResponse.json();
            setUser(childrenData);
          }
        } catch {
          throw new Error(`Fetch failed`);
        }
      };
      getUser();
      calculateCurrentAmount();
    }

    (currentAmount || currentAmount === 0) && calculateCurrentAmount();
  }, [fetchReload]);

  // console.log(currentAmount);

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
                <StyledButton onClick={() => toggleShowDetails("Piggy bank")}>
                  <Lottie
                    options={defaultOptionsPiggyAccount}
                    width={"5rem"}
                    height={"5rem"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Savings account") && (
                <StyledButton
                  onClick={() => toggleShowDetails("Savings account")}
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
                  onClick={() => toggleShowDetails("Stocks account")}
                >
                  <Lottie
                    options={defaultOptionsStocks}
                    width={"5rem"}
                    height={"5rem"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Loan account") && (
                <StyledButton onClick={() => toggleShowDetails("Loan account")}>
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
                {accountType === "Piggy bank" && (
                  <>
                    {piggyBank?.startAmount && (
                      <>
                        <PasswordDiv>
                          <p>Current amount: {amount} €</p>
                          <FormButton
                            style={{marginLeft: "auto"}}
                            onClick={() => setShowMoreDetails(!showMoreDetails)}
                          >
                            {showMoreDetails ? "Hide details" : "Show details"}
                          </FormButton>
                        </PasswordDiv>
                        {showMoreDetails && (
                          <>
                            <StyledList>
                              <li>List of all deposits</li>
                              {user?.accounts
                                ?.find(account => account.name === "Piggy bank")
                                ?.transactions?.filter(
                                  transaction =>
                                    transaction.typeOfTransaction === "deposit"
                                )
                                .map((deposit, index) => (
                                  <>
                                    <li key={index}>
                                      Amount : {deposit.amount}
                                    </li>
                                    <li>Date: {deposit.date}</li>
                                  </>
                                ))}
                            </StyledList>
                            <StyledList>
                              <li>List of all withdrawals</li>
                              {user?.accounts
                                ?.find(account => account.name === "Piggy bank")
                                ?.transactions?.filter(
                                  transaction =>
                                    transaction.typeOfTransaction ===
                                    "withdrawal"
                                ).length !== 0 ? (
                                user?.accounts
                                  ?.find(
                                    account => account.name === "Piggy bank"
                                  )
                                  ?.transactions?.filter(
                                    transaction =>
                                      transaction.typeOfTransaction ===
                                      "withdrawal"
                                  )
                                  .map((withdrawal, index) => (
                                    <li key={index}>{withdrawal.amount}</li>
                                  ))
                              ) : (
                                <li>No withdrawals</li>
                              )}
                            </StyledList>
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

                        <StyledForm
                          onSubmit={event => updateAccount(event, "deposit")}
                        >
                          <label>
                            Would you like to add something to your piggy bank?
                            <StyledInput
                              style={{width: "3rem", margin: "0 0.5rem"}}
                              name="amount"
                              type="number"
                            />
                            {`€   `}
                          </label>
                          <FormButton
                            // style={{alignSelf: "flex-end"}}
                            type="submit"
                          >
                            Add amount
                          </FormButton>
                        </StyledForm>
                        <StyledForm
                          onSubmit={event => updateAccount(event, "withdrawal")}
                        >
                          <label>
                            Did you take money from your piggy bank?
                            <StyledInput
                              style={{width: "3rem", margin: "0 0.5rem"}}
                              name="amount"
                              type="number"
                            />
                            {`€   `}
                          </label>
                          <FormButton type="submit">Subtract amount</FormButton>
                        </StyledForm>
                      </>
                    )}
                  </>
                )}
                {accountType === "Savings account" && (
                  <>
                    <p>Start amount: {savingsAccount.startAmount} €</p>
                    <p>Current amount: {savingsAccount.startAmount} €</p>

                    <FormButton
                      style={{alignSelf: "center"}}
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                    >
                      {showMoreDetails ? "Hide details" : "Show details"}
                    </FormButton>
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
                {accountType === "Stocks account" && (
                  <>
                    <p>Start amount: {stocksAccount.startAmount} €</p>
                    <p>Current amount: {stocksAccount.startAmount} €</p>

                    <button
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                    >
                      {showMoreDetails ? "Hide details" : "Show details"}
                    </button>
                    {showMoreDetails && (
                      <>
                        <p>Name: {stocksAccount.stockName}</p>
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
                {accountType === "Loan account" && (
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
  margin: 1rem 0;
  padding: 0.5rem;
  gap: 1rem;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
`;
