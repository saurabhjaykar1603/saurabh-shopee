import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

function BuyPage() {
  const { id } = useParams();
  const [prodcut, setProduct] = useState({});

  const loadproduct = async () => {
    if (!id) {
      return;
    }
    const response = await axios.get(`/product/${id}`);
    setProduct(response?.data?.data);
  };

  useEffect(() => {
    loadproduct();
  }, []);
  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>
      <div>
        <p className="text-center mt-3 fw-bold fs-3  w-50 mx-auto ">buy now</p>
      </div>
      <div className="container bg-warning">
        <div className="row">
          <div className="col-lg-4 bg-primary">
            <div className="py-5">
              <img src={prodcut.image} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="p-4 p-md-2 px-4">
              <h1>{prodcut.name}</h1>
              <h3 className="text-danger">₹ {prodcut.price}/-</h3>
              <p className="fs-5 fw-bold">{prodcut.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyPage;
