import React from "react";
import Link from "next/link";
import { Space, Tabs, Typography } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import Invite from "../../components/affiliate/Invite";
import Facebook from "../../components/affiliate/Facebook";

const { Text } = Typography;
const { TabPane } = Tabs;

export default function Affiliate() {
  const {
    mapState: { user },
  } = useMapState();

  return (
    <MainLayout>
      <TitleBar title={"Affiliate program"} />
      <Space direction="vertical" className="mb-4">
        <Text>
          Verified Facebook users only can take part in Exhibia Affiliate
          program.
        </Text>
        <Text>
          Share, comment, like Facebooks posts and earn Points! Use points in{" "}
          <Link href={"/shop"}>
            <a target="_blank">Exhibia Rewards Shop</a>
          </Link>{" "}
          to buy PRO subscription, buy merchandise items and even exchange
          Points to Bids!
        </Text>
      </Space>
      {user && (
        <>
          <Tabs defaultActiveKey="1" type="card" size={"small"}>
            <TabPane tab="Invite Friends" key="1">
              <Invite />
            </TabPane>
            <TabPane tab="Facebook" key="2">
              <Facebook />
            </TabPane>
            {/* <TabPane tab="Instagram" key="3"></TabPane>
            <TabPane tab="Twitter" key="4"></TabPane> */}
          </Tabs>
        </>
      )}
    </MainLayout>
  );
}
