import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const order = localStorage.getItem("order");
  const [success, setSuccess] = useState(true); // Set initial state to true to show success animation
  const navigate = useNavigate();
  const orderDetails = order ? JSON.parse(order) : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="py-4 px-[2rem]">
       {success && (
        <div>
          <iframe
            className="w-full h-1/2 m-auto"
            src="https://lottie.host/embed/6277e9a8-fb78-40a2-9961-b543fa54f99d/YxAuRqSVzB.json"
            title="Success Animation"
          />
        </div>
      )}
      <h1 className="text-center text-xl py-6">Order Successful!</h1>
      <p className="text-center text-lg">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
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
     
    </div>
  );
};

export default Success;
