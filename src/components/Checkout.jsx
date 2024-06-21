import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, placeOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    street: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSecurityCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setFormData((prevFormData) => ({ ...prevFormData, cvv: value }));
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      let formattedValue = value;
      if (value.length >= 2) {
        formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        expiryDate: formattedValue,
      }));
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setFormData((prevFormData) => ({
        ...prevFormData,
        cardNumber: formattedValue,
      }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name) tempErrors.name = "Please enter your name.";
    if (!formData.city) tempErrors.city = "City cannot be empty.";
    if (!formData.street) tempErrors.street = "Street is required.";

    const cardNumber = formData.cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(cardNumber)) {
      tempErrors.cardNumber = "Card Number must be 16 digits.";
    }

    if (!/^\d{3}$/.test(formData.cvv)) {
      tempErrors.cvv = "CVV must be 3 digits.";
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      tempErrors.expiryDate = "Expiry Date must be in MM/YY format.";
    }

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
      const receiptId = placeOrder({ ...formData, paymentMethod: "card" });
      navigate(`/confirmation/${receiptId}`);
    }
  };

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <p className="error">{errors.city}</p>}

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
        />
        {errors.street && <p className="error">{errors.street}</p>}

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleCardNumberChange}
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={formData.cvv}
          onChange={handleSecurityCodeChange}
        />
        {errors.cvv && <p className="error">{errors.cvv}</p>}

        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={formData.expiryDate}
          onChange={handleExpiryDateChange}
        />
        {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <button type="submit">Place Order</button>
      </form>
    </section>
  );
};

export default Checkout;
