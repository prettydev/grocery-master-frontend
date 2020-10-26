import React, { useEffect, useState } from "react";
import { Alert, Col, Card, Row, Typography } from "antd";
import { StarOutlined } from "@ant-design/icons";

import { IExhibit } from "../constants/types";
import { colors } from "../constants/theme";
import { TooltipWrapper } from "../wrappers/TooltipWrapper";
import { SButton } from "./buttons/SButton";
import FundModal from "../modals/FundModal";
import Paypal4FundModal from "../modals/Paypal4FundModal";
import Paypal4BuyModal from "../modals/Paypal4BuyModal";
import { WishModal, UnwishButton } from "../modals/WishModal";
import BuyModal from "../modals/BuyModal";
import AnimatedText from "./AnimatedText";
import useExhibit from "../hooks/useExhibit";
import { useMapState } from "../context/store";

const { Meta } = Card;
const { Title, Text } = Typography;

const Auction4FundUser = ({ exhibit: ib }: { exhibit: IExhibit }) => {
  const {
    mapState: { user, wishes },
  } = useMapState();

  const exhibit = useExhibit(ib);

  const [modalVisible, setModalVisible] = useState(false);
  const [paypal4FundVisible, setPaypal4FundVisible] = useState(false);
  const [paypal4BuyVisible, setPaypal4BuyVisible] = useState(false);
  const [wishVisible, setWishVisible] = useState(false);
  const [buyVisible, setBuyVisible] = useState(false);

  useEffect(() => {
    console.log("exhibit.fund_percent..................", exhibit.fund_percent);
  }, []);

  return (
    <>
      {!exhibit && <Alert message={"no exhibit!"} />}
      {exhibit && (
        <>
          <Card
            hoverable
            cover={
              <img
                style={{ objectFit: "contain", height: 150, paddingTop: 15 }}
                alt="image"
                src={exhibit.product.image}
                onClick={() => {
                  setBuyVisible(true);
                }}
              />
            }
            actions={[
              <div className="w-10/12 ml-auto mr-auto">
                <SButton
                  title={"FUND"}
                  proc={() => {
                    if (!user) {
                      return;
                    }
                    setModalVisible(true);
                  }}
                />
              </div>,
            ]}
            style={{ borderRadius: "5px" }}
          >
            <Meta title={exhibit.product.title} />
            <div
              style={{ textAlign: "center", paddingTop: 20, marginBottom: -20 }}
            >
              <Row>
                <Col span={12}>
                  <TooltipWrapper condition={user}>
                    {wishes.indexOf(exhibit.id.toString()) > -1 ? (
                      <UnwishButton exhibit={exhibit} />
                    ) : (
                      <StarOutlined
                        style={{ fontSize: 28, color: colors.primary }}
                        onClick={() => {
                          if (!user) {
                            return;
                          }
                          setWishVisible(true);
                        }}
                      />
                    )}
                  </TooltipWrapper>
                  <div>
                    <Text style={{ fontSize: 20, fontWeight: 500 }}>
                      {exhibit.funders.length}bakers
                    </Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Title level={2}>
                    <AnimatedText value={exhibit.fund_percent} />%
                  </Title>
                </Col>
              </Row>
            </div>
          </Card>
          {exhibit && (
            <>
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
              <BuyModal
                exhibit={exhibit}
                visible={buyVisible}
                onCancel={() => setBuyVisible(false)}
                onOk={() => {
                  setBuyVisible(false);
                  setPaypal4BuyVisible(true);
                }}
              ></BuyModal>
              <Paypal4BuyModal
                product={exhibit.product}
                visible={paypal4BuyVisible}
                onCancel={() => setPaypal4BuyVisible(false)}
                onOk={() => setPaypal4BuyVisible(false)}
              ></Paypal4BuyModal>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Auction4FundUser;
