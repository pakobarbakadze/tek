import React from "react";

import { CartProductType } from "../../types/Product.types";

import { useAppDispatch } from "../../redux/hooks";
import { changeProductQuantity } from "../../redux/cartSlice";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import classes from "./Counter.module.css";

type CounterProps = {
  cartItem: CartProductType;
};

const Counter: React.FC<CounterProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch();
  const onCounterClickHandler = (quantity: number) => {
    dispatch(changeProductQuantity({ quantity, cartItem }));
  };

  return (
    <div className={classes.counter}>
      <span onClick={() => onCounterClickHandler(-1)}>
        <AiOutlineMinus />
      </span>
      <span className={classes.num}>{cartItem.cartQuantity}</span>
      <span onClick={() => onCounterClickHandler(1)}>
        <AiOutlinePlus />
      </span>
    </div>
  );
};

export default Counter;
