import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { PayPalButton } from "react-paypal-button-v2";
import { useQuery, useMutation } from "@apollo/client";
import { Alert, Button, Modal, message } from "antd";

import { useMapState } from "../context/store";
import { ORDER_MUTATION } from "../apis/mutations";

const Paypal4BuyModal = (props) => {
  const {
    mapState: { user, currentPayAmount4Buy },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [order, { loading, error }] = useMutation(ORDER_MUTATION);

  return (
    <Modal
      title="Paypal Checkout to Buy"
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
        // amount={currentPayAmount4Buy}
        amount={0.2}
        shippingPreference="NO_SHIPPING"
        onSuccess={async (details, data) => {
          const input = {
            user: user.id,
            product: props.product.asin,
            amount: currentPayAmount4Buy,
            pay_order_id: data.orderID,
            payer: details.payer.email_address,
          };

          const res = await order({
            variables: {
              input,
            },
          });

          console.log("waiting for the mutation result...");

          if (res.data) {
            console.log(res.data);
            // setMapState({
            //   type: "setUser",
            //   user: res.data.order.user,
            // });
            message.success("Payment success!");
          } else {
            message.error("Payment failed!");
          }
          console.log(res);
          props.onCancel();
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

export default Paypal4BuyModal;
