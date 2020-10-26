import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Col, Row, Tabs } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import { Spinner } from "../../components/Spinner";
import ProfileBar from "../../components/ProfileBar";
import Badge from "../../components/Badge4User";
import { BADGE_QUERY } from "../../apis/queries";

const { TabPane } = Tabs;

export default function Badges() {
  const {
    mapState: { user, badges },
    setMapState,
  } = useMapState();

  const [earnedBadges, setEarnedBadges] = useState([]);
  const [availableBadges, setAvailableBadges] = useState([]);

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

  useEffect(() => {
    if (user && badges) {
      if (!user.badges) {
        user.badges = [];
      }
      const user_badge_arr = user.badges.map((ub) => ub.badge.id);
      const earned_arr = badges.filter((b) => user_badge_arr.includes(b.id));
      const available_arr = badges.filter(
        (b) => !user_badge_arr.includes(b.id)
      );
      setEarnedBadges(earned_arr);
      setAvailableBadges(available_arr);
    }
  }, [user, badges]);

  return (
    <MainLayout>
      <ProfileBar title="My Badges" />

      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Eearned" key="1">
          {!loading && earnedBadges && (
            <Row gutter={[16, 16]}>
              {earnedBadges.map((b, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} key={idx}>
                  <Badge badge={b} />
                </Col>
              ))}
            </Row>
          )}
        </TabPane>
        <TabPane tab="Available" key="2">
          {!loading && availableBadges && (
            <Row gutter={[16, 16]}>
              {availableBadges.map((b, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} key={idx}>
                  <Badge badge={b} />
                </Col>
              ))}
            </Row>
          )}
        </TabPane>
      </Tabs>
    </MainLayout>
  );
}
