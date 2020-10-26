import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Button, Card, Pagination } from "antd";

import { useMapState } from "../../context/store";

import MainLayout from "../../layouts/MainLayout";

import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";
import ProfileBar from "../../components/ProfileBar";

import { ORDERS_QUERY } from "../../apis/queries";

const Order = ({ order }) => (
  <Card type="inner" title="Item win">
    <div className="w-full flex flex-row justify-between items-center ">
      <img
        src={order.product.main_image.link}
        className="object-contain h-16"
      />
      <h2>{order.product.title}</h2>
      <Button type="primary">{"Pay Shipping"}</Button>
    </div>
  </Card>
);

export default function Orders() {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const [filter, setFilter] = useState({
    key: "",
    sort: "highest",
    cat: "All",
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 12,
  });

  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const { loading, error, data } = useQuery(ORDERS_QUERY, {
    variables: { pageArgs, filter },
  });

  useEffect(() => {
    if (data && data.orders && data.orders.arr) {
      setTotal(data.orders.cnt);
    }
  }, [data]);

  return (
    <MainLayout>
      <ProfileBar title="My Orders" />
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />

      {!loading &&
        data &&
        data.orders &&
        data.orders.arr &&
        data.orders.arr.map((order, idx) => <Order order={order} key={idx} />)}

      <div style={{ textAlign: "center", paddingTop: 50 }}>
        <Pagination
          total={total}
          current={pageInfo.currentPage}
          itemRender={ItemRender}
          showSizeChanger={false}
          onChange={(currentPage, pageSize) => {
            setPageInfo({ currentPage, pageSize });
          }}
          defaultPageSize={pageInfo.pageSize}
        />
      </div>
    </MainLayout>
  );
}
