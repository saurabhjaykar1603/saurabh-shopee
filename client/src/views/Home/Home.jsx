import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const response = await axios.get("/products");
    console.log(response?.data?.data);
    setProducts(response?.data?.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>
      <div>
        <p className="text-center my-3 fw-bold fs-3  w-50 mx-auto">
          Welcome to Saurabh's Shoppe
        </p>
      </div>
      <section className="d-flex justify-content-evenly">
        {products?.map((product, i) => {
          const { name, description, image, price } = product;
          return (
            <ProductCard
              key={i}
              name={name}
              description={description}
              image={image}
              price={price}
            />
          );
        })}
      </section>
    </>
  );
}

export default Home;
