import React from "react";
import Link from "next/link";
import { Col, Layout, Row, Space, Typography } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

export default function FooterBar() {
  return (
    <Footer className="bg-white border-gray-100">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          xxl={12}
          style={{ textAlign: "center" }}
        >
          <Text>
            <Space size="large">
              <Link href={"/about"}>
                <a target="_blank">Licenses</a>
              </Link>
              <span>@Copyright powered by byebyeGROCERY</span>
            </Space>
          </Text>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          xxl={12}
          style={{ textAlign: "center" }}
        >
          <Space size="large">
            <a href={"https://twitter.com/"} target="_new">
              <TwitterSquareFilled style={{ fontSize: 22 }} />
            </a>
            <a href={"https://www.facebook.com/"} target="_new">
              <FacebookFilled style={{ fontSize: 22 }} />
            </a>
            <a href={"https://www.instagram.com/"} target="_new">
              <InstagramFilled style={{ fontSize: 22 }} />
            </a>
            <a href={"https://www.youtube.com/"} target="_new">
              <YoutubeOutlined style={{ fontSize: 22 }} />
            </a>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
}
