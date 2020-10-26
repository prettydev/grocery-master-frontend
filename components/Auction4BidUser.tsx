import React, { useState, useEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { Avatar, Button, Card, Statistic } from "antd";
import { useRouter } from "next/router";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";
import Animate from "animate.css-react";

import { useMapState } from "../context/store";
import { IAuction } from "../constants/types";
import { colors } from "../constants/theme";
import { TooltipWrapper } from "../wrappers/TooltipWrapper";
import BuyModal from "../modals/BuyModal";
import Paypal4BuyModal from "../modals/Paypal4BuyModal";
import { BidButton } from "./buttons/BidButton";
import Confetti from "./Confetti";
import { GET_AUCTION_LIVE_TIMER_QUERY } from "../apis/queries";
import { useIsMountedRef } from "../hooks/useMounted";
import useAuction from "../hooks/useAuction";
import { checking_time } from "../constants/timer";

const { Countdown } = Statistic;

const Auction4BidUser = ({
  auction: ia,
  remove,
}: {
  auction: IAuction;
  remove: Function;
}) => {
  const auction = useAuction(ia);
  const isMountedRef = useIsMountedRef();
  const {
    mapState: { user },
  } = useMapState();

  const router = useRouter();

  const [buyVisible, setBuyVisible] = useState(false);
  const [paypal4BuyVisible, setPaypal4BuyVisible] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [dance, setDance] = useState(false);
  const [count, setCount] = useState(0);

  const [confetti, setConfetti] = useState(false);

  const goBidPage = () => {
    if (!user) {
      return;
    }
    if (auction.state === "end") {
      router.push(`/completed/[completed]`, `/completed/${auction.id}`);
    } else {
      router.push(`/auctions/[auction]`, `/auctions/${auction.id}`);
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
          if (!isMountedRef.current) {
            return;
          }

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
  }, [auction]);

  useEffect(() => {
    if (auction.state === "end") {
      remove(auction.id);
    }
  }, [auction.state]);

  useEffect(() => {
    if (auction.bidders.length === 0) {
      return;
    }
    setAvatar(auction.bidders[0].user.avatar);

    setCount(count + 1);

    if (count === 0) {
      return;
    }

    setDance(true);
    console.log("count:", auction.id, count);
  }, [auction.bidders]);

  useEffect(() => {
    if (!dance) {
      return;
    }
    setTimeout(() => {
      if (!isMountedRef.current) {
        return;
      }
      setDance(false);
    }, 3000);
  }, [dance]);

  return (
    <>
      <Card
        hoverable
        actions={[
          <TooltipWrapper condition={user}>
            <Button
              type="text"
              onClick={() => {
                if (!user) return;
                setBuyVisible(true);
              }}
            >
              Buy it now for ${auction.product.price}
            </Button>
          </TooltipWrapper>,
        ]}
        bodyStyle={{}}
        className={`${auction.reserved ? "reserved" : ""}`}
      >
        <div className="w-1/12 flex mx-auto">
          <Confetti active={confetti} />
        </div>
        <img
          src={auction.product.image}
          className="object-contain h-48 w-full pt-3"
          onClick={() => goBidPage()}
        />
        <div className="flex flex-col gap-2 text-center">
          <LinesEllipsisLoose
            text={auction.product.title}
            maxLine="1"
            lineHeight="28"
            className="text-xl font-bold"
          />
          <div className="flex flex-row items-center gap-2 mx-auto mt-2">
            <div>
              <Avatar
                src={
                  auction.bidders.length > 0
                    ? auction.bidders[0].user.avatar
                    : ""
                }
                className={`${dance ? "hithere" : ""}`}
              />
            </div>

            <LinesEllipsisLoose
              text={
                auction.bidders.length > 0
                  ? auction.bidders[0].user.username
                  : ""
              }
              maxLine="1"
              lineHeight="16"
              className="text-xl break-words"
              style={{ color: colors.primary }}
            />
          </div>
          {auction.state !== "show" && DownCounter}
          {auction.state === "show" && (
            <span className="text-2xl" style={{ color: colors.primary }}>
              Winner
            </span>
          )}
          {auction.state === "checking" && (
            <span className="h-8 font-bold">Checking...</span>
          )}
          {auction.state !== "checking" && (
            <BidButton auction={auction} disabled={auction.state === "show"} />
          )}
        </div>
      </Card>
      <BuyModal
        product={auction.product}
        visible={buyVisible}
        onCancel={() => setBuyVisible(false)}
        onOk={() => {
          setBuyVisible(false);
          setPaypal4BuyVisible(true);
        }}
      ></BuyModal>
      <Paypal4BuyModal
        product={auction.product}
        visible={paypal4BuyVisible}
        onCancel={() => setPaypal4BuyVisible(false)}
        onOk={() => setPaypal4BuyVisible(false)}
      ></Paypal4BuyModal>
    </>
  );
};

export default Auction4BidUser;
