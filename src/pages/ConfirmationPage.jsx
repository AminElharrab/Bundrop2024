import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { receiptid } = useParams();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        console.log("Fetching receipt with ID:", receiptid);
        const response = await fetch(
          `http://localhost:5000/receipts/${parseInt(receiptid, 10)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch receipt");
        }
        const data = await response.json();
        console.log("Fetched receipt data:", data);
        setReceipt(data);
      } catch (error) {
        console.error("Error fetching receipt:", error);
      }
    };

    fetchReceipt();
  }, [receiptid]);

  if (!receipt) {
    return <div>Loading...</div>;
  }

  const totalAmount = receipt.orderDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
    </div>
  );
};

export default ConfirmationPage;
