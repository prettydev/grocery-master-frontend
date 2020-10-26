import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Alert, Col, Row, Pagination } from "antd";

import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";
import Filter from "../../layouts/FilterBar";
import Auction4FundUser from "../../components/Auction4FundUser";
import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";
import { useMapState } from "../../context/store";
import { EXHIBITS_QUERY } from "../../apis/queries";
import { IExhibit } from "../../constants/types";

export default function Exhibits() {
  const {
    mapState: { user, exhibitPageInfo: pageInfo, exhibitRefresh },
    setMapState,
  } = useMapState();

  const initialFilter = {
    key: "",
    sort: "most",
    cat: "All",
  };

  const [filter, setFilter] = useState(initialFilter);

  const [exhibits, setExhibits] = useState<IExhibit[]>([]);
  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadExhibits, { called, loading, error, data }] = useLazyQuery(
    EXHIBITS_QUERY,
    {
      variables: { pageArgs, filter },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (data && data.exhibits && data.exhibits.arr) {
      setExhibits(data.exhibits.arr);
      setTotal(data.exhibits.cnt);
    }
  }, [data]);

  useEffect(() => {
    if (!exhibitRefresh) {
      return;
    }
    loadExhibits();
  }, [exhibitRefresh]);

  useEffect(() => {
    if (called) {
      return;
    }
    loadExhibits();
  }, []);

  return (
    <MainLayout>
      <TitleBar title={"Funding exhibits"} />

      <Filter
        filter={filter}
        setFilter={setFilter}
        kind="exhibit"
        clearFilter={() => setFilter(initialFilter)}
      />

      <Row>
        <Col md={24}>
          {error && (
            <Alert message={error.message} type="error" showIcon closable />
          )}
          <Spinner loading={loading} />
          {!loading && exhibits && (
            <Row gutter={[4, 4]}>
              {exhibits.map((exhibit, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={4} key={idx}>
                  <Auction4FundUser exhibit={exhibit} />
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
                  type: "setExhibitPageInfo",
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
}
