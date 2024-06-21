import React from "react";

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="cart">
      <h2>Your Order</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>
            ${item.price.toFixed(2)} x {item.quantity}
          </p>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </section>
  );
};

export default Cart;
