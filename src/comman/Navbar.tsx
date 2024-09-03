import { auth } from "@/firebase/Firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { BsCartCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { totalQuantity } = useSelector((state: any) => state.allcart);
  const isLoggedIn = !!Cookies.get("user_token"); // Use the same name
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("user_token"); // Use the same name here
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-black text-white w-full p-4 flex justify-around items-center">
        <div>
          <NavLink to="/">ECommerce</NavLink>
        </div>
        <div></div>
        <div className="flex justify-between items-center gap-6">
          {isLoggedIn ? (
            <>
              <NavLink to="/cart" className="text-white flex justify-center items-center">
                <BsCartCheck />
                <span className="text-xs">({totalQuantity})</span>
              </NavLink>
              <button onClick={handleLogout} className="text-white flex justify-center items-center">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-white flex justify-center items-center">
                Login
              </NavLink>
              <NavLink to="/register" className="text-white flex justify-center items-center">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
