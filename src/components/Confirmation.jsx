import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const [receipt, setReceipt] = useState(null);

  const estimatedDeliveryTime = receipt.estimatedDeliveryTime
    ? new Date(receipt.estimatedDeliveryTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="confirmation">
      <h2>Thank you for your order!</h2>
      <p>Your order details:</p>
      <ul>
        {receipt.orderDetails.map((item) => (
          <li key={item.id}>
            {item.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      {estimatedDeliveryTime && (
        <p>Your order will arrive by approximately {estimatedDeliveryTime}.</p>
      )}
    </div>
  );
};

export default ConfirmationPage;
