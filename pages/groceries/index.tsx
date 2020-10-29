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
import { ADMIN_PRODUCTS_QUERY } from "../../apis/queries";
import {
  ADMIN_MOVE2AUCTION_MUTATION,
  ADMIN_MOVE2EXHIBIT_MUTATION,
  SET_ACTIVE_MUTATION,
} from "../../apis/mutations";
import Category from "../../layouts/Category";
import ProductDetailsModal from "../../modals/GroceryDetailsModal";
import ProductSingleAddModal from "../../modals/GroceryAddModal";
import { IProduct } from "../../constants/types";

const { Title } = Typography;

const Groceries = () => {
  const {
    mapState: { user, productPageInfo: pageInfo },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [product, setProduct] = useState<IProduct>(null); //product for details and edit
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [singleAddVisible, setSingleAddVisible] = useState(false);
  const [bulkAddVisible, setBulkAddVisible] = useState(false);

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
    ADMIN_PRODUCTS_QUERY
  );

  const [admin_move2exhibit, { loading: moveLoading }] = useMutation(
    ADMIN_MOVE2EXHIBIT_MUTATION
  );

  const [admin_move2auction, { loading: moveLoading2 }] = useMutation(
    ADMIN_MOVE2AUCTION_MUTATION
  );

  const [admin_set_active_mutation, { loading: moveLoading3 }] = useMutation(
    SET_ACTIVE_MUTATION
  );

  const move2exhibit = async (asin: string) => {
    const res = await admin_move2exhibit({
      variables: {
        asin,
      },
    });

    if (res.data && res.data.admin_move2exhibit) {
      message.success("Success to move to exhibit!");
    } else {
      message.error("Failed to move to exhibit!");
    }
  };

  const move2auction = async (asin: string) => {
    const res = await admin_move2auction({
      variables: {
        asin,
      },
    });

    if (res.data && res.data.admin_move2auction) {
      message.success("Success to move to auction!");
    } else {
      message.error("Failed to move to auction!");
    }
  };

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
    if (data && data.admin_products && data.admin_products.arr) {
      setProducts(data.admin_products.arr);
      setTotal(data.admin_products.cnt);
    }
  }, [data]);

  useEffect(() => {
    refreshAction({
      variables: { pageArgs, filter },
    });
  }, [pageInfo, filter]);

  return (
    <MainLayout>
      <Title>Groceries</Title>

      <div className="w-full flex flex-row justify-between gap-24">
        <div className="w-full">
          <Filter
            filter={filter}
            setFilter={setFilter}
            kind=""
            clearFilter={() => setFilter(initialFilter)}
          />
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
                <th className="px-4 py-2">image</th>
                <th className="px-4 py-2">title</th>
                <th className="px-4 py-2">price</th>
                <th className="px-4 py-2">action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                products &&
                products.map((p, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">
                      {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
                    </td>
                    <td className="border px-4 py-2">
                      <img
                        className="w-32 h-auto object-cover"
                        src={p.main_image.link}
                      ></img>
                    </td>
                    <td
                      className="border px-4 py-2"
                      onClick={() => {
                        setProduct(p);
                        setDetailsVisible(true);
                      }}
                    >
                      {p.title}
                    </td>
                    <td className="border px-4 py-2">
                      ${p.buybox_winner.price.value}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => {
                            move2exhibit(p.asin);
                          }}
                          icon={<RocketOutlined />}
                        >
                          move to exhibit
                        </Button>
                        <Button
                          onClick={() => {
                            move2auction(p.asin);
                          }}
                          icon={<RocketOutlined />}
                          color="red"
                        >
                          move to auction
                        </Button>
                        <Switch
                          defaultChecked={p.active}
                          className="w-1/2 text-center mx-auto"
                          onChange={(value) => {
                            console.log(value, "switched value...");
                            set_active(p.asin, value);
                          }}
                        />
                      </div>
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
                  type: "setProductPageInfo",
                  pageInfo: { currentPage, pageSize },
                });
              }}
              defaultPageSize={pageInfo.pageSize}
            />
          </div>
        </Col>
      </Row>
      {product && (
        <ProductDetailsModal
          visible={detailsVisible}
          product={product}
          onOk={() => setDetailsVisible(false)}
          onCancel={() => setDetailsVisible(false)}
        />
      )}
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
};

export default Groceries;
