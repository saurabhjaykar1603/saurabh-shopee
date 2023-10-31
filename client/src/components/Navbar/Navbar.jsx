import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getloggedInUser = JSON.parse(localStorage.getItem("user" || "{}"));
    setUser(getloggedInUser);
  }, []);
  return (
    <>
      <div className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning py-3 shadow">
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              <Link to="/" className="text-deco-none ">
                {" "}
                <h4 className="fs-4 fw-bold text-dark"> Saurabh's Shopee</h4>
              </Link>
            </div>

            <div>
              <Link
                className="me-4 fs-5 fw-medium text-dark text-deco-none login-links"
                to="/"
              >
                Home
              </Link>
              <Link
                className="me-4 fs-5 fw-medium text-dark text-deco-none login-links"
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="me-4 fs-5 fw-medium text-dark text-deco-none login-links"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="fs-5 fw-medium text-dark text-deco-none login-links"
                to="/my-order"
              >
                My Orders
              </Link>
            </div>

            <div>
              <h5 className="pointer login-links"> Hello {user.name || "Guest "}! </h5>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
