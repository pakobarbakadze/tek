import React from "react";
import { Buffer } from "buffer";

import { HiOutlineTrash } from "react-icons/hi";

import { useAppSelector } from "../../redux/hooks";

import { CartCardProps } from "./Cart.types";

import classes from "./Cart.module.css";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  //console.log(cart);

  return (
    <div className={classes.cart}>
      {cart.product.map((item) => (
        <CartCard key={item._id} item={item} />
      ))}
    </div>
  );
};

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const base64String = Buffer.from(item.image.buffer.data).toString("base64");
  return (
    <div className={classes["cart-card"]}>
      <img src={`data:image/png;base64,${base64String}`} alt="product preview" />
      <div className={classes["cart-card-info"]}>
        <h2>{item.name}</h2>
        <h3>{item.price}</h3>
      </div>
      <div className={classes["cart-card-controller"]}>
        <HiOutlineTrash />
        <div className={classes.counter}>
          <p>counter</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
