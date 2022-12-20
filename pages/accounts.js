import Head from "next/head";
import {useContext} from "react";
import Lottie from "react-lottie";
import {UserContext} from "../components/UserContext";
import animationDataUnderConstruction from "../public/lotties/under-construction.json";
import aninamtionDataPiggyAccount from "../public/lotties/piggy-account.json";
import aninamtionDataMouse from "../public/lotties/mouse.json";
import aninamtionDataStocks from "../public/lotties/stocks.json";
import aninamtionDataLoan from "../public/lotties/loan.json";
import Layout from "../components/Layout";
import styled from "styled-components";

export default function Accounts() {
  const {user} = useContext(UserContext);

  const accountName = user?.accounts?.map(account => account.name);

  // default Options for Lottie animation
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
    animationData: aninamtionDataPiggyAccount,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsMouse = {
    loop: true,
    autoplay: true,
    animationData: aninamtionDataMouse,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsStocks = {
    loop: true,
    autoplay: true,
    animationData: aninamtionDataStocks,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsLoan = {
    loop: true,
    autoplay: true,
    animationData: aninamtionDataLoan,
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
          <StyledAnimationContainer>
            {accountName?.includes("Piggy bank") && (
              <Lottie
                options={defaultOptionsPiggyAccount}
                width={"5rem"}
                height={"5rem"}
              />
            )}

            {accountName?.includes("Savings account") && (
              <Lottie
                options={defaultOptionsMouse}
                width={"5rem"}
                height={"5rem"}
              />
            )}

            {accountName?.includes("Stocks account") && (
              <Lottie
                options={defaultOptionsStocks}
                width={"5rem"}
                height={"5rem"}
              />
            )}

            {accountName?.includes("Loan account") && (
              <Lottie
                options={defaultOptionsLoan}
                width={"5rem"}
                height={"5rem"}
              />
            )}
          </StyledAnimationContainer>
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
