import React, { useState } from "react";
import SignupImg from "./images/signup.png";
import showToast from "crunchy-toast";
import axios from "axios";
import "./Signup.css"
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  // api rq
  async function signupUser() {
    if (!name) {
      showToast("name is required", "alert", 4000);
      return;
    }
    if (!email) {
      showToast("email is required", "alert", 4000);
      return;
    }
    if (!password) {
      showToast("password is required", "alert", 4000);
      return;
    }
    if (!mobile) {
      showToast("mobile number is required", "alert", 4000);
      return;
    }
    if (!address) {
      showToast("address is required", "alert", 4000);
      return;
    }
    const response = await axios.post("/signup", {
      name,
      email,
      password,
      mobile,
      address,
      gender,
    });
    console.log(response.data);
    if (response.data.success) {
      showToast(response.data.message, "success", 3000);
      window.location.href = "/login";
    } else {
      showToast(response.data.message, "alert", 3000);

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setAddress("");
    }
  }

  return (
    <>
      <section className="form my-4 mx-5">
        <div className="container ">
          <div className="row no-gutters border shadow p-1">
            <div className="col-lg-6">
              <img
                src={SignupImg}
                alt="dog"
                className="img-fluid d-block mx-auto  "
                style={{width: '440px'}}
              />
            </div>
            <div className="col-lg-6 px-5 pt-5">
              <h1 className="fw-bold py-3 signup-web-title">Saurabh's Shopee</h1>
              <h4 className="signup-text">Sign into Your Account</h4>

              <form>
                <div className="form-row">
                  <div className="col-lg-">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="form-control my-3 p-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
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
                <div className="form-row">
                  <div className="col-lg-">
                    <input
                      type="phone"
                      placeholder="Enter Your Phone Number"
                      className="form-control my-3 p-2"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-">
                    <input
                      type="text"
                      placeholder="Enter Your Adress"
                      className="form-control my-3 p-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex my-3">
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      className="gender me-1"
                      checked={gender === "male"}
                      onClick={() => {
                        setGender("male");
                      }}
                    />
                    <label htmlFor="male">Male</label>
                  </div>

                  <div className="ms-4 ">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      className="gender me-1"
                      checked={gender === "female"}
                      onClick={() => {
                        setGender("female");
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="form-row ">
                  <div className="col-lg-">
                    <button
                      type="button"
                      className="btn btn-warning mb-3 px-5 fs-5 fw-bold  "
                      onClick={signupUser}
                    >
                      Signup
                    </button>
                    <span className="ms-2 fw-bold"> <Link to='/login'>Already have an acount </Link> </span>
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

export default Signup;
