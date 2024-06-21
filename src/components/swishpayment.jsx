import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SwishPayment = ({ cart, placeOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    street: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.city) tempErrors.city = "City is required.";
    if (!formData.street) tempErrors.street = "Street is required.";
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^(?=.*[0-9])[- +()0-9]{10,15}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number must be valid.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const receiptId = placeOrder({ ...formData, paymentMethod: "swish" });
      navigate(`/confirmation/${receiptId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Swish Payment</h2>
      <div>
        <h3>Your Items</h3>
        {cart.map((item) => (
          <div key={item.id}>
            <p>
              {item.title} - ${item.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      {errors.city && <p className="error">{errors.city}</p>}
      <input
        type="text"
        name="street"
        value={formData.street}
        onChange={handleChange}
        placeholder="Street"
        required
      />
      {errors.street && <p className="error">{errors.street}</p>}
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      <button type="submit">Place Order</button>
    </form>
  );
};

export default SwishPayment;
