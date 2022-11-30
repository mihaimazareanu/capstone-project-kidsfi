import Head from "next/head";
import styled from "styled-components";
import RegisterButton from "../components/RegisterButton";
import RegisterForm from "../components/RegisterForm";
import {useState} from "react";

export default function Home() {
  const [register, setRegister] = useState(false);
  const [loginMode, setLoginMode] = useState("parent");

  const handleClickRegister = () => {
    setRegister(true);
  };
  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>

      <MainSection>
        <Heading>kidsFi - Finance for kids</Heading>
        <StyledParagraph>
          The app every child needs to have a visual overview of their money.
        </StyledParagraph>
        <FlexContainer>
          <StyledDiv>
            <p>
              Don&apos;t take our word for it though, please register and try it
              out now.
            </p>
            <RegisterButton
              register={register}
              handleClickRegister={handleClickRegister}
            />
          </StyledDiv>
          <StyledDiv>
            <p>Already have an account? Awesome! Go ahead and log in.</p>
            <svg
              title="register-icon"
              role="img"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.0149 30.3021L25.0149 30.3021C24.6707 30.6464 24.2195 30.8185 23.769 30.8185C23.3186 30.8185 22.8675 30.6465 22.5233 30.3023C22.5232 30.3022 22.5232 30.3022 22.5231 30.3021L22.8414 29.9839C22.3283 29.4714 22.3284 28.6406 22.8414 28.1281L25.0149 30.3021ZM25.0149 30.3021L25.019 30.2979L32.7687 22.3409L33.0745 22.0269L32.7688 21.7129L25.019 13.7553L25.019 13.7552L25.0149 13.7511C24.3268 13.0628 23.2114 13.0627 22.5233 13.7509M25.0149 30.3021L22.5233 13.7509M22.5233 13.7509C22.5233 13.7509 22.5233 13.7509 22.5233 13.7509C21.8344 14.4392 21.8344 15.5552 22.5233 16.2434L26.5011 20.2231H2.31207C1.33834 20.2231 0.55 21.0128 0.55 21.9856C0.55 22.9583 1.33834 23.7481 2.31207 23.7481H26.5836L22.5234 27.8097L24.6966 14.0692C24.1843 13.5567 23.3537 13.5567 22.8414 14.0692L22.5233 13.7509ZM13.6831 15.4375V15.8875H14.1331H16.775H17.225V15.4375V5.22559C17.225 4.59723 17.7348 4.08747 18.3626 4.08747H38.7285C39.3574 4.08747 39.8661 4.59699 39.8661 5.22559V5.22615L39.9074 38.7882C39.9074 38.7883 39.9074 38.7885 39.9074 38.7887C39.9072 39.4171 39.3985 39.9263 38.7698 39.9263H18.3632C17.7354 39.9263 17.2256 39.4165 17.2256 38.7882V28.5192V28.0686L16.7751 28.0692L14.1332 28.0725L13.6838 28.073V28.5225V40.375C13.6838 42.0731 15.0601 43.45 16.7586 43.45H40.3759C42.0737 43.45 43.45 42.073 43.45 40.375V3.625V3.6248C43.4492 1.92695 42.0731 0.55 40.3752 0.55H16.758C15.0595 0.55 13.6831 1.92687 13.6831 3.625V15.4375Z"
                fill="#5E8C49"
                stroke="#5E8C49"
                strokeWidth="0.9"
              />
            </svg>
          </StyledDiv>
        </FlexContainer>
        {register && (
          <RegisterForm loginMode={loginMode} setLoginMode={setLoginMode} />
        )}
      </MainSection>
    </>
  );
}

const MainSection = styled.section`
  margin-top: 6rem;
  font-size: 1rem;
  width: 100%;
  min-height: 100vh;
  background-color: #e9f2ef;
  color: #401d1a;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1.3rem;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem 0;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  font-size: 1.2rem;
`;
