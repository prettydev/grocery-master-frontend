import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { CURRENT_AUCTION_SUBSCRIPTION } from "../apis/subscriptions";
import { IAuction } from "../constants/types";
import { useMapState } from "../context/store";

const useAuction = (ia:IAuction) => {

  const {
    setMapState,
  } = useMapState();

  const [auction, setAuction] = useState<IAuction>(ia);

  const { data, error } = useSubscription(CURRENT_AUCTION_SUBSCRIPTION, {
    variables: {
      auction_id: ia?ia.id:"",
    },
    shouldResubscribe: true,
  });

  useEffect(() => {
    console.log("error...........", error);
  }, [error]);

  useEffect(() => {

    if (!data || !data.auctionUpdated || !data.auctionUpdated.auction || !data.auctionUpdated.timestamp) {
      return;
    }

    const diff = new Date().getTime() - data.auctionUpdated.timestamp;
    const tmp_auction = { ...data.auctionUpdated.auction };

    if (tmp_auction.live_timer * 1000 > diff) {
      tmp_auction.live_timer = tmp_auction.live_timer * 1000 - diff;
    }    
    
    setAuction(tmp_auction);
  }, [data]);

  useEffect(() => {

    if (!auction || auction.manual === 65535 || auction.manual===ia.manual) {
      return;
    }

    setMapState({
      type: "setAuctionRefresh",
      auctionRefresh: true,
    });
  },[auction]);

  useEffect(() => {
    if (!ia) {
      return;
    }
    setAuction(ia);
  }, [ia]);

  return auction;
}

export default useAuction
