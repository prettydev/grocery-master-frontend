import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  Alert,
  Button,
  Card,
  Col,
  Radio,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";

import { useMapState } from "../../context/store";

import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import { badge_kinds } from "../../constants/menu";
import BadgeAddModal from "../../modals/BadgeAddModal";
import { Spinner } from "../../components/Spinner";
import Badge from "../../components/Badge4Admin";
import { BADGE_QUERY } from "../../apis/queries";

const { Title, Text } = Typography;

export default function Badges() {
  const {
    mapState: { user, badges },
    setMapState,
  } = useMapState();

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const [filter, setFilter] = useState({
    key: "",
    sort: "",
    cat: "",
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 100,
  });

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const { loading, error, data } = useQuery(BADGE_QUERY, {
    variables: { pageArgs, filter },
  });

  useEffect(() => {
    if (data && data.badges && data.badges.arr) {
      setMapState({
        type: "setBadges",
        badges: data.badges.arr,
      });
    }
  }, [data]);

  return (
    <>
      <MainLayout>
        <TitleBar title={"Badges"} />
        <Space direction="vertical">
          <Text>
            Play the game with Exhibia. Earn the badges. Earn point with every
            Badge you get.
          </Text>
          <Text>
            Use points in{" "}
            <Link href={"/shop"}>
              <a target="_blank">Exhibia Rewards Shop</a>
            </Link>{" "}
            to buy PRO subscription, buy merchandise items and even exchange
            Points to Bids!
          </Text>
          <Text>
            Get the next level. See other successful users on Exhibia{" "}
            <Link href={"/leaderboard"}>
              <a target="_blank">Leaderboard</a>
            </Link>{" "}
            page.
          </Text>
          <Text>
            See what badges you already have on{" "}
            <Link href={"/profile/badges"}>
              <a target="_blank">My badges</a>
            </Link>{" "}
            page.
          </Text>
        </Space>

        <Space
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "space-between",
          }}
        >
          <Title level={4}>See</Title>
          {user && user.role === "admin" && (
            <Button block type="primary" onClick={() => setModalVisible(true)}>
              Add Badge
            </Button>
          )}
        </Space>
        <Space direction={"vertical"}>
          <Radio.Group defaultValue="all" buttonStyle="solid">
            {badge_kinds.map((k, idx) => (
              <Radio.Button
                value={k.value}
                key={idx}
                onChange={(e) => {
                  let cat = e.target.value;
                  if (cat === "all") cat = "";
                  setFilter({ ...filter, cat });
                }}
              >
                {k.label}
              </Radio.Button>
            ))}
          </Radio.Group>

          {error && (
            <Alert message={error.message} type="error" showIcon closable />
          )}
          <Spinner loading={loading} />
          {!loading && badges && (
            <Row gutter={[16, 16]}>
              {badges.map((b, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} key={idx}>
                  <Badge badge={b} />
                </Col>
              ))}
            </Row>
          )}
        </Space>
      </MainLayout>
      <BadgeAddModal
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
}
