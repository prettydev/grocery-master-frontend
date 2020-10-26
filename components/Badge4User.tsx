import React, { useState } from "react";
import { Card, Space, Typography } from "antd";

import BadgeDetailsModal from "../modals/BadgeDetailsModal";
import { IBadge } from "../constants/types";

const Point = require("../images/point.png");
const { Title } = Typography;

export default function Badge4User({ badge }: { badge: IBadge }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card
        hoverable
        style={{ textAlign: "center", height: "100%" }}
        onClick={() => setVisible(true)}
      >
        <Space direction="vertical">
          <Space>
            <img src={badge.image} className="object-contain w-full h-24" />
            <Title level={4}>{badge.title}</Title>
          </Space>
          <div className="flex items-center">
            <img className="h-8 w-8 rounded-full ml-auto" src={Point} />
            <h2 className="mr-auto ml-1">{badge.points}</h2>
          </div>
        </Space>
      </Card>
      <BadgeDetailsModal
        badge={badge}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
