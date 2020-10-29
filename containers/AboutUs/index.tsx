import React from "react";
import { colors } from "../../constants/theme";

const About1 = require("../../images/about1.gif");
const About2 = require("../../images/about2.jpg");

const AboutUs = () => {
  return (
    <div id="about" className="min-h-screen">
      <div className="flex flex-row items-center mt-16 mx-32 gap-8">
        <div className="">
          <img src={About1} />
        </div>
        <div className="">
          <span className="text-6xl">Introducing the future of Grocery</span>
          <p className="text-2xl mt-8">
            Whether you are running a single grocery store, a food supermarket
            chain or if you are responsible for the IT department of a food
            retailer have a look at our Grosery Commerce Software. We think
            you’ll be impressed.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center mt-16 mx-32 gap-8 justify-between">
        <div className="w-1/2 text-left px-12">
          <div className="text-5xl">Create Grocery</div>
          <div className="text-5xl">List Items</div>
          <div className="text-5xl">Choose Delivery Slots</div>
          <div className="text-5xl">Start Receiving Orders</div>
        </div>
        <div className="">
          <img src={About2} className="object-cover h-96" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
