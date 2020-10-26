import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Alert, Card, Col, Row, Pagination } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import Filter from "../../layouts/FilterBar";
import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";
import Winner from "../../components/Winner";
import { WINNER_QUERY } from "../../apis/queries";
import TParticle from "../../components/TParticles";

export default function Winners() {
  const router = useRouter();

  const {
    mapState: { user, histories, historyPageInfo: pageInfo },
    setMapState,
  } = useMapState();

  const initialFilter = {
    key: "",
    sort: "latest",
    cat: "All",
  };

  const [filter, setFilter] = useState(initialFilter);

  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const { loading, error, data } = useQuery(WINNER_QUERY, {
    variables: { pageArgs, filter },
  });

  useEffect(() => {
    if (data && data.histories && data.histories.arr) {
      setMapState({
        type: "setHistories",
        histories: data.histories.arr,
      });
      setTotal(data.histories.cnt);
    }
  }, [data]);

  return (
    <>
      <MainLayout>
        {/* <TParticle images={histories.map((h) => h.winner.avatar)} /> */}
        <TitleBar title={"Winners List"} />
        <Filter
          filter={filter}
          setFilter={setFilter}
          kind="winner"
          clearFilter={() => setFilter(initialFilter)}
        />

        {error && (
          <Alert message={error.message} type="error" showIcon closable />
        )}

        <Spinner loading={loading} />
        {!loading && histories && (
          <Row gutter={[4, 4]}>
            {histories.map((h, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={idx}>
                <Winner history={h} />
              </Col>
            ))}
          </Row>
        )}
        <div style={{ textAlign: "center", paddingTop: 50 }}>
          <Pagination
            total={total}
            current={pageInfo.currentPage}
            itemRender={ItemRender}
            showSizeChanger={false}
            onChange={(currentPage, pageSize) => {
              setMapState({
                type: "setHistoryPageInfo",
                pageInfo: { currentPage, pageSize },
              });
            }}
            defaultPageSize={pageInfo.pageSize}
          />
        </div>
      </MainLayout>
    </>
  );
}
