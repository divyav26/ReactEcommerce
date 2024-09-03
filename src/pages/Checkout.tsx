import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { clearCart } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "credit",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate storing order details in local storage
    try {
      localStorage.setItem("order", JSON.stringify(formData));
      dispatch(clearCart())
      navigate("/success");
    } catch (error) {
      console.error("Failed to save order details.");
    }
  };

  return (
    <div className="py-4 px-[2rem]">
      <h1 className="text-center text-xl py-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <Input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          className="mb-4"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
