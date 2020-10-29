import React, { useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import { colors } from "../../constants/theme";

const About = require("../../images/about.gif");
const About1 = require("../../images/about1.jpg");
const About2 = require("../../images/about2.jpg");
const About3 = require("../../images/about3.jpg");
const About4 = require("../../images/about4.jpg");

const aboutData = [
  {
    nav: "Create Grocery",
    image: About1,
    title: "Grab some attention with this short headline.",
    description:
      "Volutpat egestas nibh rhoncus mauris semper. Quam nec consectetur est sed lobortis orci ridiculus.",
    color: "red",
  },
  {
    nav: "List Items",
    image: About2,
    title: "Grab some attention with this short headline.",
    description:
      "Volutpat egestas nibh rhoncus mauris semper. Quam nec consectetur est sed lobortis orci ridiculus.",
    color: "green",
  },
  {
    nav: "Choose Delivery Slots",
    image: About3,
    title: "Grab some attention with this short headline.",
    description:
      "Volutpat egestas nibh rhoncus mauris semper. Quam nec consectetur est sed lobortis orci ridiculus.",
    color: "blue",
  },
  {
    nav: "Start Receiving Orders",
    image: About4,
    title: "Grab some attention with this short headline.",
    description:
      "Volutpat egestas nibh rhoncus mauris semper. Quam nec consectetur est sed lobortis orci ridiculus.",
    color: "orange",
  },
];

const reviewData = [
  {
    rate: 4.97,
    review:
      "I love how simple the online interface is to get all the basic things done.",
    customer: "Kelly Brimbore",
    location: "Newcastle",
  },
  {
    rate: 3.97,
    review: "They absolutely nailed the look and feel of our grocery.",
    customer: "Andrew Sims",
    location: "London",
  },
  {
    rate: 4.97,
    review:
      "Couldn’t have been happier with my experience - what an absolute masterpiece!",
    customer: "Angela P.",
    location: "Queensland",
  },
];

const AboutUs = () => {
  const [active, setActive] = useState(3);

  return (
    <div id="about" className="min-h-screen">
      <div className="flex flex-row items-center mt-16 mx-32 gap-8">
        <div className="">
          <img src={About} className="h-auto w-full object-contain" />
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
      <div className="bg-gray-100 py-32 mt-16">
        <div className="flex flex-row items-center mx-32 gap-8 justify-between">
          <div className="w-1/2 text-left px-12">
            {aboutData.map((d, i) => (
              <div
                key={i}
                className={`text-5xl font-bold ${
                  i === active ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setActive(i)}
              >
                {d.nav}
              </div>
            ))}
          </div>
          {aboutData.map((d, i) => (
            <div
              key={i}
              className={`absolute right-32 flex flex-row ${
                i === active ? "visible" : "invisible"
              }`}
            >
              <div className="w-72 flex flex-col gap-8 p-8 bg-white shadow-xl mt-36 -mr-16 z-10 rounded-2xl">
                <div className="text-2xl font-bold" style={{ color: d.color }}>
                  {d.title}
                </div>
                <div className="text-lg">{d.description}</div>
              </div>
              <div className="">
                <img src={d.image} className="object-cover h-96" />
              </div>
            </div>
          ))}
        </div>
        <div className="mx-32 mt-36">
          <h1 className="font-bold text-5xl">Customer love</h1>
          <span className="ml-8 my-16 text-3xl">
            We have an average customer rating of 4.97/5
          </span>
          <div className="flex flex-row justify-center gap-8 mt-16">
            {reviewData.map((r, i) => (
              <ReviewCard review={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
