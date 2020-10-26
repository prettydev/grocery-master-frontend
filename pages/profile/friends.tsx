import React, { useState } from "react";
import { Tabs } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import ProfileBar from "../../components/ProfileBar";
import NoFriends from "../../components/friends/NoFriends";
import RecvRequests from "../../components/friends/RecvRequests";
import SentRequests from "../../components/friends/SentRequests";
import MyFriends from "../../components/friends/MyFriends";

const { TabPane } = Tabs;

export default function Friends() {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const [render0, setRender0] = useState(0);
  const [render1, setRender1] = useState(0);
  const [render2, setRender2] = useState(0);
  const [render3, setRender3] = useState(0);

  return (
    <MainLayout>
      <ProfileBar title="My Friends" />
      <Tabs
        defaultActiveKey="0"
        type="card"
        onChange={(key) => {
          console.log("current tag index:", key);
          if (key === "0") {
            setRender0((render0) => render0 + 1);
          } else if (key === "1") {
            setRender1((render1) => render1 + 1);
          } else if (key === "2") {
            setRender2((render2) => render2 + 1);
          } else if (key === "3") {
            setRender3((render3) => render3 + 1);
          }
        }}
      >
        <TabPane tab="My Friends" key="0">
          <MyFriends user={user} />
        </TabPane>
        <TabPane tab="Requested by others" key="1">
          {user && user.id ? (
            <RecvRequests user={user} render={render1} />
          ) : null}
        </TabPane>
        <TabPane tab="My Requests" key="2">
          {user && user.id ? (
            <SentRequests user={user} render={render2} />
          ) : null}
        </TabPane>
        <TabPane tab="Add Friends" key="3">
          {user && user.id ? <NoFriends user={user} render={render3} /> : null}
        </TabPane>
      </Tabs>
    </MainLayout>
  );
}
