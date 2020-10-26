import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Alert, Row, Col, Pagination, Button } from "antd";
import { useFlip, FlipProvider } from "react-easy-flip";

import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import Filter from "../../layouts/FilterBar";
import Auction4BidUser from "../../components/Auction4BidUser";
import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";
import { useMapState } from "../../context/store";
import { AUCTIONS_QUERY, LAST_AUCTION_QUERY } from "../../apis/queries";
import { IAuction } from "../../constants/types";

const shuffle = function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Index = () => {
  const todoItemsId = "flip-todo-items";
  const [auctions, setAuctions] = useState<IAuction[]>([]);

  useFlip(todoItemsId, {
    duration: 1500,
  });

  const {
    mapState: {
      user,
      auctionPageInfo: pageInfo,
      auctionRefresh,
      exhibitRefresh,
    },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const initialFilter = {
    key: "",
    sort: "manual",
    cat: "All",
  };

  const [renderCount, setRenderCount] = useState(0);

  const [filter, setFilter] = useState(initialFilter);
  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadAuctions, { called, loading, error, data }] = useLazyQuery(
    AUCTIONS_QUERY,
    {
      variables: { pageArgs, filter },
      fetchPolicy: "no-cache",
    }
  );

  const [loadLastAuction, { data: data2 }] = useLazyQuery(LAST_AUCTION_QUERY, {
    variables: { pageArgs, filter },
    fetchPolicy: "no-cache",
  });

  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (!auctions || auctions.length === 0) {
      return;
    }

    const auctions_comp_arr = auctions.map((auction, idx) => (
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
        xxl={4}
        key={idx}
        data-flip-id={`flip-id-${idx}`}
      >
        <Auction4BidUser auction={auction} remove={onRemove} />
      </Col>
    ));
    setComponents([...auctions_comp_arr]);
  }, [auctions]);

  useEffect(() => {
    if (
      !data ||
      !data.auctions ||
      !data.auctions.arr ||
      !data.auctions.cnt ||
      !data.auctions.timestamp
    ) {
      return;
    }

    const diff = new Date().getTime() - data.auctions.timestamp;

    const tmp_auctions = data.auctions.arr.map((a, i) => {
      if (a.live_timer * 1000 > diff) {
        a.live_timer = a.live_timer * 1000 - diff;
      }

      return a;
    });

    setAuctions(tmp_auctions);
    setTotal(data.auctions.cnt);
  }, [data]);

  useEffect(() => {
    if (!data2 || !data2.last_auction) {
      return;
    }

    setAuctions([...auctions, data2.last_auction]);
  }, [data2]);

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
    console.log("renderCount:", renderCount);
  }, [renderCount]);

  useEffect(() => {
    if (called) {
      return;
    }
    loadAuctions();
  }, []);

  const onRemove = (id: string) => {
    const tmp = auctions.filter((au, i) => au.id !== id);
    setAuctions([...tmp]);
    loadLastAuction();
  };

  const move = (i: number) => {
    if (!components || components.length === 0) {
      return;
    }
    const tmp = [...components];

    const new_comps =
      i === 0 ? tmp.splice(0, 1) : tmp.splice(components.length - 1, 1);
    i === 0 ? tmp.push(new_comps) : tmp.unshift(new_comps);

    setComponents(tmp);
  };

  return (
    <MainLayout>
      <TitleBar
        title={"Running Auctions"}
        subtitle={user && user.role === "admin" ? "Admin view" : ""}
        link={"/auctions/admin"}
      />

      <Filter
        filter={filter}
        setFilter={setFilter}
        clearFilter={() => setFilter(initialFilter)}
        kind="auction"
      />

      {false && (
        <>
          <Button
            onClick={() => {
              move(0);
            }}
          >
            left
          </Button>
          <Button
            onClick={() => {
              move(1);
            }}
          >
            right
          </Button>
        </>
      )}

      <Row>
        <Col md={24}>
          {error && (
            <Alert message={error.message} type="error" showIcon closable />
          )}
          <Spinner loading={loading && called} />
          {!loading && auctions && (
            <FlipProvider>
              <Row gutter={[4, 4]} data-flip-root-id={todoItemsId}>
                {components}
              </Row>
            </FlipProvider>
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
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Index;
