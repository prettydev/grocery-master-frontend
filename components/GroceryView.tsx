import React from "react";
import { IGrocery } from "../constants/types";

export default function GroceryView({ grocery }: { grocery: IGrocery }) {
  return <div className="flex flex-col mt-4">{JSON.stringify(grocery)}</div>;
}
