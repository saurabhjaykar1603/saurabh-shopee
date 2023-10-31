import React from "react";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <>
      <div className="sticky-top">
        <Navbar />
      </div>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Home;
