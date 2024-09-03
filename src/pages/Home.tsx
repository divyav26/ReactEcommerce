import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CarouselSwiper from "../comman/CarouselSwiper";
import Layout from "../comman/Layout";
import { addTocart } from "../redux/slice/cartSlice";
import { showErrorToast, showSuccessToast } from "@/comman/CommanToast";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterSearch, setFilterSearch] = useState<Product[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  console.log(selectedCategory)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = !!Cookies.get('user_token');

  const fetchProducts = async () => {
    try {
      const allproducts = await fetch("https://fakestoreapi.com/products");
      const res = await allproducts.json();
      setProducts(res);
      setFilterSearch(res); 
      console.log(res);
    } catch (error) {
      showErrorToast("Failed to fetch products.");
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value
    setSearchItem(searchItem)
    const filterSearchData = products.filter((item:any)=>{
      return item.title.toLowerCase().includes(searchItem.toLowerCase())

    })
    setFilterSearch(filterSearchData)
  };

  // const categoryFilter = (category: string) => {
  //   setSelectedCategory(category);
  //   if (category) {
  //     const filteredProducts = products.filter((item) =>
  //       item.category.toLowerCase() === category.toLowerCase()
  //     );
  //     console.log(filteredProducts)
  //     setFilterSearch(filteredProducts);
  //   } else {
  //     setFilterSearch(products); 
  //   }
  // };

  const categoryFilter = (category: string) => {
    setFilterSearch(products);
    if (category === "") {
      setSelectedCategory("");
    }
    else {
      setSelectedCategory(category);
      const filteredProducts = products.filter((item) =>
        item.category.toLowerCase() === category.toLowerCase()
      );
      setFilterSearch(filteredProducts);
    }
    
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (item: Product) => {
    if (isLoggedIn) {
      dispatch(addTocart(item));
      showSuccessToast(`${item.title.slice(0, 5)} added to cart!`);
    }
    else {
      navigate("/login");
    }
    
  };


  return (
    <Layout>
      <div>
        <CarouselSwiper />
      </div>

      <div className="py-4 px-[4rem]">
        <h1 className="text-center text-xl py-6">All Products!!</h1>
        <div className="md:flex md:justify-between items-center py-4">
          <div className="flex flex-wrap lg:justify-between lg:items-center gap-4">
            <button className="border border-gray-300 text-sm py-1 px-4" onClick={()=> categoryFilter("")}>All</button>
            <button className="border border-gray-300 text-sm py-1 px-4" onClick={()=>categoryFilter("men's clothing")}>Men's clothing</button>
            <button className="border border-gray-300 text-sm py-1 px-4" onClick={()=>categoryFilter("jewelery")}>jewelery</button>
            <button className="border border-gray-300 text-sm py-1 px-4" onClick={()=>categoryFilter("electronics")}>electronics</button>
            <button className="border border-gray-300 text-sm py-1 px-4" onClick={()=>categoryFilter("women's clothing")}>women's clothing</button>
          </div>
          <div className="min-w-72">
            <Input
              placeholder="Search for products"
              className="text-xs"
              value={searchItem}
              onChange={searchHandler}
            />
          </div>
        </div>
        <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
          {filterSearch.map((item, index) => (
            <div key={index} className="shadow-md py-2 px-6 rounded-md">
              <div className="flex justify-center items-center">
                <img
                  src={item.image}
                  alt="products Img"
                  className="w-[40%] h-[30vh]"
                />
              </div>
              <p className="text-sm py-1 text-gray-800">
                {item.title.slice(0, 20)}
              </p>
              <p className="text-xs py-1 text-gray-600">
                {item.description.slice(0, 50)}
                <span>....</span>
              </p>
              <p className="text-xs py-1">${item.price}</p>
              <div className="py-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex justify-center text-xs px-4 py-1 shadow-sm font-medium rounded text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Home;
