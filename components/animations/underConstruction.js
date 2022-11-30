import React from "react";
import Lottie from "react-lottie";
import underConstruction from "./92462-under-construction.json";

export default function UnderConstruction() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: underConstruction,
    rendererSettings: {
      preserveAspectRatio: "xMidYmid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
}
