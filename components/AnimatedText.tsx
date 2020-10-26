import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export default function AnimatedText(props) {
  const { value = 0, offset = 1 } = props;

  const [target, setTarget] = useState(0);

  const [prevAmount, setPrevAmount] = useState(target);
  const [amount, setAmount] = useState(target);

  const spring_props = useSpring({
    number: amount,
    from: { number: prevAmount },
    to: { number: amount },
    offset,
  });

  useEffect(() => {
    setPrevAmount(amount);
    setAmount(target);
  }, [target]);

  useEffect(() => {
    if (!value) {
      return;
    }
    setTarget(value);
  }, [value]);

  return (
    <animated.span className="font-bold">
      {spring_props.number.interpolate((val) => Math.round(val))}
    </animated.span>
  );
}
