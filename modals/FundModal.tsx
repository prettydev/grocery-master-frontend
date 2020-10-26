import React, { useState } from "react";
import { useRouter } from "next/router";
import { Modal, Radio, Checkbox, Typography, Divider } from "antd";

import { useMapState } from "../context/store";
import AnimatedText from "../components/AnimatedText";

const { Title } = Typography;

export default function FundModal(props) {
  const { setMapState } = useMapState();

  const router = useRouter();

  const [amount, setAmount] = useState(20);
  const [isCredit, setIsCredit] = useState(false);

  const onBuyOptionChange = (event) => {
    setAmount(event.target.value);
  };

  const onCheckbox = (event) => {
    setIsCredit(event.target.checked);
  };

  return (
    <Modal
      title="Buy Bids"
      centered
      visible={props.visible}
      okText={"Buy"}
      onOk={() => {
        setMapState({
          type: "setCurrentPayAmount4Fund",
          amount,
        });
        props.onOk();
      }}
      onCancel={() => props.onCancel()}
    >
      <Radio.Group
        onChange={onBuyOptionChange}
        value={amount}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Radio value={20}>20 Bids + 5% Bonus = 21 Bids</Radio>
        <Radio value={50}>50 Bids + 10% Bonus = 55 Bids</Radio>
        <Radio value={100}>100 Bids + 12% Bonus = 112 Bids</Radio>
        <Radio value={200}>200 Bids + 15% Bonus = 230 Bids</Radio>
        <Radio value={500}>500 Bids + 20% Bonus = 600 Bids</Radio>
      </Radio.Group>
      <Divider />
      <Checkbox onChange={onCheckbox}>Use Funding Credit</Checkbox>
      <Title>
        Total: $
        <AnimatedText value={amount} />
      </Title>
    </Modal>
  );
}
