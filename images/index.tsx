import React from "react";
import { useImage } from "react-image";

const logo_src = require("./logo.png");
const win_src = require("./win.png");
const coin_src = require("./coin.png");
const point_src = require("./point.png");
const bonus_src = require("./bonus.png");
const tenor_src = require("./tenor.gif");

const Logo = () => {
  const { src } = useImage({
    srcList: logo_src,
  });
  return (
    <img
      src={src}
      alt="Exhibia"
      className="element object-contain w-56 h-auto px-2"
    />
  );
};

const Win = () => {
  const { src } = useImage({
    srcList: win_src,
  });
  return <img src={src} />;
};

const Coin = () => {
  const { src } = useImage({
    srcList: coin_src,
  });
  return <img src={src} />;
};

const Point = () => {
  const { src } = useImage({
    srcList: point_src,
  });
  return <img src={src} />;
};

const Bonus = () => {
  const { src } = useImage({
    srcList: bonus_src,
  });
  return <img src={src} />;
};

const Tenor = () => {
  const { src } = useImage({
    srcList: tenor_src,
  });
  return <img src={src} />;
};

export { Logo, Win, Coin, Point, Bonus, Tenor };
