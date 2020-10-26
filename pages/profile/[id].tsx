/**
 * public profile
 * url: /profile/username
 */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";

import { Col, Row, Space, Typography, Card } from "antd";

import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import { USER_QUERY } from "../../apis/queries";
import { IUser } from "../../constants/types";
import Badge from "../../components/Badge4User";

const Win = require("../../images/win.png");
const Coin = require("../../images/coin.png");
const Point = require("../../images/point.png");

export default function Profile() {
  const [profile, setProfile] = useState<IUser>();

  const router = useRouter();

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: router.query.id },
  });

  useEffect(() => {
    if (!data || !data.user) {
      return;
    }
    setProfile(data.user);
  }, [data]);

  useEffect(() => {
    if (!router.query.id) {
      console.log("no profile id");
      return;
    }
  }, [router.query]);

  return (
    <MainLayout>
      {!!profile && (
        <>
          <div className="flex flex-row items-start w-full gap-4">
            <div className="w-1/4 flex flex-col gap-4">
              <Card hoverable>
                <img
                  className="w-32 h-32 object-cover object-center rounded-full ml-auto mr-auto"
                  src={profile.avatar}
                  alt="avatar"
                />
                <div className="py-4 px-6">
                  <h1 className="text-2xl font-semibold text-gray-800 text-center">
                    {profile.username ? profile.username : profile.email}
                  </h1>
                  <div className="flex items-center mt-4 text-gray-700">
                    <img src={Win} className="w-6 h-6" />
                    <h1 className="px-2 text-sm">{profile.wins} Wins</h1>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <img src={Coin} className="w-6 h-6" />
                    <h1 className="px-2 text-sm">{profile.coins} Coins</h1>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <img src={Point} className="w-6 h-6" />
                    <h1 className="px-2 text-sm">{profile.points} Points</h1>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <CalendarOutlined className="text-lg" />
                    <h1 className="px-2 text-sm">
                      Member since{" "}
                      {new Date(profile.created_at).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <UserOutlined className="text-lg" />
                    <h1 className="px-2 text-sm">{profile.plan} member</h1>
                  </div>
                </div>
              </Card>
              <Card hoverable title="Verified Socials">
                <div className="py-4 px-6">
                  {!!profile.facebook && !!profile.facebook.email && (
                    <div className="flex items-center mt-4 text-gray-700">
                      <FacebookOutlined className="text-lg" />
                      <h1 className="px-2 text-sm">Facebook</h1>
                    </div>
                  )}
                  {!!profile.google && !!profile.google.email && (
                    <div className="flex items-center mt-4 text-gray-700">
                      <GoogleOutlined className="text-lg" />
                      <h1 className="px-2 text-sm">Google</h1>
                    </div>
                  )}
                  {!!profile.twitter && !!profile.twitter.email && (
                    <div className="flex items-center mt-4 text-gray-700">
                      <TwitterOutlined className="text-lg" />
                      <h1 className="px-2 text-sm">Twitter</h1>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            <div className="w-3/4">
              <h1 className="text-2xl font-bold p-4">Awarded Badges</h1>
              {!!profile.badges && (
                <Row gutter={[16, 16]}>
                  {profile.badges.map((b, idx) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} key={idx}>
                      <Badge badge={b.badge} />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
