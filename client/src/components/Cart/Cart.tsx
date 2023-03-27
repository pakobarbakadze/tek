import React from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

import { HiOutlineTrash } from "react-icons/hi";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { removeProduct } from "../../redux/cartSlice";

import { CartCardProps } from "./Cart.types";
import { CartProductType } from "../../types/Product.types";

import Counter from "../../ui/Counter/Counter";
import Button from "../../ui/Button/Button";

import classes from "./Cart.module.css";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const removeClickHandler = (cartItem: CartProductType) => {
    dispatch(removeProduct(cartItem));
  };

  return (
    <div className={classes.cart}>
      <div>
        {cart.product.map((cartItem) => (
          <CartCard key={cartItem._id} cartItem={cartItem} onRemoveClick={removeClickHandler} />
        ))}
      </div>
      <Fees />
      <Button onClick={() => navigate('/checkout')}>Check Out</Button>
    </div>
  );
};

const CartCard: React.FC<CartCardProps> = ({ cartItem, onRemoveClick }) => {
  const base64String = Buffer.from(cartItem.image.buffer.data).toString("base64");
  return (
    <div className={classes["cart-card"]}>
      <img src={`data:image/png;base64,${base64String}`} alt="product preview" />
      <div className={classes["cart-card-info"]}>
        <h2>{cartItem.name}</h2>
        <h3>{cartItem.price}</h3>
      </div>
      <div className={classes["cart-card-controller"]}>
        <HiOutlineTrash onClick={() => onRemoveClick(cartItem)} />
        <Counter cartItem={cartItem} />
      </div>
    </div>
  );
};

const Fees = () => {
  const cart = useAppSelector((state) => state.cart);

  const subtotal = cart.totalPrice;
  const vat = (cart.totalPrice * 20) / 100;
  const total = subtotal + vat;

  return (
    <div className={classes.fees}>
      <ul>
        <li>
          <h2>Sub-total</h2> <h3>{subtotal}</h3>
        </li>
        <li>
          <h2>VAT (20%)</h2> <h3>{vat}</h3>
        </li>
        <li>
          <h2>Shipping fee</h2> <h3>{0}</h3>
        </li>
      </ul>
      <div className={classes.total}>
        <h2>Total</h2> <h3>{total}</h3>
      </div>
    </div>
  );
};

export default Cart;
