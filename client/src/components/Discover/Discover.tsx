import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

import {
  SearchFormProps,
  SearchFilterProps,
  ProductListProps,
  ProductProps,
  PaginationProps,
} from "./Discover.types";

import { BsSearch } from "react-icons/bs";

import LoadingSpinner from "../../ui/LoadingSpinner";

import classes from "./Discover.module.css";

const Discover = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [productData, setProductData] = useState({
    page: 1,
    pages: 1,
    productList: [],
  });
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    setSearchKeyword(e.target.keyword.value);
  };

  const filterClickHandler = (category: string) => {
    setFilterCategory(category);
    setSearchKeyword("");
    setProductData((prev) => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/products", {
        params: {
          pageNumber: productData.page,
          category: filterCategory,
          keyword: searchKeyword,
        },
      })
      .then((res) => {
        setProductData({
          page: res.data.page,
          pages: res.data.pages,
          productList: res.data.products,
        });
        setLoading(false);
        console.log("Called");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [filterCategory, productData.page, searchKeyword]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Discover</h1>
      <SearchForm onFormSubmit={formSubmitHandler} />
      <SearchFilter filterCategory={filterCategory} filterClickHandler={filterClickHandler} />
      {!loading ? <ProductList productList={productData.productList} /> : <LoadingSpinner />}
      <Pagination
        page={productData.page}
        pages={productData.pages}
        setProductData={setProductData}
      />
    </div>
  );
};

const SearchForm: React.FC<SearchFormProps> = ({ onFormSubmit }) => (
  <div className={classes["search-form"]}>
    <form onSubmit={onFormSubmit}>
      <BsSearch />
      <input name="keyword" placeholder="Search Product" autoComplete="off" />
    </form>
  </div>
);

const SearchFilter: React.FC<SearchFilterProps> = ({ filterCategory, filterClickHandler }) => (
  <div className={classes["search-filter"]}>
    <ul>
      <li
        id={filterCategory === "ALL" ? classes.selected : ""}
        onClick={() => filterClickHandler("ALL")}
      >
        All
      </li>
      <li
        id={filterCategory === "PHONE" ? classes.selected : ""}
        onClick={() => filterClickHandler("PHONE")}
      >
        Phones
      </li>
      <li
        id={filterCategory === "HEADPHONE" ? classes.selected : ""}
        onClick={() => filterClickHandler("HEADPHONE")}
      >
        HeadPhones
      </li>
      <li
        id={filterCategory === "COMPUTER" ? classes.selected : ""}
        onClick={() => filterClickHandler("COMPUTER")}
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
  const navigate = useNavigate();

  return (
    <div className={classes.product} onClick={() => navigate(`/product/${product._id}`)}>
      <img src={`data:image/png;base64,${base64String}`} alt="product preview" />
      <h1>{product.name}</h1>
      <h4>{product.price}</h4>
    </div>
  );
};

const Pagination: React.FC<PaginationProps> = ({ page, pages, setProductData }) => {
  const pagesArr = [];

  const minPage = page - 6 > 0 ? page - 6 : 1;
  const maxPage = page + 6 < pages ? page + 6 : pages;

  for (let i = minPage; i <= maxPage; i++) {
    pagesArr.push(i);
  }
  return (
    <div className={classes.pagination}>
      <ul>
        {pagesArr.map((element) => (
          <li
            id={page === element ? classes.selected : ""}
            key={element}
            onClick={() => setProductData((prev: any) => ({ ...prev, page: element }))}
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discover;
