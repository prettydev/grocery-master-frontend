import React, { useEffect, useState } from "react";

interface IProps {
  src: string;
  size?: string;
}

export default function ProfileAvatar(props: IProps) {
  const { src, size = "lg" } = props;
  const [custom_class, setCustomClass] = useState("");
  useEffect(() => {
    if (size === "lg") {
      setCustomClass("rotate2 w-32 h-32");
    } else if (size === "md") {
      setCustomClass("rotate3 w-24 h-24");
    } else if (size === "sm") {
      setCustomClass("element w-12 h-12");
    }
  }, [size]);
  return (
    <div>
      <img className={`${custom_class} rounded-full mx-auto`} src={src} />
    </div>
  );
}
