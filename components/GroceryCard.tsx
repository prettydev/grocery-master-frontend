import React from "react";
import { IGrocery } from "../constants/types";

const GroceryCard = ({ grocery }: { grocery: IGrocery }) => {
  return grocery ? (
    <div className="max-w-sm rounded overflow-hidden shadow-xl">
      <img
        className="h-48 w-72 object-cover"
        src={grocery.logo.link}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 w-full flex">
        <div className="font-bold text-xl mb-2 mx-auto">{grocery.name}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default GroceryCard;
