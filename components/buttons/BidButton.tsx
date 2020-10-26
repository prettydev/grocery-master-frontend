import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { message } from "antd";

import { SButton } from "./SButton";
import { useMapState } from "../../context/store";
import { IAuction } from "../../constants/types";
import { BID_MUTATION } from "../../apis/mutations";

export const BidButton = ({ auction, disabled = false }) => {
  const router = useRouter();

  const {
    mapState: { user },
  } = useMapState();

  const [bidLoading, setBidLoading] = useState(false);

  const [bid] = useMutation(BID_MUTATION);

  const bidProc = async () => {
    if (!user || !auction) {
      router.push(`/`);
      return;
    }
    if (user.coins === 0) {
      message.error("Not enough credit to bid!");
      return;
    }

    const input = {
      auction_id: auction.id,
      user: user.id,
      value: auction.bidders.length ? auction.bidders[0].value + 1 : 1,
    };

    setBidLoading(true);

    const res = await bid({
      variables: {
        input,
      },
    });

    setBidLoading(false);

    if (!res.data.bid) {
      message.error("Failed!");
    }
  };

  return (
    <SButton
      title="BID"
      loading={bidLoading}
      proc={bidProc}
      disabled={disabled}
    />
  );
};
