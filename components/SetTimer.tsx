import React, { useState, useEffect } from "react";
import { Radio, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { useMapState } from "../context/store";

import { SET_TIMER_MUTATION } from "../apis/mutations";

const SetTimer = ({ auction, disabled=false }) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const [setTimer] = useMutation(SET_TIMER_MUTATION);

  return (
    <Radio.Group
      size="small"
      defaultValue={auction.timer}
      disabled={disabled}
      onChange={async (event) => {
        console.log(event.target.value);
        const res = await setTimer({
          variables: {
            input: {
              auction_id: auction.id,
              timer: event.target.value,
            },
          },
        });

        if (res.data.setTimer) {
          message.success("Updated the timer!");
        } else {
          message.error("Failed!");
        }
      }}
    >
      {[5, 10, 30, 120, 600, 3600].map((t, i) => (
        <Radio.Button key={i} value={t}>
          {t === 3600 ? `1h` : `${t}s`}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default SetTimer;
