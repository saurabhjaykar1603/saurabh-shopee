import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./MyOrder.css";
import { Link } from "react-router-dom";
function MyOrder() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const STATUS_BAGE_COLOR_MAP = {
    "pending": "bage-danger",
    "shipped": "bage-warning",
    "deleivered": "bage-success"
  };


  const loadOrders = async () => {
    const userId = user._id;
    if (!userId) {
      return;
    }
    const response = await axios.get(`/orders/user/${userId}`);
    setOrders(response?.data?.data);
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  useEffect(() => {
    const storageUse = JSON.parse(localStorage.getItem("user" || "{}"));
    if (storageUse?.email && storageUse?.name) {
      setUser(storageUse);
    } else {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, [orders]);

  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>
      <div>
        <h1 className="text-center my-3 fw-bold">My Order</h1>
        <div>
          {orders?.map((order, i) => {
            console.log(order);
            const { product, quantity, status, deliveryCharges } = order;
            console.log();
            return (
              <>
                <div className="card container shadow mt-3 order-container">
                  <div className="row">
                    <div className="col-md-2">
                      <img src={product.image} alt="" style={{width : "11rem"}}/>
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <div className="card-body user">
                        <Link to={`/buy-now/${product._id}` }className="fs-3 fw-medium text-deco-none">{product.name}</Link>
                        <p className=" fw-bold fs-6 mt-3">
                          {product.price} x {quantity} = ₹{" "}
                          {product.price * quantity}/-
                        </p>
                        <span className={`order-status text-dark rounded-2 text-center fw-bold fs-5 ${STATUS_BAGE_COLOR_MAP[status] }`}>
                          {status}
                        </span>
                        <p className="fw-bold">
                          Delivery Charges = ₹ {deliveryCharges}/-
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyOrder;
