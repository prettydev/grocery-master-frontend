import React from "react";
import PlanCard from "../../components/PlanCard";
import { colors } from "../../constants/theme";
import { IPlan } from "../../constants/types";

const plans: [IPlan] = [
  {
    name: "Basic",
    price: 50,
    tooltip: "Charged monthly",
    descriptions: [
      "Modular Architecture",
      "Clean, Curated Visual Aesthetic",
      "Friendly Customer Support",
      "1-100 items",
    ],
  },
  {
    name: "Standard",
    price: 100,
    tooltip: "Charged monthly",
    descriptions: [
      "Modular Architecture",
      "Clean, Curated Visual Aesthetic",
      "Friendly Customer Support",
      "101 - 500 items",
    ],
  },
  {
    name: "Advanced",
    price: 150,
    tooltip: "Charged monthly",
    descriptions: [
      "Modular Architecture",
      "Clean, Curated Visual Aesthetic",
      "Friendly Customer Support",
      "501 and above",
    ],
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl m-16">Choose Your Plan</h1>
      </div>
      <div className="flex flex-row mx-32 gap-4 justify-center">
        {plans.map((p, i) => (
          <PlanCard plan={p} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
