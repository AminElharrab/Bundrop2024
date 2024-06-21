import React from "react";
import Menu from "../components/Menu";

const MenuPage = ({ addToCart }) => {
  return (
    <div>
      <Menu addToCart={addToCart} />
    </div>
  );
};

export default MenuPage;
