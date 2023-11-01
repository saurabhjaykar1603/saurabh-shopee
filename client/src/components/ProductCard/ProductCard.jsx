import React from "react";
import "./ProductCard.css";

function ProductCard({ name, description, image, price, category, brand }) {
  return (
    <div>
      <div className="product-card-container">
        <div className="card-body">
          <img src={image} alt="" className="product-card-img" />
          <div className="product-card-details text-center">
            <p className="product-card-title text-center fw-bold">{name}</p>
            <p className="product-card-desc text-center">{description}</p>
            <hr className="m-0 mb-2 prodcut-card-hr " />
            <p className="product-card-price fw-bold fs-5 "> Price ₹ {price}/-</p>
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-warning px-5 fs-6 fw-bols">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
