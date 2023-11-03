import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import plusImage from "./images/add.png";
import minusImage from "./images/minus.png";
import showToast from "crunchy-toast";
import "./BuyPage.css";

function BuyPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState(40);

  const loadProduct = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(`/product/${id}`);
      setProduct(response?.data?.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);
  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const responce = await axios.post("/order", {
      user: user._id,
      product: id,
      productQuantity: productQuantity,
      deliveryCharges: deliveryCharges,
      shippingAddress: shippingAddress,
      price: product.price,
    });

    if (responce?.data?.success) {
      alert(responce?.data?.message);
      window.location.href = "/order";
    } else {
      alert(responce?.data?.message);
    }
  };

  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>

      <div className="container bg-light border-2 shadow rounded-3 mt-5">
        <div className="row p-2">
          <div className="col-lg-4">
            <div className="buy-image-container">
              <img
                src={product.image}
                alt=""
                className="img-flui buy-product-card-img "
              />
            </div>
          </div>
          <div className="col-lg-8" style={{ borderLeft: "2px solid tomato" }}>
            <div className="p-4 p-md-2 px-4">
              <h1>{product.name}</h1>
              <h4 className="text-danger mt-3 ">₹ {product.price}/-</h4>
              <p className="fs-6 fw-bold mt-3 ">{product.description}</p>
              <div
                className="d-flex justify-content-evenly align-items-center mt-4"
                style={{ width: "230px" }}
              >
                <button className="border rounded">
                  <img
                    src={minusImage}
                    alt=""
                    style={{ width: "30px" }}
                    onClick={() => {
                      if (productQuantity === 1) {
                        showToast(
                          "Product quantity must be one or more",
                          "error",
                          4000
                        );
                      } else {
                        setProductQuantity(productQuantity - 1);
                      }
                    }}
                  />
                </button>
                <h4 className="fw-bold">{productQuantity}</h4>
                <button
                  className="border rounded"
                  onClick={() => {
                    setProductQuantity(productQuantity + 1);
                  }}
                >
                  <img src={plusImage} alt="" style={{ width: "30px" }} />
                </button>
              </div>
              <div
                className=" d-flex flex-column mt-3 card card-body"
                style={{ width: "26rem" }}
              >
                <div>
                  <input
                    type="radio"
                    id="40"
                    name=""
                    className=" me-1"
                    checked={deliveryCharges === 40}
                    onClick={() => {
                      setDeliveryCharges(40);
                    }}
                  />
                  <label htmlFor="40">
                    {" "}
                    Expected delivery in 3 days in 40 rs
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="radio"
                    id="100"
                    name=""
                    className=" me-1"
                    checked={deliveryCharges === 100}
                    onClick={() => {
                      setDeliveryCharges(100);
                    }}
                  />
                  <label htmlFor="100">
                    Expected delivery in 1 day in 100 rs{" "}
                  </label>
                </div>
              </div>
              <div className="w-50 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Shipping Address Here"
                  value={shippingAddress}
                  onChange={(e) => {
                    setShippingAddress(e.target.value);
                  }}
                />
              </div>
              <div className="order-btn text-center w-50 mt-3">
                <button
                  type="button"
                  className="btn btn-warning w-100 fw-bold"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyPage;
