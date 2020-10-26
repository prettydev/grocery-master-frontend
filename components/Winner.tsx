import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Col, Row, Space, Typography } from "antd";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";

import { IHistory } from "../constants/types";
import ProfileAvatar from "./ProfileAvatar";

const Win = require("../images/win.png");
const { Title, Text } = Typography;

export default function Winner({ history }: { history: IHistory }) {
  const router = useRouter();
  return (
    <Card hoverable style={{ textAlign: "center" }}>
      <Space direction="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Space direction="vertical">
              <img
                src={history.product.image}
                className="w-full object-contain h-24"
              />
              <LinesEllipsisLoose
                text={history.product.title}
                maxLine="1"
                lineHeight="16"
                className="text-xl font-bold mt-2"
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Space direction="vertical">
              <div style={{ textAlign: "center", width: "100%" }}>
                <div style={{ textAlign: "center", width: "100%" }}>
                  <ProfileAvatar src={history.winner.avatar} size="md" />
                </div>
                <div className="text-center">
                  <LinesEllipsisLoose
                    text={history.winner.username}
                    maxLine="1"
                    lineHeight="16"
                    className="text-lg mt-2"
                  />

                  <div className="text-gray-600">
                    member since{" "}
                    {new Date(history.winner.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Space>
          </Col>
        </Row>
        <Space>
          <img src={Win} className="w-8 h-8" />
          {history.winner.wins}Wins
        </Space>
        <hr />
        <Text>
          <Space>
            <Link
              href={`/completed/[completed]`}
              as={`/completed/${history.id}`}
            >
              <a target="_blank">Product</a>
            </Link>{" "}
            won by{" "}
            <Link
              href={`/profile/[profile]`}
              as={`/profile/${history.winner.id}`}
            >
              <a target="_blank">
                <LinesEllipsisLoose
                  text={history.winner.username}
                  maxLine="1"
                  lineHeight="16"
                />
              </a>
            </Link>
          </Space>
        </Text>
      </Space>
    </Card>
  );
}
