import Head from "next/head";
import styled from "styled-components";
import HomePage from "./home";

export default function Home() {
  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      <Body>
        <HomePage />
      </Body>
    </>
  );
}

const Body = styled.body`
  width: 100%;
  min-height: 100vh;
`;
