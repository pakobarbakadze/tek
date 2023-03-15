import React from "react";

import classes from "./Button.module.css";

const Button: React.FC<any> = ({ children }) => {
  return (
    <div className={classes.container}>
      <button>{children}</button>
    </div>
  );
};

export default Button;
