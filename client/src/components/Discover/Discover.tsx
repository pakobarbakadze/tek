import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

import {
  SearchFormProps,
  SearchFilterProps,
  ProductListProps,
  ProductProps,
  ProductDataType,
} from "./Discover.types";

import { BsSearch } from "react-icons/bs";
import classes from "./Discover.module.css";
import Pagination from "../Pagination/Pagination";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [productData, setProductData] = useState<ProductDataType>({
    page: 1,
    pages: 1,
    productList: [],
  });

  // Search for product on SearchForm submit.
  const formSubmitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setSearchTerm("");
  };

  // Set productList when page changes.
  useEffect(() => {
    axios
      .get("/api/products", {
        params: {
          pageNumber: productData.page,
          category: filterCategory,
          keyword: searchTerm,
        },
      })
      .then((res) => {
        setProductData({
          page: res.data.page,
          pages: res.data.pages,
          productList: res.data.products,
        });
        console.log("Called");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterCategory, productData.page, searchTerm]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Discover</h1>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFormSubmit={formSubmitHandler}
      />
      <SearchFilter filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
      <ProductList productList={productData.productList} />
      <Pagination page={productData.page} pages={productData.pages} />
    </div>
  );
};

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, onFormSubmit }) => (
  <div className={classes["search-form"]}>
    <form onSubmit={onFormSubmit}>
      <BsSearch />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Product"
      />
    </form>
  </div>
);

const SearchFilter: React.FC<SearchFilterProps> = ({ filterCategory, setFilterCategory }) => (
  <div className={classes["search-filter"]}>
    <ul>
      <li
        id={filterCategory === "ALL" ? classes.selected : ""}
        onClick={() => setFilterCategory("ALL")}
      >
        All
      </li>
      <li
        id={filterCategory === "PHONE" ? classes.selected : ""}
        onClick={() => setFilterCategory("PHONE")}
      >
        Phones
      </li>
      <li
        id={filterCategory === "HEADPHONE" ? classes.selected : ""}
        onClick={() => setFilterCategory("HEADPHONE")}
      >
        HeadPhones
      </li>
      <li
        id={filterCategory === "COMPUTER" ? classes.selected : ""}
        onClick={() => setFilterCategory("COMPUTER")}
      >
        Computers
      </li>
    </ul>
  </div>
);

const ProductList: React.FC<ProductListProps> = ({ productList }) => (
  <div className={classes["product-list"]}>
    {productList.map((product) => (
      <Product key={product._id} product={product} />
    ))}
  </div>
);

const Product: React.FC<ProductProps> = ({ product }) => {
  const base64String = Buffer.from(product.image.buffer.data).toString("base64");
  return (
    <div className={classes.product}>
      <img src={`data:image/png;base64,${base64String}`} alt="product preview" />
      <h1>{product.name}</h1>
      <h4>{product.price}</h4>
    </div>
  );
};

export default Discover;
