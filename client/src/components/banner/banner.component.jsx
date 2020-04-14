import React from "react";

const Banner = ({ appName }) => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">{appName.toLowerCase()}</h1>
      <p>Read. Write. Grow.</p>
    </div>
  </div>
);

export default Banner;
