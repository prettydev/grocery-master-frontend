import React from "react";
import { IPlan } from "../constants/types";

const PlanCard = ({ plan }: { plan: IPlan }) => {
  return plan ? (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="ml-8 mt-8 text-red-500 font-bold text-2xl">
        {plan.name}
      </div>
      <div className="ml-12">
        <div className="w-full flex font-bold text-5xl">${plan.price}</div>
        <div className="text-xl">{plan.tooltip}</div>
      </div>
      <div className="mx-12 my-8 text-lg">
        {plan.descriptions.map((d, i) => (
          <div>✓ {d}</div>
        ))}
      </div>
      <div className="w-full mx-auto flex justify-center mb-8">
        <button className="w-3/5 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
          Get Started
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PlanCard;
