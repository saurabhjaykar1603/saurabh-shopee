import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import showToast from "crunchy-toast";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getloggedInUser = JSON.parse(localStorage.getItem("user" || "{}"));
    if (getloggedInUser) {
      alert("You have already logged in");
      window.location.href = "/"
    }
  }, []);

  const loginUser = async () => {
    if (!email) {
      showToast("email is required", "alert", 4000);
      return;
    }
    if (!password) {
      showToast("password is required", "alert", 4000);
      return;
    }
    const response = await axios.post("/login", {
      email,
      password,
    });
    console.log(response?.data);
    if (response?.data?.success) {
      showToast(response.data.message, "success", 4000);
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      window.location.href = "/";
    } else {
      showToast(response.data.message, "warning", 4000);
    }
  };

  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>
      <section className="form my-4 mx-5">
        <div className="container ">
          <div className="row no-gutters border shadow bg-light p-1 rounded">
            <div className="col-lg- px-5 pt-5">
              <h1 className="fw-bold py-3 signup-web-title">
                Saurabh's Shopee
              </h1>
              <h4 className="signup-text">Login into Your Account</h4>

              <form>
                <div className="form-row">
                  <div className="col-lg-">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="form-control my-3 p-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-">
                    <input
                      type="password"
                      placeholder="Enter Your password"
                      className="form-control my-3 p-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row ">
                  <div className="col-lg-">
                    <button
                      type="button"
                      className="btn btn-warning mb-3 px-5 fs-5 fw-bold  "
                      onClick={loginUser}
                    >
                      Login
                    </button>
                    <span className="ms-2 fw-bold">
                      {" "}
                      <Link to="/signup">
                        you don't have an account ?{" "}
                      </Link>{" "}
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
