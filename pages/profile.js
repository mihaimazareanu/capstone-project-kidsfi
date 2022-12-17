import Head from "next/head";
import Lottie from "react-lottie";
import animationData from "../public/lotties/under-construction.json";

export default function Profile() {
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
      <Lottie
        options={defaultOptions}
        width={"36%"}
        height={"28%"}
        style={{paddingTop: "15rem"}}
      ></Lottie>
    </>
  );
}
