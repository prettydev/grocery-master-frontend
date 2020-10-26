import React from "react";
import { useRouter } from "next/router";
import { Button, Form, Modal, Select, Space, Avatar } from "antd";

import {
  badge_kinds,
  badge_types,
  badge_difficulties,
  badge_points,
} from "../constants/menu";

const Point = require("../images/point.png");

export default function BadgeDetailsModal(props) {
  const router = useRouter();

  return (
    <Modal
      title="Badge Details"
      centered
      visible={props.visible}
      footer={[]}
      width="25%"
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      <div className="flex flex-col">
        <Avatar
          src={props.badge.image}
          size={128}
          className="ml-auto mr-auto"
        />
        <h1 className="text-2xl font-bold ml-auto mr-auto">
          {props.badge.title}
        </h1>
        <div className="p-4">
          <p>{props.badge.rewards}</p>
          <p>{props.badge.details}</p>
        </div>
        {false && (
          <div className="flex flex-row items-center gap-2 p-4">
            <img src={Point} className="w-6 h-6" />
            <span className="font-bold">{props.badge.points}</span>
          </div>
        )}
        <Button onClick={() => props.onCancel()}>Close</Button>
      </div>
    </Modal>
  );
}
