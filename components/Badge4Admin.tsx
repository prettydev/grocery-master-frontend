import React, { useState } from "react";
import { Card, Space, Typography } from "antd";

import { useMapState } from "../context/store";
import BadgeEditModal from "../modals/BadgeEditModal";
import BadgeDetailsModal from "../modals/BadgeDetailsModal";
import { IBadge } from "../constants/types";

const Point = require("../images/point.png");
const { Title } = Typography;

export default function Badge4Admin({ badge }: { badge: IBadge }) {
  const {
    mapState: { user },
  } = useMapState();

  const [editVisible, setEditVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDlg = () => {
    if (!user || user.role !== "admin") {
      setVisible(true);
      return;
    }
    setEditVisible(true);
  };
  return (
    <>
      <Card
        hoverable
        style={{ textAlign: "center", height: "100%" }}
        onClick={showDlg}
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
      <BadgeEditModal
        badge={badge}
        visible={editVisible}
        onOk={() => {
          setEditVisible(false);
        }}
        onCancel={() => {
          setEditVisible(false);
        }}
      />
    </>
  );
}
