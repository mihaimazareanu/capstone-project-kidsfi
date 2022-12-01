import Head from "next/head";
import styled from "styled-components";

export default function Profile() {
  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      <StyledDiv>
        <p>Under Construction</p>
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  margin-top: 5rem;
  padding: 1rem;
  background-color: #e9f2ef;
  min-height: 100vh;
`;
