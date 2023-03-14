import React, { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
  margin: "50px auto",
};

const LoadingSpinner = () => {
  return <MoonLoader color="black" loading speedMultiplier={0.5} cssOverride={override} />;
};

export default LoadingSpinner;
