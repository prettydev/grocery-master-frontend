import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";
import {
  Alert,
  Button,
  Card,
  Divider,
  InputNumber,
  Modal,
  Row,
  Col,
  Space,
  Statistic,
  Switch,
  Typography,
  List,
  message,
} from "antd";
import { FacebookFilled, TwitterSquareFilled } from "@ant-design/icons";
import { FacebookShareButton, TwitterShareButton } from "react-share";

import MainLayout from "../../layouts/MainLayout";
import { TooltipWrapper } from "../../wrappers/TooltipWrapper";
import { SButton } from "../../components/buttons/SButton";
import { BidButton } from "../../components/buttons/BidButton";
import ProductView from "../../components/ProductView";
import { Spinner } from "../../components/Spinner";
import CategoryBar from "../../components/CategoryBar";
import SetTimer from "../../components/SetTimer";
import ReserveSwitch from "../../components/ReserveSwitch";
import FundModal from "../../modals/FundModal";
import Paypal4BuyModal from "../../modals/Paypal4BuyModal";
import BuyModal from "../../modals/BuyModal";
import { useMapState } from "../../context/store";
import { IProduct, IAuction, IAutoValue } from "../../constants/types";
import {
  AUCTION_DETAILS_QUERY,
  GET_AUCTION_LIVE_TIMER_QUERY,
} from "../../apis/queries";
import { AUTO_MUTATION, AFFILIATE } from "../../apis/mutations";
import ProfileAvatar from "../../components/ProfileAvatar";
import UserList from "../../components/UserList";
import useAuction from "../../hooks/useAuction";

const { Title, Text } = Typography;
const { Countdown } = Statistic;

const Auction = (props) => {
  const {
    mapState: { user },
  } = useMapState();

  const router = useRouter();

  const share_title = "This online auction is really amazing!";
  const [share_url, setSharedUrl] = useState("");

  const [auction_id, setAuctionId] = useState("");
  const [autoPreValue, setAutoPreValue] = useState(0);
  const [autoValue, setAutoValue] = useState(5);
  const [autoEnable, setAutoEnable] = useState(true);

  const [ia, setIA] = useState<IAuction>();
  const [product, setProduct] = useState<IProduct>();

  const auction = useAuction(ia);

  const { loading, error, data } = useQuery(AUCTION_DETAILS_QUERY, {
    variables: { auction_id, user_id: user ? user.id : "" },
  });

  useQuery(GET_AUCTION_LIVE_TIMER_QUERY, {
    variables: {
      auction_id,
    },
  });

  const [auto] = useMutation(AUTO_MUTATION);
  const [affiliate] = useMutation(AFFILIATE);

  const [userMode, setUserMode] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [paypal4BuyVisible, setPaypal4BuyVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [buyVisible, setBuyVisible] = useState(false);

  const [myAutos, setMyAutos] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  const DownCounter = useMemo(
    () =>
      auction ? (
        <Countdown
          value={new Date().getTime() + auction.live_timer}
          valueStyle={{ fontSize: 36 }}
          onFinish={() => {
            setRenderCount(renderCount + 1);
          }}
        />
      ) : null,
    [auction, renderCount]
  );

  const onChange = (v) => {
    setAutoValue(v);
  };

  const setAutoProc = async (value, active) => {
    if (!user) {
      return;
    }
    if (value < autoPreValue) {
      value = autoPreValue;
    }
    const input = {
      auction_id,
      user: user.id,
      value,
      active,
    };

    const res = await auto({
      variables: {
        input,
      },
    });

    if (res.data.auto) {
      message.success("Success to set auto bid!");
    } else {
      message.error("Failed to set auto bid!");
    }
  };

  const updateAutoState = () => {
    const my_autos: IAutoValue[] = auction.autos.filter(
      (a) => a.user.email === user.email && a.value > 0
    );

    setMyAutos(my_autos);

    if (!my_autos.length) {
      setAutoEnable(false);
      return;
    }

    setAutoEnable(my_autos[0].active);

    let auto_temp = auction.autos[0].value;
    let max_bid = auction.bidders[0] ? auction.bidders[0].value : 1;
    if (auto_temp < max_bid) auto_temp = max_bid;

    setAutoPreValue(auto_temp + 5);
  };

  const [sdata, setSData] = useState([]);

  const updateSData = () => {
    const bidders_ids = auction ? auction.bidders.map((b) => b.user.id) : [];

    setSData([
      {
        name: "users bided",
        value: auction && auction.bidders ? auction.bidders.length : 0,
      },
      {
        name: "bakers",
        value: auction && auction.funders ? auction.funders.length : 0,
      },
      {
        name: "prefunded",
        value: `${auction ? auction.fund_percent : 0}%`,
      },
      {
        name: "bids speed",
        value: `${
          auction && auction.bid_speed ? auction.bid_speed.toFixed(6) : 0
        }bids/s`,
      }, //?
      {
        name: "users funded with bids",
        value:
          auction && auction.funders
            ? auction.funders.filter((f) => bidders_ids.includes(f.user.id))
                .length
            : 0,
      },
      {
        name: "users funded w/o bids",
        value:
          auction && auction.funders
            ? auction.funders.filter((f) => !bidders_ids.includes(f.user.id))
                .length
            : 0,
      },
      {
        name: "autobidders",
        value: auction && auction.autos ? auction.autos.length : 0,
      },
      {
        name: "chatroom users w bids",
        value:
          auction && auction.chatters
            ? auction.chatters.filter((c) => bidders_ids.includes(c)).length
            : 0,
      },
      {
        name: "chatroom users w/o bids",
        value:
          auction && auction.chatters
            ? auction.chatters.filter((c) => !bidders_ids.includes(c)).length
            : 0,
      },
      {
        name: "watching with bids",
        value:
          auction && auction.watchers
            ? auction.watchers.filter((c) => bidders_ids.includes(c)).length
            : 0,
      },
      {
        name: "watching w/o bids",
        value:
          auction && auction.watchers
            ? auction.watchers.filter((c) => !bidders_ids.includes(c)).length
            : 0,
      },
    ]);
  };

  const affiliateProc = async (ref: string) => {
    const res = await affiliate({
      variables: {
        ref,
      },
    });

    if (res.data.affiliate) {
      console.log("affiliate success for ", ref);
    } else {
      console.warn("affiliate failed for ", ref);
    }
  };

  useEffect(() => {
    if (!auction || !user) {
      return;
    }

    updateAutoState();
    if (auction.state === "end") {
      router.push(`/completed/[completed]`, `/completed/${auction_id}`);
    }

    updateSData();
  }, [auction]);

  useEffect(() => {
    if (!data || !data.auction) {
      return;
    }

    setIA(data.auction.auction);
    setProduct(data.auction.product);
  }, [data]);

  useEffect(() => {
    const { auction: auction_param, ref } = router.query;

    if (!auction_param) {
      console.log("no auction_id");
      return;
    }
    if (ref) {
      affiliateProc(String(ref));
    }
    setAuctionId(auction_param.toString());
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    setSharedUrl(
      `${process.env.SHARE_BASE_URL}${router.asPath}?ref=${user.id}`
    );
  }, [user]);

  return (
    <MainLayout>
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />
      {!loading && auction && product && (
        <>
          <Title level={3}>{product.title}</Title>
          <Row>
            <Col span={18}>
              <CategoryBar categories={product.categories} />
            </Col>
            <Col span={6}>
              <Button
                size="large"
                type="link"
                onClick={() => {
                  setUserMode(!userMode);
                }}
              >
                {user &&
                  user.role === "admin" &&
                  (userMode ? "Admin view" : "User view")}
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
              <ProductView
                product={product}
                price={`$${auction.product.price}`}
              />
            </Col>
            <Col xs={16} sm={16} md={10} lg={10} xl={10} className="pl-4 pt-4">
              <div id="myPortal"></div>
              <div>
                <Row className="flex flex-row align-middle justify-center">
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="flex flex-row align-middle justify-center">
                      <div className="flex items-center">
                        {auction.bidders.length > 0 && (
                          <>
                            <ProfileAvatar
                              src={auction.bidders[0].user.avatar}
                            />
                            <h2 className="text-2xl ml-2">
                              {auction.bidders[0].user.username}
                            </h2>
                          </>
                        )}
                        {/* {auction.bidders.length === 0 && (
                          <img
                            className={`rounded-full mx-auto object-cover`}
                            src={default_bidder_avatar}
                          />
                        )} */}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="text-center">
                      {DownCounter}
                      <br />
                      timer:{auction.timer}sec
                    </div>
                  </Col>
                </Row>
                {userMode && (
                  <>
                    <Row className="flex flex-row align-middle justify-center mt-4">
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="text-center">
                          Buy now and get your bids back
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="text-center">
                          <Title level={4}>
                            Retail ${auction.product.price}
                          </Title>
                        </div>
                      </Col>
                    </Row>
                    <Row className="flex flex-row align-middle justify-center mt-4">
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="text-center">
                          Share auction and earn Points:
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="text-center">
                          <FacebookShareButton
                            url={share_url}
                            quote={share_title}
                          >
                            <FacebookFilled className="text-base mr-4" />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={share_url}
                            title={share_title}
                          >
                            <TwitterSquareFilled className="text-base mr-4" />
                          </TwitterShareButton>
                          {/* <InstagramFilled className="text-base mr-4" /> */}
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
                {!userMode && (
                  <Row className="mt-4">
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="text-center"
                    >
                      <ReserveSwitch auction={auction} />
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="text-center"
                    >
                      <SetTimer auction={auction} />
                      <div>set timer</div>
                    </Col>
                  </Row>
                )}
                <div className="mt-4">
                  <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <UserList
                        title="List of Bidders"
                        data={auction.bidders}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs={8} sm={8} md={5} lg={5} xl={5} className="pl-4 pt-4">
              {userMode && (
                <div className="text-center">
                  <Space direction="vertical" className="w-full">
                    <BidButton auction={auction} />
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
                  <Divider />

                  {autoEnable && (
                    <>
                      {myAutos.length > 0 && (
                        <>
                          <Text strong>
                            Auto bid state. Limit is {myAutos[0].value}
                          </Text>
                          <Divider />
                          Max bids
                          <InputNumber
                            min={autoPreValue}
                            defaultValue={autoPreValue}
                            className="ml-4"
                            onChange={onChange}
                          />
                          <div className="mt-4">
                            <SButton
                              title={"Update Auto Bidder"}
                              proc={() =>
                                setAutoProc(autoValue, myAutos.length > 0)
                              }
                            />
                          </div>
                        </>
                      )}
                      {!myAutos.length && (
                        <Text strong>No auto bid state.</Text>
                      )}
                    </>
                  )}
                  <div className="mt-4">
                    <TooltipWrapper condition={user}>
                      <Space>
                        <Switch
                          checked={autoEnable}
                          onChange={async (checked) => {
                            setAutoEnable(checked);
                            setAutoProc(autoValue, checked);
                          }}
                        />

                        <Text>
                          {autoEnable ? "Disable Auto Bid" : "Enable Auto Bid"}
                        </Text>
                      </Space>
                    </TooltipWrapper>
                  </div>
                </div>
              )}

              {!userMode && auction && (
                <Card hoverable>
                  <List
                    size="small"
                    dataSource={sdata}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={item.name} />
                        <div>{item.value}</div>
                      </List.Item>
                    )}
                  />
                </Card>
              )}
            </Col>
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
      {auction && product && (
        <Paypal4BuyModal
          product={product}
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
      {auction && product && (
        <BuyModal
          product={product}
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

export default Auction;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const { origin } = absoluteUrl(req);

  return {
    props: { origin },
  };
};
