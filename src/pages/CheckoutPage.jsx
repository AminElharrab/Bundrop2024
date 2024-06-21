import React from "react";
import Checkout from "../components/Checkout";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ cart, placeOrder }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = (formData) => {
    const receiptId = placeOrder({ ...formData, paymentMethod: "card" });
    console.log("Navigating to confirmation with receipt ID:", receiptId);
    navigate(`/confirmation/${receiptId}`);
  };

  return (
    <div>
      <Checkout cart={cart} placeOrder={handlePlaceOrder} />
    </div>
  );
};

export default CheckoutPage;
