import React from "react";
import logoColor from "../assets/img/logo color.png";

const Hero = () => {
  return (
    <section className="hero">
      <img src={logoColor} alt="Bun Drop" />
      <h2>Burgers To Your Door</h2>
    </section>
  );
};

export default Hero;
