import React from "react";

const LogoImage = require("../images/logo.png");

const Logo = () => {
  return (
    <div className="flex flex-row items-center">
      <img
        alt="byebyeGROCERY"
        src={LogoImage}
        className="element object-contain px-2 w-20"
      />
      <span
        className="text-3xl text-black font-medium"
        style={{ textTransform: "initial" }}
      >
        byebyeGROCERY
      </span>
    </div>
  );
};

export default Logo;
