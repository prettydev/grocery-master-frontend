import React from "react";
import { useRouter } from "next/router";
import { Button, Form, Modal, Select, Space, Avatar, Typography } from "antd";

const { Text } = Typography;

export default function ProductDetailsModal(props) {
  const router = useRouter();

  return (
    <Modal
      title="Product Details"
      centered
      visible={props.visible}
      footer={[]}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width="70%"
    >
      <div className="w-full">
        <h1 className="text-lg font-bold ml-auto mr-auto">
          {props.product.title}
        </h1>
        <div className="flex flex-row gap-4">
          <div className="flex flex-1 overflow-y-auto" style={{ height: 500 }}>
            <img
              src={props.product.main_image.link}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="p-4">
              {props.product.specifications.map((s, idx) => (
                <div className="flex flex-row">
                  <Text strong className="flex flex-1">
                    {s.name}
                  </Text>
                  {s.value}
                </div>
              ))}
            </div>
            <div className="p-4">
              {props.product.feature_bullets.map((b, idx) => (
                <div>{b}</div>
              ))}
            </div>
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
