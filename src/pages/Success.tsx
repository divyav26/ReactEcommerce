import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const order = localStorage.getItem("order");
  const [success, setSuccess] = useState(true); // Show success animation initially
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const orderDetails = order ? JSON.parse(order) : null;

  // Timer to navigate after 5 seconds
  useEffect(() => {
    const navigateTimer = setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 5000);

    // Cleanup timer on component unmount
    return () => clearTimeout(navigateTimer);
  }, [navigate]);

  // Timer to show text after 1 second
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearTimeout(textTimer);
  }, []);

  return (
    <div className="py-4 px-[2rem]">
      {orderDetails && (
        <div className="py-4">
          <h2 className="text-lg font-semibold">Order Details:</h2>
          <p>
            <strong>Name:</strong> {orderDetails.name}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.address}
          </p>
          <p>
            <strong>Payment Method:</strong> {orderDetails.paymentMethod}
          </p>
        </div>
      )}
      {success && (
        <div>
          <iframe
            className="w-full h-1/2 m-auto"
            src="https://lottie.host/embed/6277e9a8-fb78-40a2-9961-b543fa54f99d/YxAuRqSVzB.json"
            title="Success Animation"
          />
        </div>
      )}
      {showText && (
        <div className="text-center py-4">
          <h1 className="text-center text-xl py-6">Order Successful!</h1>
          <p className="text-center text-lg">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>
      )}
    </div>
  );
};

export default Success;
