import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
  Alert,
  Avatar,
  Button,
  Col,
  message,
  Row,
  Pagination,
  Typography,
  Input,
} from "antd";

import MainLayout from "../../layouts/MainLayout";
import Filter from "../../layouts/FilterBar";

import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";

import { useMapState } from "../../context/store";
import { ADMIN_COMPLETED_QUERY } from "../../apis/queries";
import {
  ADMIN_ADD_TRACKING,
  ADMIN_MOVE2EXHIBIT_MUTATION,
} from "../../apis/mutations";
import Category from "../../layouts/Category";
import ProductDetailsModal from "../../modals/ProductDetailsModal";
import ProductSingleAddModal from "../../modals/ProductSingleAddModal";
import { IHistory } from "../../constants/types";
import TrackingInputBox from "../../components/TrackingInputBox";

const { Title } = Typography;

export default function CompletedList() {
  const {
    mapState: { user, completedPageInfo: pageInfo },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [completed_auctions, setCompletedAuctions] = useState<Array<IHistory>>(
    []
  );

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [singleAddVisible, setSingleAddVisible] = useState(false);

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

  const [refreshAction, { loading, error, data }] = useLazyQuery(
    ADMIN_COMPLETED_QUERY
  );

  const [admin_add_tracking, { loading: moveLoading }] = useMutation(
    ADMIN_ADD_TRACKING
  );

  const addTracking = async (id: string, tracking: string) => {
    const res = await admin_add_tracking({
      variables: {
        id,
        tracking,
      },
    });

    if (res.data && res.data.admin_add_tracking.code === "success") {
      message.success("Success to add tracking!");
      return true;
    } else {
      message.error(res.data.admin_add_tracking.message);
      return false;
    }
  };

  useEffect(() => {
    if (
      data &&
      data.admin_completed_auctions &&
      data.admin_completed_auctions.arr
    ) {
      setCompletedAuctions(data.admin_completed_auctions.arr);
      setTotal(data.admin_completed_auctions.cnt);
    }
  }, [data]);

  useEffect(() => {
    refreshAction({
      variables: { pageArgs, filter },
    });
  }, [pageInfo, filter]);

  return (
    <MainLayout>
      <Title>Completed Auctions</Title>

      <Filter
        filter={filter}
        setFilter={setFilter}
        kind=""
        clearFilter={() => setFilter(initialFilter)}
      />

      <Row>
        {/* <Col md={6}>
          <Category
            filter={filter}
            setFilter={setFilter}
            clearFilter={clearFilter}
          />
        </Col> */}
        <Col md={24}>
          {error && (
            <Alert message={error.message} type="error" showIcon closable />
          )}
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">no</th>
                <th className="px-4 py-2">product</th>
                <th className="px-4 py-2">title</th>
                <th className="px-4 py-2">price</th>
                <th className="px-4 py-2">winner</th>
                <th className="px-4 py-2">tracking</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <Spinner loading={loading} />
                </td>
              </tr>
              {!loading &&
                completed_auctions &&
                completed_auctions.map((p, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">
                      {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
                    </td>
                    <td className="border px-4 py-2">
                      <img
                        className="w-32 h-auto object-cover"
                        src={p.product.image}
                      ></img>
                    </td>
                    <td
                      className="border px-4 py-2"
                      onClick={() => {
                        setDetailsVisible(true);
                      }}
                    >
                      {p.product.title}
                    </td>
                    <td className="border px-4 py-2">${p.product.price}</td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-row justify-between items-center  w-32">
                        <div className="m-2">
                          <Avatar src={p.winner.avatar} size="large" />
                        </div>
                        <div>{p.winner.username}</div>
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <TrackingInputBox
                        id={p.id}
                        tracking={p.tracking}
                        proc={addTracking}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", paddingTop: 50 }}>
            <Pagination
              total={total}
              current={pageInfo.currentPage}
              itemRender={ItemRender}
              showSizeChanger={false}
              onChange={(currentPage, pageSize) => {
                setMapState({
                  type: "setCompletedPageInfo",
                  pageInfo: { currentPage, pageSize },
                });
              }}
              defaultPageSize={pageInfo.pageSize}
            />
          </div>
        </Col>
      </Row>
      <ProductSingleAddModal
        visible={singleAddVisible}
        onOk={() => {
          setSingleAddVisible(false);
          refreshAction({
            variables: { pageArgs, filter },
          });
        }}
        onCancel={() => setSingleAddVisible(false)}
      />
    </MainLayout>
  );
}
