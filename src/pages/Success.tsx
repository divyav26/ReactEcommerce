
import { Link } from "react-router-dom";

const Success = () => {
  const order = localStorage.getItem("order");
  const orderDetails = order ? JSON.parse(order) : null;

  return (
    <div className="py-4 px-[2rem]">
    
      <h1 className="text-center text-xl py-6">Order Successful!</h1>
      <p className="text-center text-lg">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      {orderDetails && (
        <div className="py-4">
          <h2 className="text-lg font-semibold">Order Details:</h2>
          <p><strong>Name:</strong> {orderDetails.name}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
        </div>
      )}
      <div className="text-center py-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
