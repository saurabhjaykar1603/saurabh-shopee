import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

function MyOrder() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const storageUse = JSON.parse(localStorage.getItem("user" || "{}"));
    if (storageUse?.email && storageUse?.name) {
      setUser(storageUse);
    } else {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, []);

 
  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>
      <div>
        <h1 className="text-center my-3 fw-bold">My Order</h1>
      </div>
      
    </>
  );
}

export default MyOrder;
