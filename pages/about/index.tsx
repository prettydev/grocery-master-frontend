import React from "react";
import { Collapse, Typography } from "antd";
import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";

const { Text } = Typography;
const { Panel } = Collapse;

const Lisence = () => {
  return (
    <>
      <MainLayout>
        <TitleBar title={"About Us"} />

        <Text>Lisence details</Text>

        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel header="How do we accomplish this?" key="1">
            <p style={{ paddingLeft: 24 }}>description1</p>
          </Panel>
          <Panel header="How does it work?" key="2">
            <p style={{ paddingLeft: 24 }}>description2</p>
          </Panel>
        </Collapse>
      </MainLayout>
    </>
  );
};

export default Lisence;
