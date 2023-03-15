import React from "react";

import { useAppSelector } from "../../redux/hooks";
import Navbar from "../Navbar/Navbar";

import classes from "./Cart.module.css";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  console.log(cart);

  return (
    <div className={classes.cart}>
      <Navbar title="Cart" />
    </div>
  );
};

export default Cart;
