import Head from "next/head";
import {useContext, useState, useEffect} from "react";
import Lottie from "react-lottie";
import {UserContext} from "../components/contexts/UserContext";
import animationDataPiggyAccount from "../public/lotties/piggy-account.json";
import animationDataMouse from "../public/lotties/mouse.json";
// import animationDataStocks from "../public/lotties/stocks.json";
// import animationDataLoan from "../public/lotties/loan.json";
// import animationDataGraph from "../public/lotties/graph.json";
import Layout from "../components/Layout";
import styled from "styled-components";
import {
  FormButton,
  PasswordDiv,
  StyledForm,
  StyledInput,
  StyledList,
  StyledSelect,
  StyledParagraph,
  ErrorSpan,
  ButtonContainer,
} from "../components/StyledComponents";

export default function Accounts() {
  const {user, setUser} = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [fetchReload, setFetchReload] = useState(false);
  const [piggyBank, setPiggyBank] = useState(null);
  const [savingsAccount, setSavingsAccount] = useState(null);
  // const [stocksAccount, setStocksAccount] = useState(null);
  // const [loanAccount, setLoanAccount] = useState(null);
  const [graphBars, setGraphBars] = useState([]);
  const [filterValue, setFilterValue] = useState("beginning");
  const [filteredArray, setFilteredArray] = useState(
    piggyBank?.transactions ?? []
  );
  const [withdrawalError, setWithdrawalError] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(
    savingsAccount?.startAmount ?? 0
  );
  const [startValueSA, setStartValueSA] = useState(0);
  const [endValueSA, setEndValueSA] = useState(0);

  const accountName = user?.accounts
    ? user?.accounts?.map(account => account.name)
    : null;

  const toggleShowDetails = type => {
    setAccountType(type);
    setShowDetails(type !== accountType ? true : !showDetails);
    setShowMoreDetails(false);
  };

  // Functions for the piggy bank account START

  //Initialize piggyBank

  useEffect(() => {
    if (user) {
      piggyBankAmount &&
        localStorage.setItem(
          "piggyBankAmount",
          JSON.stringify(piggyBankAmount)
        );
      setPiggyBank(
        user?.accounts?.find(account => {
          if (account.name === "Piggy bank") {
            return true;
          } else {
            return false;
          }
        })
      );
      setSavingsAccount(
        user?.accounts?.find(account => {
          if (account.name === "Savings account") {
            return true;
          } else {
            return false;
          }
        })
      );
      // setStocksAccount(
      //   user?.accounts?.find(account => {
      //     if (account.name === "Stocks account") {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   })
      // );
      // setLoanAccount(
      //   user?.accounts?.find(account => {
      //     if (account.name === "Loan account") {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   })
      // );
    }
  }, [user]);

  useEffect(() => {
    setGraphBars(() => calculateGraphBars());
  }, [piggyBank]);

  useEffect(() => {
    filterHandler(filterValue);
  }, [graphBars]);

  // function to POST transactions in the piggy bank account

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
      if (
        transaction.typeOfTransaction === "withdrawal" &&
        piggyBankAmount - amount < 0
      ) {
        setWithdrawalError(true);
      } else {
        setWithdrawalError(false);
        const response = await fetch(
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
        if (response.ok) {
          setFetchReload(!fetchReload);
        }
      }
    } catch (error) {
      alert(error.message);
    }

    event.target.reset();
  };

  // function to GET the child data after updating the piggy bank account

  useEffect(() => {
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
    }
  }, [fetchReload]);

  //START graph animation

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
            highestAmount: highestAmount,
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
            highestAmount: highestAmount,
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
      return [];
    }
  }

  const piggyBankAmount = graphBars[graphBars?.length - 1]?.prevAmount;

  const [tick, setTick] = useState(false);

  useEffect(() => {
    setTimeout(() => setTick(!tick), 5000);
  }, [tick, currentAmount]);

  // Filter function for the graph animation

  const now = new Date();
  const interestRatePerSecond =
    savingsAccount?.interestRate / 365 / 24 / 60 / 60;
  const startDateinMS = new Date(savingsAccount?.startDate);

  const filterHandler = value => {
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = midnight.setDate(midnight.getDate() - 1);
    const sevenDays = midnight.setDate(midnight.getDate() - 7);
    const oneMonth = midnight.setMonth(midnight.getMonth() - 1);
    const oneYear = midnight.setFullYear(midnight.getFullYear() - 1);
    const beginningOfYear = new Date(now.getFullYear(), 0, 1);
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const endOfMonth = new Date(currentYear, currentMonth + 1, 1);
    const timeUntilEndOfMonthInMS = endOfMonth - now;
    const secondsUntilEndOfMonth = Math.floor(timeUntilEndOfMonthInMS / 1000);

    const yesterdayInMS = new Date(Date.now() - 86400000);
    const sevenDaysAgoInMS = new Date(Date.now() - 7 * 86400000);
    const oneMonthAgoInMS = new Date(startDateinMS - 2.63e6);
    const oneYearAgoInMS = new Date(
      startDateinMS.getFullYear() - 1,
      startDateinMS.getMonth(),
      startDateinMS.getDate()
    );

    const secondsUntilYesterday = (yesterdayInMS - startDateinMS) / 1000;
    const secondsUntilSevenDaysAgo = (sevenDaysAgoInMS - startDateinMS) / 1000;
    const secondsUntilOneMonthAgo = (oneMonthAgoInMS - startDateinMS) / 1000;
    const secondsUntilOneYearAgo = (oneYearAgoInMS - startDateinMS) / 1000;
    const secondsSinceBeginningOfYear =
      (beginningOfYear - startDateinMS) / 1000;

    switch (value) {
      case "beginning":
        setFilteredArray(graphBars);
        setStartValueSA(savingsAccount?.startAmount);
        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
        break;
      case "yesterday":
        setFilteredArray(
          graphBars?.filter(
            transaction =>
              now - Date.parse(transaction?.date) <= now - yesterday
          )
        );
        if (savingsAccount?.startDate < yesterdayInMS) {
          setStartValueSA(
            savingsAccount?.startAmount +
              secondsUntilYesterday * interestRatePerSecond
          );
        } else setStartValueSA(savingsAccount?.startAmount);
        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
        break;
      case "sevenDays":
        setFilteredArray(
          graphBars?.filter(
            transaction =>
              now - Date.parse(transaction?.date) <= now - sevenDays
          )
        );
        if (savingsAccount?.startDate < sevenDaysAgoInMS) {
          setStartValueSA(
            savingsAccount?.startAmount +
              secondsUntilSevenDaysAgo * interestRatePerSecond
          );
        } else setStartValueSA(savingsAccount?.startAmount);
        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
        break;
      case "month":
        setFilteredArray(
          graphBars?.filter(
            transaction => now - Date.parse(transaction?.date) <= now - oneMonth
          )
        );
        if (savingsAccount?.startDate < oneMonthAgoInMS) {
          setStartValueSA(
            savingsAccount?.startAmount +
              secondsUntilOneMonthAgo * interestRatePerSecond
          );
        } else {
          setStartValueSA(savingsAccount?.startAmount);
        }

        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
        break;
      case "oneYear":
        setFilteredArray(
          graphBars?.filter(
            transaction => now - Date.parse(transaction?.date) <= now - oneYear
          )
        );
        if (savingsAccount?.startDate < oneMonthAgoInMS) {
          setStartValueSA(
            savingsAccount?.startAmount +
              secondsUntilOneYearAgo * interestRatePerSecond
          );
        } else setStartValueSA(savingsAccount?.startAmount);
        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
        break;
      case "beginYear":
        setFilteredArray(
          graphBars?.filter(
            transaction =>
              now - Date.parse(transaction?.date) <= now - beginningOfYear
          )
        );
        setStartValueSA(
          savingsAccount?.startAmount +
            secondsSinceBeginningOfYear * interestRatePerSecond
        );
        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
        break;
      default:
        setFilteredArray(graphBars);
        setStartValueSA(savingsAccount?.startAmount);
        setEndValueSA(
          currentAmount + secondsUntilEndOfMonth * interestRatePerSecond
        );
    }
  };

  useEffect(() => {
    filterHandler(filterValue);
  }, [filterValue]);

  //END graph animation

  // Functions for the piggy bank account END

  // Functions for the savings account START

  // Initialize savingsAccount

  const date = new Date(savingsAccount?.startDate);
  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  // Function to calculate the current amount

  const calculateCurrentAmount = () => {
    if (savingsAccount) {
      const startDateinMS = new Date(savingsAccount.startDate);
      const timeDifference = Math.floor(
        (Date.now() - startDateinMS.getTime()) / 1000
      );
      setCurrentAmount(
        savingsAccount.startAmount +
          (savingsAccount.interestRate / 365 / 24 / 60 / 60) * timeDifference
      );
    }
  };

  useEffect(() => {
    calculateCurrentAmount();
    currentAmount &&
      localStorage.setItem("savingsAmount", JSON.stringify(currentAmount));
  }, [savingsAccount, tick]);

  // Savings account animation START

  const [SAAnimationHeight, setSAAnimationHeight] = useState(0);
  const [SAAnimationWidth, setSAAnimationWidth] = useState(0);

  useEffect(() => {
    function updateSAGraph() {
      if (accountType === "Savings account" && showMoreDetails) {
        const viewportWidth = window.innerWidth;
        const element = document.querySelector("#SAGraph");
        const elementWidth = element.offsetWidth;
        const SAGraphWidthInVW = (elementWidth * 100) / viewportWidth;
        const graphWidth =
          ((currentAmount - startValueSA) / (endValueSA - startValueSA)) * 100;
        const graphWidthInVW = (graphWidth * SAGraphWidthInVW) / 100;
        setSAAnimationWidth(graphWidthInVW);
        const animationHeight =
          ((currentAmount - startValueSA) * 50) / (endValueSA - startValueSA);
        setSAAnimationHeight(animationHeight);
      }
    }
    updateSAGraph();
  }, [currentAmount]);

  // Savings account animation END

  // Functions for the savings account END

  // default Options for Lottie animations

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

  // const defaultOptionsStocks = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationDataStocks,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  // const defaultOptionsLoan = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationDataLoan,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  // const defaultOptionsGraph = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationDataGraph,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      <Layout />
      {user?.isChild ? (
        user.accounts?.length !== 0 ? (
          <>
            <AnimationsContainer>
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
                    style={{
                      marginTop: "32%",
                    }}
                    options={defaultOptionsMouse}
                    width={"8rem"}
                    height={"3.9rem"}
                  />
                </StyledButton>
              )}
              {/* {accountName?.includes("Stocks account") && (
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
              )} */}
            </AnimationsContainer>
            {showDetails && (
              <StyledSection>
                {accountType === "Piggy bank" && (
                  <>
                    {piggyBank?.startAmount && (
                      <>
                        <PasswordDiv>
                          <ButtonContainer>
                            <h3>Current amount</h3>
                            <h2 style={{margin: "-5% 0 0 3rem"}}>
                              {graphBars?.length === 0
                                ? piggyBank?.startAmount
                                : piggyBankAmount}{" "}
                              €
                            </h2>
                          </ButtonContainer>
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
                              {filteredArray.some(
                                bar => bar.type === "deposit"
                              ) ? (
                                filteredArray.map((bar, index) => {
                                  const dateOptions = {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  };
                                  const formattedDate = new Date(
                                    bar.date
                                  ).toLocaleDateString("de-DE", dateOptions);
                                  if (bar.type === "deposit") {
                                    return (
                                      <ListElementsContainer key={index}>
                                        <li>Date: {formattedDate}</li>
                                        <li>
                                          Amount: {bar.amount} {` €`}
                                        </li>
                                      </ListElementsContainer>
                                    );
                                  }
                                })
                              ) : (
                                <li>No deposit</li>
                              )}
                            </StyledList>
                            <StyledList>
                              <h3>List of all withdrawals</h3>

                              {filteredArray.some(
                                bar => bar.type === "withdrawal"
                              ) ? (
                                filteredArray.map((bar, index) => {
                                  const dateOptions = {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  };
                                  const formattedDate = new Date(
                                    bar.date
                                  ).toLocaleDateString("de-DE", dateOptions);
                                  if (bar.type === "withdrawal") {
                                    return (
                                      <ListElementsContainer key={index}>
                                        <li>Date: {formattedDate}</li>
                                        <li>
                                          Amount: {bar.amount} {` €`}
                                        </li>
                                      </ListElementsContainer>
                                    );
                                  }
                                })
                              ) : (
                                <li>No withdrawals</li>
                              )}
                            </StyledList>
                            <label htmlFor="piggyBankFilter">
                              Would you like to filter your transactions?
                            </label>
                            <StyledSelect
                              id="piggyBankFilter"
                              onChange={event => {
                                setFilterValue(event.target.value);
                              }}
                            >
                              <option default value="beginning">
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
                            </StyledSelect>
                            <PBGraphContainer>
                              <StyledDiv
                                count={
                                  filteredArray?.length === 0
                                    ? "5"
                                    : filteredArray?.length
                                }
                              >
                                <GraphBar
                                  startHeight={
                                    graphBars?.length === 0
                                      ? "100"
                                      : (piggyBank?.startAmount /
                                          graphBars[graphBars.length - 1]
                                            ?.highestAmount) *
                                        100
                                  }
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
                                    <p>{bar.prevAmount + ` € `}</p>
                                  </StyledDiv>
                                ))}
                            </PBGraphContainer>
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
                              step="any"
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
                              step="any"
                            />
                            {` €   `}
                          </label>
                          <FormButton type="submit">Subtract amount</FormButton>
                        </StyledForm>
                        {withdrawalError && (
                          <ErrorSpan>
                            You can&apos;t withdraw more than you have in the
                            piggy bank
                          </ErrorSpan>
                        )}
                      </>
                    )}
                  </>
                )}
                {accountType === "Savings account" && (
                  <>
                    {savingsAccount?.startAmount && (
                      <>
                        <PasswordDiv>
                          <ButtonContainer>
                            <p>Start amount: {savingsAccount?.startAmount} €</p>
                            <p>Current amount: {currentAmount.toFixed(7)} €</p>
                          </ButtonContainer>
                          <FormButton
                            style={{alignSelf: "center"}}
                            onClick={() => setShowMoreDetails(!showMoreDetails)}
                          >
                            {showMoreDetails ? "Hide details" : "Show details"}
                          </FormButton>
                        </PasswordDiv>

                        {showMoreDetails && (
                          <>
                            <p>Start date: {formattedDate}</p>
                            <label htmlFor="piggyBankFilter">
                              Would you like to filter your chart?
                            </label>
                            <StyledSelect
                              id="piggyBankFilter"
                              onChange={event => {
                                setFilterValue(event.target.value);
                              }}
                            >
                              <option default value="beginning">
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
                            </StyledSelect>
                            <SAGraphContainer id="SAGraph">
                              <StyledContainer
                                currentWidth={SAAnimationWidth}
                                tick={tick}
                                topBorder={SAAnimationHeight}
                                height={SAAnimationHeight}
                              >
                                <CurrentAmount
                                  tick={tick}
                                  currentWidth={SAAnimationWidth}
                                  height={SAAnimationHeight}
                                >
                                  {currentAmount.toFixed(7)}
                                  {` €`}
                                </CurrentAmount>
                                <Point
                                  tick={tick}
                                  currentWidth={SAAnimationWidth}
                                  height={SAAnimationHeight}
                                />

                                <StyledStart>
                                  {startValueSA.toFixed(3)}
                                  {` €`}
                                </StyledStart>
                              </StyledContainer>
                              <StyledEnd>
                                {endValueSA.toFixed(3)}
                                {` €`}
                              </StyledEnd>
                            </SAGraphContainer>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {/* {accountType === "Stocks account" && (
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
                )} */}
              </StyledSection>
            )}
          </>
        ) : (
          <StyledParagraph>
            You don&apos;t have any accounts yet. Please ask your parents to
            create some for you.
          </StyledParagraph>
        )
      ) : user?.isParent ? (
        <StyledParagraph>
          At the moment, you can only create accounts for your children. We are
          working hard on implementing this feature for parents as well.
        </StyledParagraph>
      ) : (
        <StyledParagraph>
          This section is available once you are logged in.
        </StyledParagraph>
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
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PBGraphContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 2%;
`;

const GraphBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0%;
  max-height: 100%;
  border: none;
  border-radius: 10px;
  transition: ease-in-out 5s;
  font-size: 1rem;
  ${props =>
    props.type && props.type === "withdrawal"
      ? "background: #401d1a;"
      : props.type && props.type === "deposit"
      ? "background: #5e8c49;"
      : "background: #224024"}
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
  font-size: 0.5rem;
  ${props => props.count && `width: calc(100%/${props.count})`}
`;

const ListElementsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 10%;
`;

const SAGraphContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 20rem;
  position: relative;
`;

const StyledContainer = styled.div`
  position: relative;
  border-right: 1vw solid #5e8c49;
  ${props =>
    props.tick && `border-right: ${props.currentWidth}vw solid #5e8c49;`}
  border-top: 5vw solid transparent;
  ${props =>
    props.tick && `border-top: ${props.currentWidth}px solid transparent;`}
  height: 50%;
  ${props => props.tick && `height: ${props.height + 50}%;`}
  transition: ease-in-out 5s;
`;

const Point = styled.div`
  border: 5px solid #401d1a;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  top: -25px;
  right: -1vw;
  transition: ease-in-out 5s;
  ${props => props.tick && `right: -${props.currentWidth + 1}vw;`}
  ${props => props.tick && `top: -${props.height}%;`}
`;

const StyledStart = styled.p`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledEnd = styled.p`
  position: absolute;
  top: -10vw;
  right: 0;
`;

const CurrentAmount = styled.p`
  position: absolute;
  top: -50%;
  right: -31vw;
  transition: ease-in-out 5s;
  ${props => props.tick && `right: -${props.currentWidth}vw;`}
  ${props => props.tick && `top: -${props.height + 20}%;`}
`;

const AnimationsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
`;
