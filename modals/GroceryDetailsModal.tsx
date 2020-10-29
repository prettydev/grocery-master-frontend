import React from "react";
import { useRouter } from "next/router";
import { Button, Modal, Typography } from "antd";

const { Text } = Typography;

export default function GroceryDetailsModal(props) {
  const router = useRouter();

  return (
    <Modal
      title="Grocery Details"
      centered
      visible={props.visible}
      footer={[]}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width="70%"
    >
      <div className="w-full">
        <h1 className="text-lg font-bold ml-auto mr-auto">
          {props.grocery.name}
        </h1>
        <div className="flex flex-row gap-4">
          <div className="flex flex-1 overflow-y-auto" style={{ height: 500 }}>
            <img
              src={props.grocery.logo.link}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <Button
          block
          onClick={() => props.onCancel()}
          className="mt-8 ml-auto mr-auto"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
