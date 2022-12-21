import Head from "next/head";
import {useContext, useState} from "react";
import Lottie from "react-lottie";
import {UserContext} from "../components/contexts/UserContext";
// import {AccountContext} from "../components/contexts/AccountContext";
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
  // const {account, handleAccount} = useContext(AccountContext);
  const [showDetails, setShowDetails] = useState(false);
  const [accountType, setAccountType] = useState("");

  const accountName = user?.accounts?.map(account => account.name);

  const toggleShowDetails = type => {
    setAccountType(type);
    setShowDetails(type !== accountType ? true : !showDetails);
  };

  const piggyBank = user?.accounts?.find(account => {
    if (account.name === "Piggy bank") {
      return true;
    } else {
      return false;
    }
  });

  // console.log(piggyBank.startAmount);

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
                        <button>Show details</button>
                        <Lottie
                          options={defaultOptionsGraph}
                          width={"20rem"}
                          height={"20rem"}
                        />
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
                  <p>Savings account details</p>
                )}
                {accountType === "stocks account" && (
                  <p>Stocks account details</p>
                )}
                {accountType === "loan account" && <p>Loan account details</p>}
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
  /* align-items: center; */
  margin-top: 1rem;
  padding-left: 1rem;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
`;
