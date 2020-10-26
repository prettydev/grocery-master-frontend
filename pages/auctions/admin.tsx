import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { Alert, Row, Col, Pagination } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import Filter from "../../layouts/FilterBar";

import Auction4BidAdmin from "../../components/Auction4BidAdmin";
import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";
import { ADMIN_AUCTIONS_QUERY } from "../../apis/queries";
import { IAuction } from "../../constants/types";

const Index = () => {
  const {
    mapState: {
      user,
      auctionPageInfo: pageInfo,
      auctionRefresh,
      exhibitRefresh,
    },
    setMapState,
  } = useMapState();

  const [admin_auctions, setAdminAuctions] = useState<IAuction[]>([]);

  const router = useRouter();

  const initialFilter = {
    key: "",
    sort: "manual",
    cat: "All",
  };

  const [filter, setFilter] = useState(initialFilter);

  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadAuctions, { called, loading, error, data }] = useLazyQuery(
    ADMIN_AUCTIONS_QUERY,
    {
      variables: { pageArgs, filter },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (!auctionRefresh && !exhibitRefresh) {
      return;
    }
    loadAuctions();

    setMapState({
      type: "setAuctionRefresh",
      auctionRefresh: false,
    });
  }, [auctionRefresh, exhibitRefresh]);

  useEffect(() => {
    if (
      !data ||
      !data.admin_auctions ||
      !data.admin_auctions.arr ||
      !data.admin_auctions.cnt ||
      !data.admin_auctions.timestamp
    ) {
      return;
    }

    const diff = new Date().getTime() - data.admin_auctions.timestamp;

    const tmp_auctions = data.admin_auctions.arr.map((a, i) => {
      if (a.live_timer * 1000 > diff) {
        a.live_timer = a.live_timer * 1000 - diff;
      }
      return a;
    });

    setAdminAuctions(tmp_auctions);
    setTotal(data.admin_auctions.cnt);
  }, [data]);

  useEffect(() => {
    if (called) {
      return;
    }
    loadAuctions();
  }, []);

  return (
    <MainLayout>
      <TitleBar
        title={"Running Auctions"}
        subtitle={"User view"}
        link="/auctions"
      />
      <Filter
        filter={filter}
        setFilter={setFilter}
        kind={"auction"}
        clearFilter={() => setFilter(initialFilter)}
      />

      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />
      {!loading && admin_auctions && (
        <Row gutter={[4, 4]}>
          {admin_auctions.map((auction, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={4} key={idx}>
              <Auction4BidAdmin auction={auction} loadAuctions={loadAuctions} />
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
              type: "setAuctionPageInfo",
              pageInfo: { currentPage, pageSize },
            });
          }}
          defaultPageSize={pageInfo.pageSize}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
