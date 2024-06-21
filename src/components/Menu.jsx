import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "./MenuItem";

const Menu = ({ addToCart, limit }) => {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => setMenu(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const filteredMenu = filter
    ? menu.filter((item) => item.category === filter)
    : menu;

  const displayedMenu = limit ? filteredMenu.slice(0, limit) : filteredMenu;

  return (
    <section className="menu">
      <div className="filters">
        <button onClick={() => setFilter("")}>All</button>
        <button onClick={() => setFilter("burgers")}>Burgers</button>
        <button onClick={() => setFilter("sides")}>Sides</button>
        <button onClick={() => setFilter("drinks")}>Drinks</button>
      </div>
      <div className="menu-items">
        {displayedMenu.map((item) => (
          <MenuItem key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

export default Menu;
