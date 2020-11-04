import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
  Alert,
  Button,
  Col,
  message,
  Row,
  Pagination,
  Switch,
  Typography,
} from "antd";
import { PlusOutlined, FileOutlined, RocketOutlined } from "@ant-design/icons";

import MainLayout from "../../layouts/MainLayout";
import Filter from "../../layouts/FilterBar";

import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";

import { useMapState } from "../../context/store";
import { GROCERIES_QUERY } from "../../apis/queries";
import { SET_ACTIVE_MUTATION } from "../../apis/mutations";
import Category from "../../layouts/Category";
import GroceryDetailsModal from "../../modals/GroceryDetailsModal";
import GroceryAddModal from "../../modals/GroceryAddModal";
import { IGrocery } from "../../constants/types";

const { Title } = Typography;

const Groceries = () => {
  const {
    mapState: { user, groceryPageInfo: pageInfo },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [grocery, setGrocery] = useState<IGrocery>(null); //product for details and edit
  const [groceries, setGroceries] = useState<Array<IGrocery>>([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [singleAddVisible, setSingleAddVisible] = useState(false);

  const initialFilter = {
    key: "",
    sort: "latest",
    cat: "All",
    email: "",
  };

  const [filter, setFilter] = useState(initialFilter);

  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [refreshGroceries, { loading, error, data }] = useLazyQuery(
    GROCERIES_QUERY
  );

  const [admin_set_active_mutation, { loading: moveLoading3 }] = useMutation(
    SET_ACTIVE_MUTATION
  );

  const set_active = async (asin: string, active: boolean) => {
    const res = await admin_set_active_mutation({
      variables: {
        asin,
        active,
      },
    });

    if (res.data && res.data.setActive) {
      message.success("Success to set active state!");
    } else {
      message.error("Failed to set active state!");
    }
  };

  useEffect(() => {
    if (data && data.groceries && data.groceries.arr) {
      setGroceries(data.groceries.arr);
      setTotal(data.groceries.cnt);
    }
  }, [data]);

  useEffect(() => {
    if (!user) {
      return;
    }
    refreshGroceries({
      variables: { pageArgs, filter },
    });
  }, [pageInfo, filter]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setFilter({...filter, email: user.email});
  },[user]);

  return (
    <MainLayout>
      <Title>Groceries</Title>

      <div className="w-full flex flex-row justify-between gap-24">
        <div className="w-full">
          {/* <Filter
            filter={filter}
            setFilter={setFilter}
            kind=""
            clearFilter={() => setFilter(initialFilter)}
          /> */}
        </div>
        <div className="flex flex-row gap-2">
          <Button
            type="primary"
            onClick={() => setSingleAddVisible(true)}
            icon={<PlusOutlined />}
          >
            Add Grocery
          </Button>
        </div>
      </div>
      <Row>
        <Col md={24}>
          {error && (
            <Alert message={error.message} type="error" showIcon closable />
          )}
          <Spinner loading={loading} />
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">no</th>
                <th className="px-4 py-2">logo</th>
                <th className="px-4 py-2">name</th>
                <th className="px-4 py-2">domain</th>
                <th className="px-4 py-2">action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                groceries &&
                groceries.map((p, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">
                      {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
                    </td>
                    <td className="border px-4 py-2">
                      <img
                        className="w-32 h-auto object-cover"
                        src={p.logo.link}
                      ></img>
                    </td>
                    <td
                      className="border px-4 py-2"
                      onClick={() => {
                        setGrocery(p);
                        setDetailsVisible(true);
                      }}
                    >
                      {p.name}
                    </td>
                    <td className="border px-4 py-2">{p.domain}</td>
                    <td className="border px-4 py-2"></td>
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
                  type: "setGroceryPageInfo",
                  pageInfo: { currentPage, pageSize },
                });
              }}
              defaultPageSize={pageInfo.pageSize}
            />
          </div>
        </Col>
      </Row>
      {grocery && (
        <GroceryDetailsModal
          visible={detailsVisible}
          grocery={grocery}
          onOk={() => setDetailsVisible(false)}
          onCancel={() => setDetailsVisible(false)}
        />
      )}
      <GroceryAddModal
        visible={singleAddVisible}
        onOk={() => {
          setSingleAddVisible(false);
          refreshGroceries({
            variables: { pageArgs, filter },
          });
        }}
        onCancel={() => setSingleAddVisible(false)}
      />
    </MainLayout>
  );
};

export default Groceries;
