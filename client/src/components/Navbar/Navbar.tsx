import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgShoppingBag } from "react-icons/cg";

import classes from "./Navbar.module.css";
import Cart from "../Cart/Cart";

type NavbarProps = {
  title: string;
};

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const [isCartActive, setIsCartActive] = useState(false);

  return (
    <div className={classes.navbar}>
      <AiOutlineArrowLeft onClick={() => navigate("/")} />
      <h1>{title}</h1>
      <div className={classes.menu}>
        <CgShoppingBag onClick={() => setIsCartActive((prev) => !prev)} />
        <RxHamburgerMenu />
      </div>
      {isCartActive && <Cart />}
    </div>
  );
};

export default Navbar;
