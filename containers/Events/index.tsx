import React from "react";
import { colors } from "../../constants/theme";

const events = [
  {
    id: 1,
    icon: "event1.svg",
    title: "STEP 1",
    description:
      "Click and start to select your product under the touch kiosk.",
  },
  {
    id: 2,
    icon: "event2.svg",
    title: "STEP 2",
    description: "Design your product, add size and quantity",
  },
  {
    id: 3,
    icon: "event3.svg",
    title: "STEP 3",
    description:
      "Confirm the order and settle the payment either at the cashier or by Payme.",
  },
  {
    id: 4,
    icon: "event4.svg",
    title: "STEP 4",
    description:
      "After settling the payment, go to counter and pick up your product",
  },
];

const Events = () => {
  return (
    <div
      id="events"
      className="bg-black min-h-screen text-white flex flex-col justify-around"
    >
      <div className="text-center">
        <h1 className="text-4xl">DEPT_X EVENT</h1>
        <p className="text-white text-lg mt-4">
          Please follow below instructions and steps to complete the live
          printing order:
        </p>
      </div>
      <div className="flex flex-wrap justify-around">
        {events.map((item, idx) => (
          <div
            key={idx}
            className="text-center flex flex-col gap-2 sm:gap-8 w-1/2 sm:w-1/5"
          >
            <div className="thumbnail w-7/12 mx-auto">
              <img
                src={require(`./${item.icon}`)}
                alt={item.title}
                className="mx-auto"
              />
            </div>
            <h3
              className="title text-xl sm:text-3xl"
              style={{ color: colors.primary }}
            >
              {item.title}
            </h3>
            <p className="excerpt text-white w-5/6 sm:w-3/4 mx-auto">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
