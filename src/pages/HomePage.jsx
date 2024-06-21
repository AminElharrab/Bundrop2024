import React from "react";
import Hero from "../components/Hero";
import Menu from "../components/Menu";

const HomePage = ({ addToCart }) => {
  return (
    <div>
      <Hero />
      <Menu addToCart={addToCart} limit={3} /> {}
    </div>
  );
};

export default HomePage;
