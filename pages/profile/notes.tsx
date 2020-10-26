import React, { useState } from "react";
import { Tabs } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import ProfileBar from "../../components/ProfileBar";
import Settings from "../../components/notes/Settings";
import History from "../../components/notes/History";

const { TabPane } = Tabs;

export default function Notifications() {
  const {
    mapState: { user },
  } = useMapState();

  const [render, setRender] = useState(0);

  return (
    <MainLayout>
      <ProfileBar title="My Notifications" />

      <Tabs
        defaultActiveKey="0"
        type="card"
        onChange={(key) => {
          console.log("current tag index:", key);
          if (key === "1") {
            setRender((render) => render + 1);
          }
        }}
      >
        <TabPane tab="Notifications Settings" key="0">
          <Settings />
        </TabPane>
        <TabPane tab="Notifications History" key="1">
          {user && user.id ? <History user={user} render={render} /> : null}
        </TabPane>
      </Tabs>
    </MainLayout>
  );
}
