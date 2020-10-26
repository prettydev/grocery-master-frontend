import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageMagnifier = (props) => {
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: "",
          isFluidWidth: true,
          src: props.original,
        },
        largeImage: {
          src: props.original,
          width: 640,
          height: 480,
        },
        enlargedImagePortalId: "myPortal",
      }}
    />
  );
};

export default ImageMagnifier;
