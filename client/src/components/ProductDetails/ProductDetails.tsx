import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

import { ProductInfoProps } from "./ProductDetails.types";

import LoadingSpinner from "../../ui/LoadingSpinner";

import classes from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

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
      <Header />
      {product ? <ProductInfo product={product} /> : <LoadingSpinner />}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <AiOutlineArrowLeft onClick={() => navigate("/")} />
      <h1>Details</h1>
      <RxHamburgerMenu />
    </div>
  );
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const base64String = Buffer.from(product?.image.buffer.data).toString("base64");

  return (
    <div className={classes["product-info"]}>
      <img src={`data:image/png;base64,${base64String}`} alt="product preview" />
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
    </div>
  );
};

export default ProductDetails;
