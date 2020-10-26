import React from "react";
import { message, Switch } from "antd";
import { useMutation } from "@apollo/client";

import { SET_RESERVED_MUTATION } from "../apis/mutations";

const ReserveSwitch = ({ auction, disabled = false }) => {
  const [setReserved] = useMutation(SET_RESERVED_MUTATION);

  const changeStateProc = async (value) => {
    const res = await setReserved({
      variables: {
        reserved: {
          auction_id: auction.id,
          value,
        },
      },
    });
    try {
      if (res.data.setReserved) {
        message.success("Updated the reserved state!");
      } else {
        message.error("Failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex">
      <div className="mx-auto">
        <Switch
          style={{ marginRight: 20 }}
          checked={auction.reserved}
          onChange={changeStateProc}
          disabled={disabled}
        />
        <span>bids reserved</span>
      </div>
    </div>
  );
};

export default ReserveSwitch;
