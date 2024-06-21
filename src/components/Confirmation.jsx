import React from "react";

const Confirmation = ({ orderDetails }) => {
  const estimatedTime = Math.floor(Math.random() * 11) + 20;

  const totalAmount = orderDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Thank you for your order!</h2>
      <p>
        Your order is on its way and will arrive in approximately{" "}
        {estimatedTime} minutes.
      </p>
      <h3>Order Summary:</h3>
      <ul>
        {orderDetails.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default Confirmation;
