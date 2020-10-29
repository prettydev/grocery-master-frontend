import React, { useState, useEffect } from "react";
import useTopGroceries from "../../hooks/useTopGroceries";
import Logo from "../../components/Logo";

import { colors } from "../../constants/theme";
import GroceryCard from "../../components/GroceryCard";
const BannerImage = require("../../images/banner.png");

const TopGroceries = () => {
  const groceries = useTopGroceries();

  return (
    <div id="top_groceries" className="min-h-screen">
      <div>
        <img src={BannerImage} className="h-96 object-cover w-full" />
      </div>
      <div className="flex flex-col absolute top-8 w-full">
        <div className="mx-auto">
          <Logo />
        </div>
        <div className="mx-auto">
          <span className="text-6xl text-black font-bold">
            Start Shopping Now
          </span>
        </div>
      </div>
      <div className="mt-16 mx-32">
        <div className="inline-flex gap-8">
          {groceries.map((g, i) => (
            <GroceryCard key={i} grocery={g} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGroceries;
