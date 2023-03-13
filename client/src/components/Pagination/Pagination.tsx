import React from "react";

import classes from "./Pagination.module.css";

import { PaginationProps } from "./Pagination.types";

const Pagination: React.FC<PaginationProps> = ({ page, pages }) => {
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
          <li id={page === element ? classes.selected : ""} key={element}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
