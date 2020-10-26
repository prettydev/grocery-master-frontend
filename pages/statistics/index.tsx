import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { Card, Col, List, Row, Tabs, Typography } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";

import {
  CURRENT_STATISTICS_QUERY,
  HISTORY_STATISTICS_QUERY,
} from "../../apis/queries";
import {
  CURRENT_STATISTICS_SUBSCRIPTION,
  HISTORY_STATISTICS_SUBSCRIPTION,
} from "../../apis/subscriptions";
import { ICurrentStatistics, IHistoryStatistics } from "../../constants/types";

const { Title } = Typography;
const { Item } = List;

export default function Statistics() {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [currentStatistics, setCurrentStatistics] = useState<
    ICurrentStatistics
  >();
  const [historyStatistics, setHistoryStatistics] = useState<
    IHistoryStatistics
  >();

  const {
    loading: currentLoading,
    error: currentError,
    data: currentData,
  } = useQuery(CURRENT_STATISTICS_QUERY, {
    variables: {},
  });

  const {
    error: updatedCurrentError,
    data: updatedCurrentData,
  } = useSubscription(CURRENT_STATISTICS_SUBSCRIPTION, {
    variables: {},
  });

  const {
    loading: historyLoading,
    error: historyError,
    data: historyData,
  } = useQuery(HISTORY_STATISTICS_QUERY, {
    variables: {},
  });

  const {
    error: updatedHistoryError,
    data: updatedHistoryData,
  } = useSubscription(HISTORY_STATISTICS_SUBSCRIPTION, {
    variables: {},
  });

  const [current_data, setCurrentData] = useState([]);

  const [history_data, setHistoryData] = useState([]);

  const updateCurrentData = () => {
    setCurrentData([
      {
        name: "Total number of users online",
        value: currentStatistics.online_users,
      },
      {
        name: "Total number of users online w bids",
        value: currentStatistics.online_bid_users,
      },
      {
        name: "Total number of users online w/o bids",
        value:
          currentStatistics.online_users - currentStatistics.online_bid_users,
      },
      {
        name: "Bids count per auction",
        value: currentStatistics.bids_per_action.toFixed(3),
      },
    ]);
  };

  const updateHistoryData = () => {
    setHistoryData([
      {
        name: "Total number of auctions",
        value: historyStatistics.total_actions,
      },
      {
        name: "Total number of Winners",
        value: historyStatistics.total_winners,
      },
      { name: "Maximum users on site", value: historyStatistics.max_users },
      {
        name: "Bid count per auction",
        value: historyStatistics.bids_per_action.toFixed(3),
      },
    ]);
  };

  useEffect(() => {
    if (!currentStatistics) {
      return;
    }
    updateCurrentData();
  }, [currentStatistics]);

  useEffect(() => {
    if (!historyStatistics) {
      return;
    }
    updateHistoryData();
  }, [historyStatistics]);

  useEffect(() => {
    if (!currentData) {
      return;
    }
    setCurrentStatistics(currentData.currentStatistics);
  }, [currentData]);

  useEffect(() => {
    if (!historyData) {
      return;
    }
    setHistoryStatistics(historyData.historyStatistics);
  }, [historyData]);

  useEffect(() => {
    if (!updatedCurrentData) {
      return;
    }
    setCurrentStatistics(updatedCurrentData.currentUpdated);
  }, [updatedCurrentData]);

  useEffect(() => {
    if (!updatedHistoryData) {
      return;
    }
    setHistoryStatistics(updatedHistoryData.historyUpdated);
  }, [updatedHistoryData]);

  return (
    <MainLayout>
      <TitleBar title={"Site Statistics"} />
      {
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card hoverable>
              <List
                size="small"
                header={
                  <div style={{ textAlign: "center" }}>
                    <Title level={4}>{"Current Statistics"}</Title>
                  </div>
                }
                dataSource={current_data}
                renderItem={(item, idx) => (
                  <Item key={idx}>
                    <Item.Meta title={item.name} />
                    <div>{item.value}</div>
                  </Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card hoverable>
              <List
                size="small"
                header={
                  <div style={{ textAlign: "center" }}>
                    <Title level={4}>{"Historical Statistics"}</Title>
                  </div>
                }
                dataSource={history_data}
                renderItem={(item, idx) => (
                  <Item key={idx}>
                    <Item.Meta title={item.name} />
                    <div>{item.value}</div>
                  </Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      }
    </MainLayout>
  );
}
