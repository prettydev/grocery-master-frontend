import React from "react";
import { IPlan } from "../constants/types";

const PlanCard = ({ plan, onStart }) => {
  return plan ? (
    <div className="max-w-sm rounded overflow-hidden shadow-xl">
      {plan.name === "Standard" && (
        <div className={`w-full flex justify-end pr-6`}>
          <h1 className="absolute text-lg bg-green-600 px-2 rounded-md opacity-100 text-white">
            Best Value
          </h1>
        </div>
      )}
      <div className="ml-8 mt-8 text-red-500 font-bold text-2xl">
        {plan.name}
      </div>
      <div className="ml-12">
        <div className="w-full flex font-bold text-5xl">${plan.price}</div>
        <div className="text-xl">{plan.tooltip}</div>
      </div>
      <div className="mx-12 my-8 text-lg">
        {plan.descriptions.map((d, i) => (
          <div key={i}>✓ {d}</div>
        ))}
      </div>
      <div className="w-full mx-auto flex justify-center mb-8">
        <button
          className="w-3/5 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={() => onStart(plan.name)}
        >
          Get Started
        </button>
      </div>
    </div>
  ) : (
      <></>
    );
};

export default PlanCard;
