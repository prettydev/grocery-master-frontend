import React, { useMemo, useState, useEffect, FC } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  message,
  Statistic,
  Slider,
  InputNumber,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";

import { IAuction } from "../constants/types";
import SetTimer from "../components/SetTimer";
import ReserveSwitch from "./ReserveSwitch";

import {
  SET_CAMPAIGN_MUTATION,
  ADD_MESSAGE_MUTATION,
  SET_AUCTION_MANUAL_MUTATION,
} from "../apis/mutations";
import { GET_AUCTION_LIVE_TIMER_QUERY } from "../apis/queries";
import { useMapState } from "../context/store";
import AdminNoteModal from "../modals/AdminNoteModal";
import { useIsMountedRef } from "../hooks/useMounted";
import useAuction from "../hooks/useAuction";
import { checking_time } from "../constants/timer";
import Confetti from "react-dom-confetti";
import { colors } from "../constants/theme";

const { Search } = Input;
const { Countdown } = Statistic;

const Auction4BidAdmin = ({
  auction: ia,
  loadAuctions,
}: {
  auction: IAuction;
  loadAuctions: () => void;
}) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const auction = useAuction(ia);

  const [confetti, setConfetti] = useState(false);

  const [setAuctionManual, { loading }] = useMutation(
    SET_AUCTION_MANUAL_MUTATION
  );

  const [msg, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE_MUTATION);

  const [detailMode, setDetailMode] = useState(false);
  const [stat_data, setStatData] = useState([]);
  const [manual, setManual] = useState(0);

  const [visible, setVisible] = useState(false);

  const updateManual = async (manual: number) => {
    if (!user) {
      return;
    }

    const res = await setAuctionManual({
      variables: {
        manual,
        auction_id: auction.id,
      },
    });
    try {
      if (res.data.setAuctionManual) {
        message.success("Updated the manual order!");
        loadAuctions();
      } else {
        message.error("Failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateData = () => {
    const bidders_ids = auction ? auction.bidders.map((b) => b.user.id) : [];

    setStatData([
      { name: "users bided", value: auction.bidders.length },
      { name: "prefunded", value: `${auction.fund_percent}%` },
      {
        name: "bids speed",
        value: `${
          auction && auction.bid_speed ? auction.bid_speed.toFixed(6) : 0
        }bids/s`,
      },
      {
        name: "users funded with bids",
        value:
          auction && auction.funders
            ? auction.funders.filter((f) => bidders_ids.includes(f.user.id))
                .length
            : 0,
      },
      { name: "bakers", value: auction.funders.length },
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

  const [setCampaign] = useMutation(SET_CAMPAIGN_MUTATION);
  const setCampaignProc = async (value) => {
    const res = await setCampaign({
      variables: {
        campaign: {
          auction_id: auction.id,
          campaign: value,
        },
      },
    });
    try {
      if (res.data.setCampaign.id) {
        message.success("Updated the campaign!");
      } else {
        message.error("Failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [refreshAuction] = useLazyQuery(GET_AUCTION_LIVE_TIMER_QUERY);
  const [renderCount, setRenderCount] = useState(0);

  const DownCounter = useMemo(
    () => (
      <Countdown
        value={
          new Date().getTime() +
          (auction.live_timer +
            (auction.state === "checking" ? checking_time : 0))
        }
        valueStyle={{ fontSize: 24 }}
        onFinish={() => {
          refreshAuction({ variables: { auction_id: auction.id } });
          setRenderCount(renderCount + 1);
        }}
      />
    ),
    [auction.live_timer, renderCount]
  );

  useEffect(() => {
    if (!auction) {
      return;
    }
    if (auction.state === "show") {
      setConfetti(!confetti);
    }
    setManual(auction.manual);
    updateData();
  }, [auction]);

  return (
    <>
      <Card hoverable>
        <List
          size="small"
          header={
            <div style={{ textAlign: "center" }}>
              <LinesEllipsisLoose
                text={auction.product.title}
                maxLine="1"
                lineHeight="16"
                className="font-bold"
              />
              <Button
                onClick={() => {
                  setDetailMode(!detailMode);
                }}
                type="link"
              >
                {detailMode ? "show less" : "show more"}
              </Button>
            </div>
          }
          dataSource={detailMode ? stat_data : stat_data.slice(0, 3)}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <List.Item.Meta title={item.name} />
              <div>{item.value}</div>
            </List.Item>
          )}
        />
        <hr />
        <div className="w-1/12 flex mx-auto">
          <Confetti active={confetti} />
        </div>
        <div className="flex mt-2 h-12">
          {auction && auction.bidders.length > 0 && (
            <div
              className="mx-auto flex flex-row gap-2 items-center"
              onClick={() => {
                setVisible(true);
              }}
            >
              <Avatar
                src={
                  auction.bidders.length > 0
                    ? auction.bidders[0].user.avatar
                    : ""
                }
              />
              <LinesEllipsisLoose
                text={
                  auction.bidders.length > 0
                    ? auction.bidders[0].user.username
                    : ""
                }
                maxLine="1"
                lineHeight="16"
                className="font-bold"
              />
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          {auction.state !== "show" && DownCounter}
          {auction.state === "show" && (
            <span className="text-2xl" style={{ color: colors.primary }}>
              Winner
            </span>
          )}

          {auction.state !== "checking" && (
            <SetTimer auction={auction} disabled={auction.state === "show"} />
          )}
          {auction.state === "checking" && (
            <span className="h-8 font-bold">Checking...</span>
          )}
        </div>

        <div className="mt-2">
          <ReserveSwitch
            auction={auction}
            disabled={auction.state === "show"}
          />
        </div>

        <div className="flex flex-row w-full justify-between mt-2">
          <InputNumber
            min={1}
            max={100}
            value={manual}
            onChange={(v) => setManual(parseInt(v.toString()))}
            disabled={auction.state === "show"}
          />
          <Button
            type="primary"
            onClick={() => updateManual(manual)}
            loading={loading}
            disabled={auction.state === "show"}
          >
            set order
          </Button>
        </div>
        <Search
          value={msg}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="input message"
          enterButton={<SendOutlined />}
          className="mt-2"
          disabled={auction.state === "show"}
          onSearch={(value) => {
            if (!value) return;

            const message = {
              room_id: auction.id,
              user_id: user.id,
              username: user.username ? user.username : user.email,
              avatar: user.avatar,
              content: value,
              created_at: new Date(),
            };

            addMessage({ variables: { message } });

            setMapState({
              type: "addMessage",
              message,
            });

            setMessage("");
          }}
        />
      </Card>
      {detailMode && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          {auction.campaign && (
            <>
              <p>FB ADs Campaign is running</p>
              <Button
                onClick={(e) => {
                  setCampaignProc(false);
                }}
              >
                Stop
              </Button>
            </>
          )}
          {!auction.campaign && (
            <Button
              onClick={(e) => {
                setCampaignProc(true);
              }}
            >
              Start FB Ads Campaign
            </Button>
          )}
        </div>
      )}
      <AdminNoteModal
        visible={visible}
        auction={auction}
        msg={msg}
        setMessage={setMessage}
        addMessage={addMessage}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default Auction4BidAdmin;
