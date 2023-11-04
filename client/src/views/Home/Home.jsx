import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const searchProducts = async () => {
    if (search == "") {
      getAllProducts();
      return;
    }
    try {
      const response = await axios.get(`/products/search?q=${search}`);
      console.log(response);
      setProducts(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [search]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/products");
      console.log(response?.data?.data);
      setProducts(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
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
        <p className="text-center mt-3 fw-bold fs-3  w-50 mx-auto">
          Welcome to Saurabh's Shoppe
        </p>
      </div>
      <div className="d-flex  justify-content-center mb-3">
        <div>
          <input
            type="text"
            value={search}
            className="form-control px-5"
            placeholder="search products"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <section className="d-flex justify-content-evenly">
        {products?.map((product, i) => {
          const { _id, name, description, image, price } = product;
          return (
            <ProductCard
              key={i}
              name={name}
              description={description}
              image={image}
              price={price}
              id={_id}
            />
          );
        })}
      </section>
    </>
  );
}

export default Home;
