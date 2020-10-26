import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { Alert, Divider, Modal, Row, Col, Space, Typography } from "antd";

import MainLayout from "../../layouts/MainLayout";

import { SButton } from "../../components/buttons/SButton";
import ProductView from "../../components/ProductView";
import { Spinner } from "../../components/Spinner";
import CategoryBar from "../../components/CategoryBar";

import FundModal from "../../modals/FundModal";
import Paypal4BuyModal from "../../modals/Paypal4BuyModal";
import BuyModal from "../../modals/BuyModal";

import { useMapState } from "../../context/store";

import { HISTORY_DETAILS_QUERY } from "../../apis/queries";
import ProfileAvatar from "../../components/ProfileAvatar";
import UserList from "../../components/UserList";

const { Title, Text } = Typography;

const History = (props) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [history_id, setHistoryId] = useState("");

  const { loading, error, data } = useQuery(HISTORY_DETAILS_QUERY, {
    variables: { history_id },
  });

  const [userMode, setUserMode] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [paypal4BuyVisible, setPaypal4BuyVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [buyVisible, setBuyVisible] = useState(false);

  useEffect(() => {
    if (!router) {
      console.log("no router");
      return;
    }

    const history_id = router.query.completed;
    if (!history_id) {
      console.log("no history_id");
      return;
    }
    console.log(history_id.toString());
    setHistoryId(history_id.toString());
  }, []);

  return (
    <MainLayout>
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />
      {!loading && data && data.history && data.history.product && (
        <>
          <Title level={3}>{data.history.product.title}</Title>
          <CategoryBar categories={data.history.product.categories} />
          <Row>
            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
              <ProductView
                product={data.history.product}
                price={data.history.product.buybox_winner.price.raw}
              />
            </Col>
            <Col
              xs={16}
              sm={16}
              md={10}
              lg={10}
              xl={10}
              style={{ paddingLeft: 20, paddingTop: 20 }}
            >
              <div id="myPortal"></div>
              <div>
                <Space
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Title level={4}>{"Winner:"}</Title>
                  {data && data.history && data.history.history.winner && (
                    <ProfileAvatar src={data.history.history.winner.avatar} />
                  )}
                  <Title level={4}>
                    {data && data.history && data.history.history.winner
                      ? data.history.history.winner.username
                      : ""}
                  </Title>
                </Space>
                {userMode && (
                  <Space className="flex flex-row justify-around w-full my-6">
                    <Text>Buy now and get your bids back</Text>

                    <Title level={4}>
                      Retail
                      {data.history.product.buybox_winner.price.raw}
                    </Title>

                    <SButton
                      title={"BUY NOW"}
                      proc={() => {
                        if (!user) {
                          return;
                        }
                        setConfirmVisible(true);
                      }}
                    />
                  </Space>
                )}

                <Row className="m-8">
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <UserList
                      title="Participants"
                      data={data.history.history.bidders}
                    />

                    <div className="text-center p-4">
                      <Divider orientation="left">Tracking</Divider>
                      <Title className="ml-8">
                        {data.history.history.tracking}
                      </Title>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}></Col>
                </Row>
              </div>
            </Col>
            <Col
              xs={8}
              sm={8}
              md={5}
              lg={5}
              xl={5}
              style={{ paddingLeft: 20, paddingTop: 20 }}
            ></Col>
          </Row>
        </>
      )}

      <FundModal
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          setPaypal4BuyVisible(true);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      ></FundModal>
      {data && data.history && data.history.product && (
        <Paypal4BuyModal
          product={data.history.product}
          visible={paypal4BuyVisible}
          onCancel={() => setPaypal4BuyVisible(false)}
          onOk={() => setPaypal4BuyVisible(false)}
        ></Paypal4BuyModal>
      )}
      <Modal
        title="Confirm"
        centered
        visible={confirmVisible}
        onOk={() => {
          setConfirmVisible(false);
          setBuyVisible(true);
        }}
        onCancel={() => setConfirmVisible(false)}
      >
        <p>
          You will return back N Bids you spent on this auction once will
          complete this purchase
        </p>
      </Modal>
      {data && data.history && data.history.product && (
        <BuyModal
          product={data.history.product}
          visible={buyVisible}
          onCancel={() => setBuyVisible(false)}
          onOk={() => {
            setBuyVisible(false);
            setPaypal4BuyVisible(true);
          }}
        ></BuyModal>
      )}
    </MainLayout>
  );
};

export default History;
