import React from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";

import { SwapOutlined } from "@ant-design/icons";

import { useMutation } from "@apollo/client";

import { useMapState } from "../../context/store";

import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import { useState, useEffect } from "react";
import { EXCHANGE_MUTATION, PLAN_MUTATION } from "../../apis/mutations";

const Coin = require("../../images/coin.png");
const Point = require("../../images/point.png");

const { Title, Text } = Typography;

const { TabPane } = Tabs;

const POINTS_RATE = 120;

const Merchandise = () => {
  return (
    <Card
      hoverable
      style={{ width: 200, textAlign: "center" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Space direction="vertical" style={{ textAlign: "center" }}>
        <Text style={{ textAlign: "center" }}>Exhibia merch item</Text>
        <Space>
          <img src={Point} className="w-8 h-8" />
          1200
        </Space>
        <Button block type="primary">
          Buy now
        </Button>
      </Space>
    </Card>
  );
};

export default function Shop() {
  const {
    mapState: { user },
  } = useMapState();

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState(0);

  const [maxPoints, setMaxPoints] = useState(0);
  const [maxCoins, setMaxCoins] = useState(0);

  const [exchange] = useMutation(EXCHANGE_MUTATION);
  const [updatePlan] = useMutation(PLAN_MUTATION);

  const onExchange = async () => {
    if (!user || coins === 0) {
      console.log("no valid user or coins...");
      return;
    }

    const { data } = await exchange({
      variables: {
        user_id: user.id,
        coins,
      },
    });

    if (data.exchange) {
      message.success("Success to exchange coins!");
    } else {
      message.error("Failed to exchange coins!");
    }
  };

  const onPlan = async (kind, months) => {
    if (!user || months === 0) {
      console.log("no valid user or coins...");
      return;
    }

    const { data } = await updatePlan({
      variables: {
        kind,
        months,
        user_id: user.id,
      },
    });

    if (data.updatePlan) {
      message.success("Success to update plan!");
    } else {
      message.error("Failed to update plan!");
    }
  };

  useEffect(() => {
    setPoints(coins * POINTS_RATE);
  }, [coins]);

  useEffect(() => {
    setCoins(points / POINTS_RATE);
  }, [points]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setMaxPoints(Math.round(user.points / POINTS_RATE) * POINTS_RATE);
    setMaxCoins(Math.round(user.points / POINTS_RATE));
  }, [user]);

  return (
    <MainLayout>
      <TitleBar title={"Rewards Shop"} />
      <Space className="mb-4">
        <Text>
          Use points to get PRO subscriptions and buy merchandise products.{" "}
          <Link href={"/shop"}>
            <a>How to earn points?</a>
          </Link>
        </Text>
      </Space>
      {user && (
        <>
          <Text> Your current balance is:{user.points}</Text>
          <Tabs defaultActiveKey="1" type="card" size={"small"}>
            <TabPane tab="Subscriptions" key="1">
              <Space direction="vertical">
                <Text>Your current Subscription plan is: {user.plan}</Text>
                <Text>
                  Buy PRO Subscription in order to access to advanced bidding
                  analytics, bid counts.
                </Text>
                <Text>Personalize your account/profile.</Text>
              </Space>
              <Row>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Space>
                    <Space direction="vertical">
                      <Title level={4}>Buy using Points:</Title>
                      <Button
                        block
                        type="primary"
                        loading={loading1}
                        disabled={user.plan === "pro"}
                        onClick={async () => {
                          if (user.points < 100) {
                            message.error("Low points!");
                            return;
                          }
                          setLoading1(true);
                          await onPlan("points", 1);
                          setLoading1(false);
                        }}
                      >
                        1 month PRO subscription
                      </Button>
                      <Button
                        block
                        type="primary"
                        loading={loading2}
                        disabled={user.plan === "pro"}
                        onClick={async () => {
                          if (user.points < 999) {
                            message.error("Low points!");
                            return;
                          }
                          setLoading2(true);
                          await onPlan("points", 12);
                          setLoading2(false);
                        }}
                      >
                        12 month PRO subscription
                      </Button>
                    </Space>
                    <Space direction="vertical">
                      <Title level={4}>Price</Title>
                      <Space>
                        <img src={Point} className="w-8 h-8" />
                        100
                      </Space>
                      <Space>
                        <img src={Point} className="w-8 h-8" />
                        999
                      </Space>
                    </Space>
                  </Space>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Space>
                    <Space direction="vertical">
                      <Title level={4}>Buy using Bids:</Title>
                      <Button
                        block
                        type="primary"
                        loading={loading3}
                        disabled={user.plan === "pro"}
                        onClick={async () => {
                          if (user.coins < 10) {
                            message.error("Low coins!");
                            return;
                          }
                          setLoading3(true);
                          await onPlan("coins", 1);
                          setLoading3(false);
                        }}
                      >
                        1 month PRO subscription
                      </Button>
                      <Button
                        block
                        type="primary"
                        loading={loading4}
                        disabled={user.plan === "pro"}
                        onClick={async () => {
                          if (user.coins < 99) {
                            message.error("Low coins!");
                            return;
                          }
                          setLoading4(true);
                          await onPlan("coins", 12);
                          setLoading4(false);
                        }}
                      >
                        12 month PRO subscription
                      </Button>
                    </Space>
                    <Space direction="vertical">
                      <Title level={4}>Price</Title>
                      <Space>
                        <img src={Coin} className="w-8 h-8" />
                        10
                      </Space>
                      <Space>
                        <img src={Coin} className="w-8 h-8" />
                        99
                      </Space>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Buy Bids" key="2">
              <Space direction="vertical">
                <Text>
                  Exchange Points, Buy Bids, Participate in Auctions, Get
                  Products
                </Text>
                <Space>
                  Current Exchange Rate <img src={Coin} className="w-8 h-8" />
                  1=
                  <img src={Point} className="w-8 h-8" />
                  {POINTS_RATE}
                </Space>
                <Space>
                  <InputNumber
                    step={POINTS_RATE}
                    min={0}
                    max={maxPoints}
                    value={points}
                    onChange={(v) => setPoints(Number(v))}
                  />
                  <img src={Point} className="w-8 h-8" />
                  <SwapOutlined />
                  <InputNumber
                    min={0}
                    max={maxCoins}
                    value={coins}
                    onChange={(v) => setCoins(Number(v))}
                  />
                  <img src={Coin} className="w-8 h-8" />
                  <Button block type="primary" onClick={onExchange}>
                    Exchange
                  </Button>
                </Space>
              </Space>
            </TabPane>
            {false && (
              <TabPane tab="Merchandise" key="3">
                <Space direction="vertical">
                  <Text>Buy Exhibia Merchandise goods for Points</Text>
                  <Space>
                    <Merchandise />
                    <Merchandise />
                  </Space>
                </Space>
              </TabPane>
            )}
          </Tabs>
        </>
      )}
    </MainLayout>
  );
}
