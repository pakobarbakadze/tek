import React, { useState } from "react";

import { SearchFormProps, SearchFilterProps, ProductListProps, ProductProps } from "./Discover.types";
import productData from "../../data/product";

import { BsSearch } from "react-icons/bs";
import classes from "./Discover.module.css";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [productList, setProductList] = useState(productData);

  const formSubmitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Discover</h1>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} onFormSubmit={formSubmitHandler} />
      <SearchFilter setFilterTerm={setFilterTerm} />
      <ProductList productList={productList} />
    </div>
  );
};

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, onFormSubmit }) => (
  <div className={classes["search-form"]}>
    <form onSubmit={onFormSubmit}>
      <BsSearch />
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Product" />
    </form>
  </div>
);

const SearchFilter: React.FC<SearchFilterProps> = ({ setFilterTerm }) => (
  <div className={classes["search-filter"]}>
    <ul>
      <li onClick={() => setFilterTerm("PHONE")}>Phones</li>
      <li onClick={() => setFilterTerm("HEADPHONE")}>HeadPhones</li>
      <li onClick={() => setFilterTerm("COMPUTER")}>Computers</li>
    </ul>
  </div>
);

const ProductList: React.FC<ProductListProps> = ({ productList }) => (
  <div className={classes["product-list"]}>
    {productList.map((product) => (
      <Product key={product._id.$oid} product={product} />
    ))}
  </div>
);

const Product: React.FC<ProductProps> = ({ product }) => (
  <div className={classes.product}>
    <h1>{product.name}</h1>
  </div>
);

export default Discover;
