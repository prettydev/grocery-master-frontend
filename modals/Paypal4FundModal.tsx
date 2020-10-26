import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useMutation } from "@apollo/client";
import { Alert, Button, Modal, message } from "antd";

import { useMapState } from "../context/store";
import { FUND_MUTATION } from "../apis/mutations";

const Paypal4FundModal = (props) => {
  const {
    mapState: { user, currentPayAmount4Fund },
  } = useMapState();

  const [fund, { loading, error }] = useMutation(FUND_MUTATION);

  return (
    <Modal
      title="Paypal Checkout to Fund"
      centered
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={[
        <Button key="submit" type="primary" onClick={() => props.onOk()}>
          Close
        </Button>,
      ]}
    >
      {error && <Alert message={error.message} />}
      <PayPalButton
        // amount={currentPayAmount4Fund}
        amount={0.1}
        shippingPreference="NO_SHIPPING"
        onSuccess={async (details, data) => {
          props.onCancel();
          console.log("success paypal proc:", data, details);

          const input = {
            exhibit_id: props.exhibit.id,
            user: user.id,
            amount: currentPayAmount4Fund,
            pay_order_id: data.orderID,
            payer: details.payer.email_address,
          };

          const res = await fund({
            variables: {
              input,
            },
          });

          if (res.data.fund) {
            message.success("Success to fund!");
          } else {
            message.error("Failed to fund!");
          }
        }}
        onApprove={(data, actions) => {
          console.log(data, actions, "approve result...");
        }}
        onError={(e) => {
          console.log(e, "error result.....");
        }}
        onButtonReady={() => {
          console.log("ready result.....");
        }}
        options={{
          clientId: process.env.PAYPAL_CLIENT_ID,
        }}
      />
    </Modal>
  );
};

export default Paypal4FundModal;
