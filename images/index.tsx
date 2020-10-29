import React from "react";
import { useImage } from "react-image";

const logo_src = require("./logo.png");

const Logo = () => {
  const { src } = useImage({
    srcList: logo_src,
  });
  return (
    <img
      src={src}
      alt="byebyeGROCERY"
      className="element object-contain w-56 h-auto px-2"
    />
  );
};

export { Logo };
