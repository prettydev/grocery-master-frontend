import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
  Alert,
  Button,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Progress,
  List,
  message,
} from "antd";
import { StarOutlined } from "@ant-design/icons";

import MainLayout from "../../layouts/MainLayout";

import { SButton } from "../../components/buttons/SButton";
import ProductView from "../../components/ProductView";
import { Spinner } from "../../components/Spinner";
import CategoryBar from "../../components/CategoryBar";

import FundModal from "../../modals/FundModal";
import Paypal4FundModal from "../../modals/Paypal4FundModal";
import { WishModal, UnwishButton } from "../../modals/WishModal";

import { useMapState } from "../../context/store";
import { colors } from "../../constants/theme";

import { EXHIBIT_DETAILS_QUERY } from "../../apis/queries";
import { SET_THRESHOLD_MUTATION } from "../../apis/mutations";
import { IExhibit, IProduct } from "../../constants/types";
import useExhibit from "../../hooks/useExhibit";

const { Title, Text } = Typography;
const { Search } = Input;

const Exhibit = (props) => {
  const {
    mapState: { user, wishes },
  } = useMapState();

  const router = useRouter();

  const [exhibit_id, setExhibitId] = useState("");
  const [ib, setIB] = useState<IExhibit>();
  const [product, setProduct] = useState<IProduct>();

  const exhibit = useExhibit(ib);

  const { loading, error, data } = useQuery(EXHIBIT_DETAILS_QUERY, {
    variables: { exhibit_id },
  });

  const [setThreshold] = useMutation(SET_THRESHOLD_MUTATION);

  const [userMode, setUserMode] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [paypal4FundVisible, setPaypal4FundVisible] = useState(false);
  const [wishVisible, setWishVisible] = useState(false);

  const setThresholdProc = async (value) => {
    const threshold = parseInt(value);

    console.log(exhibit_id, threshold);

    if (threshold <= 0) {
      message.error("Type correct value!");
      return;
    }
    const res = await setThreshold({
      variables: {
        threshold: {
          exhibit_id,
          threshold,
        },
      },
    });
    try {
      if (res.data.setThreshold.id) {
        message.info("Updated the threshold!");
      } else {
        message.error("Failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!exhibit) return;
    if (exhibit.fund_percent > 99) {
      router.push(`/auctions/[auction]`, `/auctions/${exhibit_id}`);
    }
  }, [exhibit]);

  useEffect(() => {
    if (!data || !data.exhibit) {
      return;
    }

    setIB(data.exhibit.exhibit);
    setProduct(data.exhibit.product);
  }, [data]);

  useEffect(() => {
    const exhibit_param = router.query.exhibit;
    if (!exhibit_param) {
      console.log("no exhibit_id");
      return;
    }

    setExhibitId(exhibit_param.toString());
  }, []);

  return (
    <MainLayout>
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />
      {!loading && exhibit && product && (
        <>
          <Title level={3}>{product.title}</Title>
          <Row>
            <Col span={12}>
              <CategoryBar categories={product.categories} />
            </Col>
            <Col span={6}>
              <Button
                size="large"
                type="link"
                style={{ color: colors.primary }}
                onClick={() => {
                  setUserMode(!userMode);
                }}
              >
                {user &&
                  user.role === "admin" &&
                  (userMode ? "Admin view" : "User view")}
              </Button>
            </Col>
            <Col span={6}>
              {!userMode && (
                <Search
                  prefix="$"
                  placeholder="Product threshold"
                  enterButton="Set"
                  size="large"
                  onSearch={(value) => setThresholdProc(value)}
                />
              )}
            </Col>
          </Row>

          <div className="flex md:flex-row flex-wrap">
            <div className="w-full md:w-1/2 lg:w-5/12 px-4">
              <ProductView
                product={product}
                price={`$${product.price}`}
                type="simple"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-7/12 px-8">
              <div id="myPortal"></div>
              <div>
                <div className="flex flex-row justify-center items-center gap-4">
                  <div
                    style={{
                      border: `2px ${colors.primary} solid`,
                    }}
                    className="p-8 rounded-md w-full"
                  >
                    <Row>
                      <Col span={12} style={{ textAlign: "center" }}>
                        {wishes.indexOf(exhibit.id.toString()) > -1 ? (
                          <UnwishButton exhibit={exhibit} />
                        ) : (
                          <StarOutlined
                            style={{ fontSize: 28, color: colors.primary }}
                            onClick={() => {
                              if (!user) {
                                message.error("Log in, please!");
                                return;
                              }
                              setWishVisible(true);
                            }}
                          />
                        )}
                        <Title level={4}>{exhibit.funders.length}Backers</Title>
                      </Col>
                      <Col span={12} style={{ textAlign: "center" }}>
                        <Title level={1}>{exhibit.fund_percent}%</Title>
                      </Col>
                    </Row>
                    <Progress
                      percent={exhibit.fund_percent}
                      showInfo={false}
                      strokeColor={colors.primary}
                    />
                  </div>
                  <div className="w-full">
                    <SButton
                      title={"FUND"}
                      proc={() => {
                        if (!user) {
                          message.error("Log in, please!");
                          return;
                        }
                        setModalVisible(true);
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Divider />
                  <Row>
                    <Col span={12}>{"Price"}</Col>
                    <Col span={12}>
                      <Text strong>${exhibit.product.price}</Text>
                    </Col>
                  </Row>
                  {product.specifications.map((spec, idx) => (
                    <Row key={idx}>
                      <Col span={12}>{spec.name}</Col>
                      <Col span={12}>{spec.value}</Col>
                    </Row>
                  ))}
                  <Divider orientation="left">About this item</Divider>
                  <List
                    size="small"
                    dataSource={product.feature_bullets}
                    renderItem={(item, idx) => (
                      <List.Item key={idx}>{item}</List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <FundModal
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          setPaypal4FundVisible(true);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      ></FundModal>
      <Paypal4FundModal
        exhibit={exhibit}
        visible={paypal4FundVisible}
        onCancel={() => setPaypal4FundVisible(false)}
        onOk={() => setPaypal4FundVisible(false)}
      ></Paypal4FundModal>
      <WishModal
        exhibit={exhibit}
        visible={wishVisible}
        onCancel={() => setWishVisible(false)}
        onOk={() => setWishVisible(false)}
      ></WishModal>
    </MainLayout>
  );
};

export default Exhibit;
