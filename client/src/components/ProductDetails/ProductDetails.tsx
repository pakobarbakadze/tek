import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";

import { CgShoppingBag } from "react-icons/cg";

import { useAppDispatch } from "../../redux/hooks";
import { addProduct } from "../../redux/cartSlice";

import { ProductType } from "../../types/Product.types";
import { ProductInfoProps } from "./ProductDetails.types";

import LoadingSpinner from "../../ui/LoadingSpinner";

import classes from "./ProductDetails.module.css";
import Button from "../../ui/Button/Button";
import Navbar from "../Navbar/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();

  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    if (product) dispatch(addProduct({ ...product, cartQuantity: 1 }));
  };

  useEffect(() => {
    axios
      .get(`/api/products/${id}`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setProduct(res.data);
        //console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <Navbar title={"Details"} />
      {product ? (
        <ProductInfo product={product} onButtonClick={addToCartHandler} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onButtonClick }) => {
  const base64String = Buffer.from(product?.image.buffer.data).toString("base64");

  return (
    <div className={classes["product-info"]}>
      <img src={`data:image/png;base64,${base64String}`} alt="product preview" />
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <div className={classes["add-to-cart"]}>
        <div className={classes.price}>
          <p>Price</p>
          <h3>{product?.price}</h3>
        </div>
        <Button onClick={onButtonClick}>
          <CgShoppingBag />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
