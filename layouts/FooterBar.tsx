import React from "react";
import Link from "next/link";
import { Col, Layout, Row, Space, Typography } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
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
              <Text strong>Our Company:</Text>
              <Link href={"/winners"}>
                <a target="_blank">Winners</a>
              </Link>
              <Link href={"/about"}>
                <a target="_blank">About Us</a>
              </Link>
              <Link href={"/leaderboard"}>
                <a target="_blank">Leaderboard</a>
              </Link>
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
            <Text strong>Connect Us:</Text>
            <a
              href={
                "https://www.facebook.com/Exhibia-117959396666911/?modal=admin_todo_tour" //"https://www.facebook.com/Exhibia/"
              }
              target="_new"
            >
              <FacebookFilled style={{ fontSize: 22 }} />
            </a>
            <a href={"https://twitter.com/ExhibiaAuction"} target="_new">
              <TwitterSquareFilled style={{ fontSize: 22 }} />
            </a>
            <a href={"https://www.instagram.com/"} target="_new">
              <InstagramFilled style={{ fontSize: 22 }} />
            </a>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
}
