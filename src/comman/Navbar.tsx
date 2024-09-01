import { BsCartCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
const {totalQuantity} = useSelector((state:any) => state.allcart);
  return (
    <>
    <nav className="bg-black text-white w-full p-4 flex justify-between items-center">
        <div>
            <NavLink to="/">ECommerce</NavLink>
        </div>
        <div>
            <NavLink to="/cart" className="text-white flex justify-center items-center"><BsCartCheck /><span className="text-xs">({totalQuantity})</span></NavLink>
        </div>
    </nav>
    </>
  );
};

export default Navbar;
