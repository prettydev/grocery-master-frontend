import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Input,
  Radio,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";

import { useMapState } from "../../context/store";

import MainLayout from "../../layouts/MainLayout";

import TitleBar from "../../layouts/TitleBar";

const { Title, Text } = Typography;

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function Winners() {
  const router = useRouter();

  return (
    <>
      <MainLayout>
        <TitleBar title={"About Us"} />

        <Text>
          Our mission is to create and maintain an authentic real-time social
          bidding platform for people who want to shop and enjoy friendly,
          honest competition.
        </Text>

        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel header="How do we accomplish this?" key="1">
            <p style={{ paddingLeft: 24 }}>
              By adding a revolutionary and patented prefunding component to an
              existing and broken pay-to-bid method. Utilizing our Patented and
              Copyright protected technology, Exhibia adds unprecedented
              transparency to an industry mired in questionable practices.
              Pre-funding = Buying bids towards an item which then grants
              insights into consumer interests as a residual as well as
              eliminates the needs for “bots” or “shills” on our bidding
              website.
            </p>
          </Panel>
          <Panel header="How does it work?" key="2">
            <p style={{ paddingLeft: 24 }}>
              <p>So every Exhibia ® retail item goes through 2 phases:</p>
              <p>1. Funding Phase</p>
              <p>2. Bidding Phase</p>
            </p>
          </Panel>
          <Panel
            header="Once an item is 100% funded it is opened for bidding. How do I get bids?"
            key="3"
          >
            <p style={{ paddingLeft: 24 }}>
              <p>
                You can get bids by funding items. You can bid on any item that
                is already opened for bidding.
              </p>
              <p>Funding Packages:</p>
              <p>. $10 Get 10bids No Bonus</p>
              <p>. $20 Get 21bids 5% Bonus</p>
              <p>. $50 Get 55bids 10% Bonus</p>
              <p>. $100 Get 115bids 15% Bonus</p>
              <p>. $500 Get 600bids 20% Bonus</p>
            </p>
          </Panel>
          <Panel header="How can I be sure I am not outbid by a bot?" key="4">
            <p style={{ paddingLeft: 24 }}>
              Every item needs to be 100% funded before the bidding is started.
              Since the house site has already covered the cost of the item
              because of prefunding and our secured wholesale channels, the need
              for ever using bots to cover costs is entirely eliminated.
            </p>
          </Panel>
          <Panel header="How can I register to become a bidder?" key="5">
            <p style={{ paddingLeft: 24 }}>
              In order to maintain the integrity of our revolutionary
              verification process with our Facebook and Google partners, we
              will initially only allow registered Facebook & Google users to
              bid. We plan to open up to other social networks in the near
              future as our enterprise continues on its targeted path of growth
              and inclusion.
            </p>
          </Panel>
          <Panel header="Going, Going, Gone? Timer Extensions?" key="6">
            <p style={{ paddingLeft: 24 }}>
              Exhibia follows the original auctioneer format of “going,”
              “going,” “gone” or “going once”, “going twice”, “sold principle.”
              What are timer extensions and why do they occur? In order to
              “level the playing field” and in the “spirit of fairness,” we
              grant timer extensions to offset fluctuating volume on the site in
              the beta test mode. During beta there is a hidden bid reserve that
              needs to be fulfilled for the Winner to be declared. Exhibia was
              designed to be a global phenomenon whose preliminary beta tests
              determined the removal of timer extensions once we have launched
              the eventual volume.
            </p>
          </Panel>
          <Panel header="Trade-Off My WIN To Cash Transfer?" key="7">
            <p style={{ paddingLeft: 24 }}>
              Exhibia is willing to trade most WINS into another item of cash
              transfer equivalent of %70 to -%50 of the cost of the item.
              Contact customer service to ask for Trade-Off value for your win.
              Trade-off value depends on the inventory levels and exhibia
              retains the right to not trade-off.
            </p>
          </Panel>
          <Panel header="What if I lose the bidding?" key="8">
            <p style={{ paddingLeft: 24 }}>
              Exhibia is proud to be an Amazon Market Place Retailer and most
              items will have a “Buy-It-Now” option that will let you make a
              purchase for MSRP (often less) and get your used bids back from
              the corresponding auction. * MSRP Manufacturers Suggested Retail
              Price
            </p>
          </Panel>
          <Panel header="Shipping Times?" key="9">
            <p style={{ paddingLeft: 24 }}>
              How fast do you ship? We currently ship within 2 to 14 days from
              the date when shipping & handling fee was paid. Digital giftcards
              are delivered the same day or the following day for fully
              qualified bidders.
            </p>
          </Panel>
          <Panel header="Expiration of Winning Item?" key="10">
            <p style={{ paddingLeft: 24 }}>
              Can my wins expire? Yes we retain the right to expire your win if
              shipping is not paid within 14 days from the win date.
            </p>
          </Panel>
          <Panel header="Shipping & Handling Fees?" key="11">
            <p style={{ paddingLeft: 24 }}>
              Why is there a handling fee on digital giftcards? Our customers
              safety and our safety is the most important factor. We need to be
              sure our customers Paypal accounts are in good standing. Giveaway
              Auction will expire in 72h, if checkout process is not completed
              within 72hours from the time the auction finnished. Any giftcard
              orders maybe converted for bidding credits by administration,
              specially in the case, where administration feels that customer
              has repeatedly tried to mislead or give fraudulent or misleading
              information to administration.
            </p>
          </Panel>
          <Panel header="Fully Qualified Bidder and Dual Verified?" key="12">
            <p style={{ paddingLeft: 24 }}>
              <p>
                How can I become FQB Fully qualified bidder? Complete 100% our 4
                step verification process.
              </p>
              <p>
                -Associate with Google and Facebook and become dual verified.
              </p>
              <p>
                -Confirm your mobile/phone number and increase WIN LIMIT to 2x
                items per day.
              </p>
              <p>-Verify Email</p>
            </p>
          </Panel>
          <Panel
            header="Win Limits? How Many Items Can I win Per Day?"
            key="13"
          >
            <p style={{ paddingLeft: 24 }}>
              <Text strong>NEW USERS (AKA “NEWBIE”):</Text>
              The default win limit for a new user is 1x/per 24h. When a user
              verifies their phone/mobile number, their Win Limit is increased
              to 2.
              <Text strong>ALL USERS:</Text>
              2x Win limit applies to funded items.
              <Text strong>GIVEAWAY ITEMS:</Text>
              Win limit for those remain 1x/24h. Max 2 Giveaway items per week.
              Max 4 Giveaway items per month. All wins are void if user is found
              having multiple user accounts.
            </p>
          </Panel>
          <Panel header="How Do I Verify My Phone/Mobile?" key="14">
            <p style={{ paddingLeft: 24 }}>
              Log in to your account and click on Verify Phone button, located
              at My Profile. Type in your phone number and press send, this will
              send a 4 digit pin code to you in text message format. After you
              receive successful code open url:
              http://www.exhibia.com/profile/verify/XXXX. Replace XXXX with the
              pin code and open in web browser.
            </p>
          </Panel>
          <Panel header="Can I Change My Bidder Name?" key="15">
            <p style={{ paddingLeft: 24 }}>
              You can change your bidder name once. Please email
              info@exhibia.com your new bidder name and we will change it for
              you.
            </p>
          </Panel>
          <Panel header="How Does This Involve Me?" key="16">
            <p style={{ paddingLeft: 24 }}>
              From now you can bid and save %95 off MSRP from your next Amazon
              purchase or you can purchase the item at MSRP and get your bids
              back. So no matter what, you can buy the item for MSRP. Why not
              try to Bid & Save? You can´t lose!
            </p>
          </Panel>
          <Panel
            header="Will I Be Notified When My Item Is Opened For Bidding?"
            key="17"
          >
            <p style={{ paddingLeft: 24 }}>
              Yes we do. Press on the little blue star next to an item and and
              select the communication method how you would like to be notified
              when the item is opened for bidding. Currently there is a 10
              minute notification period after item has been 100% funded and it
              is opened for bidding, so you will be notified 10 minutes before
              bidding is opened. SOCIAL SHOPPING NETWORK ® Licensee
              <Text strong>Intellectual Property:</Text>
              <Text strong>Patents:</Text>
              USA Patent US20130262257 WORLD Patent WO2013140278A1
              <Text strong>Registered Copyrights:</Text>
              COPYRIGHT User interface & Marketing materials COPYRIGHT Videos
            </p>
          </Panel>
        </Collapse>
      </MainLayout>
    </>
  );
}
