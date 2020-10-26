import React, { useEffect, useState } from "react";
import { useWindowSize, useMeasure } from "react-use";
import Confetti from "react-dom-confetti";

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 50,
  dragFriction: 0.5,
  duration: 5000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const ConfettiMain = ({ active }) => {
  return <Confetti active={active} config={config} />;
};

export default ConfettiMain;
