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
  StyledAnimationContainer,
} from "../components/StyledComponents";

export default function Accounts() {
  const {user, setUser} = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [fetchReload, setFetchReload] = useState(false);
  const [piggyBank, setPiggyBank] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [filteredArray, setFilteredArray] = useState(
    piggyBank?.transactions ?? []
  );

  const accountName = user?.accounts
    ? user?.accounts?.map(account => account.name)
    : null;

  const toggleShowDetails = type => {
    setAccountType(type);
    setShowDetails(type !== accountType ? true : !showDetails);
    setShowMoreDetails(false);
  };

  // Functions for the piggy bank account START

  function calculatePiggyBank() {
    if (user?.accounts?.length !== 0) {
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
  }

  const piggyBankAmount = calculatePiggyBank();

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
        user?.accounts?.length !== 0 &&
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
          const urlChildren = `/api/children?username=${user.username}&password=${user.password}`;
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

    filterHandler(filterValue);

    (currentAmount || currentAmount === 0) && calculateCurrentAmount();
  }, [fetchReload]);

  //START graph animation

  // const [maxHeight, setMaxHeight] = useState(null);

  function calculateGraphBars() {
    if (piggyBank) {
      let prevAmount = piggyBank?.startAmount;
      let highestAmount = prevAmount;
      const resultOfMapping = piggyBank?.transactions?.map(transaction => {
        if (transaction.typeOfTransaction === "deposit") {
          prevAmount = prevAmount + transaction.amount;
          if (prevAmount > highestAmount) {
            highestAmount = prevAmount;
          }

          return {
            key: transaction._id,
            amount: transaction.amount,
            type: transaction.typeOfTransaction,
            prevAmount: prevAmount,
            date: transaction.date,
          };
        } else if (transaction.typeOfTransaction === "withdrawal") {
          prevAmount = prevAmount - transaction.amount;
          if (prevAmount > highestAmount) {
            highestAmount = prevAmount;
          }

          return {
            key: transaction._id,
            amount: transaction.amount,
            type: transaction.typeOfTransaction,
            prevAmount: prevAmount,
            date: transaction.date,
          };
        }
      });
      const newArray = resultOfMapping?.map(item => {
        return {
          ...item,
          height:
            highestAmount !== 0 ? (item.prevAmount / highestAmount) * 100 : 0,
        };
      });

      return newArray;
    } else {
      return null;
    }
  }
  const graphBars = calculateGraphBars();

  const [tick, setTick] = useState(false);

  useEffect(() => {
    setTimeout(() => setTick(!tick), 3000);
  }, [tick]);

  // Filter function for the graph animation

  const filterHandler = value => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = midnight.setDate(midnight.getDate() - 1);
    const sevenDays = midnight.setDate(midnight.getDate() - 7);
    const oneMonth = midnight.setMonth(midnight.getMonth() - 1);
    const oneYear = midnight.setFullYear(midnight.getFullYear() - 1);
    const beginningOfYear = new Date(now.getFullYear(), 0, 1);

    switch (value) {
      case "beginning":
        setFilteredArray(graphBars);
        break;
      case "yesterday":
        setFilteredArray(
          graphBars?.filter(
            transaction =>
              now - Date.parse(transaction?.date) <= now - yesterday
          )
        );
        break;
      case "sevenDays":
        setFilteredArray(
          graphBars?.filter(
            transaction =>
              now - Date.parse(transaction?.date) <= now - sevenDays
          )
        );
        break;
      case "month":
        setFilteredArray(
          graphBars?.filter(
            transaction => now - Date.parse(transaction?.date) <= now - oneMonth
          )
        );
        break;
      case "oneYear":
        setFilteredArray(
          graphBars?.filter(
            transaction => now - Date.parse(transaction?.date) <= now - oneYear
          )
        );
        break;
      case "beginYear":
        setFilteredArray(
          graphBars?.filter(
            transaction =>
              now - Date.parse(transaction?.date) <= now - beginningOfYear
          )
        );
        break;
      default:
        setFilteredArray(graphBars);
    }
  };

  useEffect(() => {
    filterHandler(filterValue);
  }, [filterValue]);

  //END graph animation

  // Functions for the piggy bank account END

  // Functions for the savings account START

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

  // Functions for the savings account END

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
                    width={"100%"}
                    height={"100%"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Savings account") && (
                <StyledButton
                  onClick={() => toggleShowDetails("Savings account")}
                >
                  <Lottie
                    options={defaultOptionsMouse}
                    width={"100%"}
                    height={"100%"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Stocks account") && (
                <StyledButton
                  onClick={() => toggleShowDetails("Stocks account")}
                >
                  <Lottie
                    options={defaultOptionsStocks}
                    width={"100%"}
                    height={"100%"}
                  />
                </StyledButton>
              )}
              {accountName?.includes("Loan account") && (
                <StyledButton onClick={() => toggleShowDetails("Loan account")}>
                  <Lottie
                    options={defaultOptionsLoan}
                    width={"100%"}
                    height={"100%"}
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
                          <h3>Current amount: {piggyBankAmount} €</h3>
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
                              <h3>List of all deposits</h3>
                              {user?.accounts
                                ?.find(account => account.name === "Piggy bank")
                                ?.transactions?.filter(
                                  transaction =>
                                    transaction.typeOfTransaction === "deposit"
                                ).length !== 0 ? (
                                user?.accounts
                                  ?.find(
                                    account => account.name === "Piggy bank"
                                  )
                                  ?.transactions?.filter(
                                    transaction =>
                                      transaction.typeOfTransaction ===
                                      "deposit"
                                  )
                                  .map((deposit, index) => {
                                    const dateOptions = {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    };
                                    const formattedDate = new Date(
                                      deposit?.date
                                    ).toLocaleDateString("de-DE", dateOptions);

                                    return (
                                      <ListElementsContainer key={index}>
                                        <li>Date: {formattedDate}</li>
                                        <li>
                                          Amount: {deposit.amount} {` €`}
                                        </li>
                                      </ListElementsContainer>
                                    );
                                  })
                              ) : (
                                <li>No deposits</li>
                              )}
                            </StyledList>
                            <StyledList>
                              <h3>List of all withdrawals</h3>
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
                                  .map((withdrawal, index) => {
                                    const dateOptions = {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    };
                                    const formattedDate = new Date(
                                      withdrawal?.date
                                    ).toLocaleDateString("de-DE", dateOptions);

                                    return (
                                      <ListElementsContainer key={index}>
                                        <li>Date: {formattedDate}</li>
                                        <li>
                                          Amount: {withdrawal.amount} {` €`}
                                        </li>
                                      </ListElementsContainer>
                                    );
                                  })
                              ) : (
                                <li>No deposits</li>
                              )}
                            </StyledList>
                            <select
                              onChange={event => {
                                setFilterValue(event.target.value);
                              }}
                            >
                              <option value="">Select one...</option>
                              <option value="beginning">
                                Since the beginning
                              </option>
                              <option value="yesterday">Since yesterday</option>
                              <option value="sevenDays">
                                Since 7 days ago
                              </option>
                              <option value="month">Since one month ago</option>
                              <option value="oneYear">
                                Since one year ago
                              </option>
                              <option value="beginYear">
                                Since beginning of the year
                              </option>
                            </select>
                            <GraphContainer>
                              <StyledDiv count={filteredArray?.length}>
                                <GraphBar
                                  startHeight={"50"}
                                  amount={piggyBank?.startAmount}
                                  tick={tick}
                                />
                                <p>{piggyBank?.startAmount + " € "}</p>
                              </StyledDiv>
                              {piggyBank?.transactions?.length !== 0 &&
                                filteredArray?.map(bar => (
                                  <StyledDiv
                                    key={bar._id}
                                    count={filteredArray.length}
                                  >
                                    <GraphBar
                                      type={bar.type}
                                      key={bar.key}
                                      height={
                                        bar.height >= 10 ? bar.height : 10
                                      }
                                      tick={tick}
                                    />
                                    <p>{bar.amount + ` € `}</p>
                                    <p>{bar.prevAmount + ` € `}</p>
                                  </StyledDiv>
                                ))}
                            </GraphContainer>
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
                          <FormButton type="submit">Add amount</FormButton>
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
                          <option value="Since beginning of the year">
                            Since beginning of the year
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
                          <option value="Since beginning of the year">
                            Since beginning of the year
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
                          <option value="Since beginning of the year">
                            Since beginning of the year
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
          <StyledParagraph>
            You don&apos;t have any accounts yet. Please ask your parents to
            create some for you.
          </StyledParagraph>
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

const StyledSection = styled.section`
  width: 100%;
  border: 3px solid #5e8c49;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  padding: 0.5rem;
  gap: 1rem;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  width: 20%;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 2%;
  /* overflow: hidden; */
`;

const GraphBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0%;
  max-height: 100%;
  border: none;
  border-radius: 10px;
  transition: ease-in-out 3s;
  font-size: 1rem;
  ${props =>
    props.type && props.type === "withdrawal"
      ? "background:#401d1a;"
      : "background:#5e8c49;"}
  ${props => props.height && `height: ${props.height}%;`};
  ${props => props.startHeight && `height: ${props.startHeight}%;`};
  ${props => props.tick && `height: 0%;`};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  align-items: center;
  max-width: 15%;
  white-space: nowrap;
  /* margin: 0 1%; */
  font-size: 0.5rem;
  ${props => props.count && `width: calc(100%/${props.count})`}
`;

const ListElementsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 10%;
`;

const StyledParagraph = styled.p`
  margin: 1rem;
  padding-top: 1rem;
`;
