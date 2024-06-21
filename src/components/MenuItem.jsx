import React from "react";

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="menu-item">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default MenuItem;
