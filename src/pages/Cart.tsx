import Layout from "@/comman/Layout"
import { useDispatch, useSelector } from "react-redux"
import { MdDeleteForever } from "react-icons/md";
import { incrementQuantity, decrementQuantity,removeItem } from "../redux/slice/cartSlice";


const Cart = () => {
    const { cartItemData, totalQuantity, totalPrice } = useSelector((state:any) => state.allcart);
    const dispatch = useDispatch()
  return (
    <Layout>

      {
        cartItemData.length === 0 ? (<div className="px-4 py-4">
          <div>
            <h1 className="text-center text-xl py-6 text-red-500 text-semibold">Your Cart Is Empty</h1>
          </div>
        </div>
        ):
        <div className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
        {
          cartItemData.map((item:any,index:any)=>{
              return(
                  <>
                  <div key={index}  className="flex justify-between items-center border-b pb-4 mb-4">
                  <img src={item.item.image}  className="w-24 h-24 object-cover" />
                  <div className="flex-1 mx-4">
                    <h2 className="text-xs font-semibold">{item.item.title}</h2>
                    <p className="text-gray-600">{item.item.price}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={()=>dispatch(decrementQuantity(item.item.id))} className="px-2 py-1 border rounded-md">
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={()=>dispatch(incrementQuantity(item.item.id))} className="px-2 py-1 border rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                  <button
                  onClick={()=>dispatch(removeItem(item.item.id))}
                    className="text-red-500"
                  >
                    <MdDeleteForever className="text-2xl" />
                  </button>
                </div>
                  </>
              )
          })
        }         
           
        </div>
  
            <div className="p-4 rounded-md shadow-sm border">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <p className="mt-2">Total Items:{totalQuantity}</p>
              <p className="mt-2">Total Price:{totalPrice} </p>
              <button
                type="button"
                className="m-4 text-xs w-full border-[2px] border-gray-300  text-black py-2 rounded-md">
                Proceed to Checkout
              </button>
            </div>
          </div>
     
      </div>
      }
         
    </Layout>
   
    
  )
}

export default Cart
