import React from "react";

import classes from "./Button.module.css";

const Button: React.FC<any> = ({ children, onClick }) => {
  return (
    <div className={classes.container}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default Button;
