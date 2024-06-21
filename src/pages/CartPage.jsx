import React, { useState } from "react";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import SwishPayment from "../components/swishpayment";

const CartPage = ({ cart, updateQuantity, removeFromCart, placeOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleCheckout = (method) => {
    setPaymentMethod(method);
  };

  const totalAmount = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <div>
        <h3>Your Order</h3>
        <p>Total: ${totalAmount}</p>
      </div>
      <div className="payment-methods">
        <button
          onClick={() => handleCheckout("swish")}
          className={paymentMethod === "swish" ? "selected" : ""}
        >
          Proceed to Checkout With Swish
        </button>
        <button
          onClick={() => handleCheckout("card")}
          className={paymentMethod === "card" ? "selected" : ""}
        >
          Proceed to Checkout With Card
        </button>
      </div>
      {paymentMethod === "swish" && (
        <SwishPayment cart={cart} placeOrder={placeOrder} />
      )}
      {paymentMethod === "card" && (
        <Checkout cart={cart} placeOrder={placeOrder} />
      )}
    </div>
  );
};

export default CartPage;
