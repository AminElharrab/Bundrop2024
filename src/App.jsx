import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter((cartItem) => cartItem.id !== id));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity } : cartItem
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((cartItem) => cartItem.id !== id));
  };

  const placeOrder = (formData) => {
    const orderData = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));
    const totalAmount = orderData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const receiptId = Math.floor(Math.random() * 1000000).toString();
    const receipt = {
      id: receiptId,
      orderDetails: orderData,
      totalAmount,
      ...formData,
    };

    fetch("http://localhost:5000/receipts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receipt),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Receipt saved:", data);
      })
      .catch((error) => {
        console.error("Error saving receipt:", error);
      });

    setCart([]);
    return receiptId;
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} placeOrder={placeOrder} />}
        />
        <Route path="/confirmation/:receiptid" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
