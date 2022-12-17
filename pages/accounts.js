import Head from "next/head";
import {useContext} from "react";
import Lottie from "react-lottie";
import {UserContext} from "../components/UserContext";
import animationData from "../public/lotties/under-construction.json";

export default function Accounts() {
  const {user} = useContext(UserContext);

  // default Options for Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      {user ? (
        <p>Will follow</p>
      ) : (
        <Lottie
          options={defaultOptions}
          width={"36%"}
          height={"28%"}
          style={{paddingTop: "15rem"}}
        ></Lottie>
      )}
    </>
  );
}
