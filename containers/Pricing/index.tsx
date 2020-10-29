import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { message } from "antd";
import { PLAN_MUTATION } from "../../apis/mutations";
import PlanCard from "../../components/PlanCard";
import { colors } from "../../constants/theme";
import { IPlan } from "../../constants/types";
import { useMapState } from "../../context/store";

const plans: IPlan[] = [
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
  const router = useRouter();
  const {
    mapState: { user },
  } = useMapState();

  const [updatePlan] = useMutation(PLAN_MUTATION);

  const onPlan = async (plan_name) => {
    if (!user) {
      console.log("no user!");
      router.push("/auth/login");
      return;
    }

    if (plan_name !== "Standard" && plan_name !== "Advanced") {
      console.log("no valid user or coins...");
      return;
    }

    const { data } = await updatePlan({
      variables: {
        plan_name,
        user_id: user.id,
      },
    });

    if (data.updatePlan) {
      message.success("Success to update plan!");
    } else {
      message.error("Failed to update plan!");
    }
  };

  return (
    <div id="pricing" className="min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl m-16">Choose Your Plan</h1>
      </div>
      <div className="flex flex-row mx-32 gap-4 justify-center">
        {plans.map((p, i) => (
          <PlanCard plan={p} onStart={onPlan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
