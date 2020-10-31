/**
 * public profile
 * url: /profile/username
 */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { Card } from "antd";

import {
  FacebookOutlined,
  GoogleOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import MainLayout from "../../layouts/MainLayout";
import { USER_QUERY } from "../../apis/queries";
import { IUser } from "../../constants/types";

export default function Profile() {
  const [profile, setProfile] = useState<IUser>();

  const router = useRouter();

  const { data } = useQuery(USER_QUERY, {
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
                  src={profile.image}
                  alt="avatar"
                />
                <div className="py-4 px-6">
                  <h1 className="text-2xl font-semibold text-gray-800 text-center">
                    {profile.name ? profile.name : profile.email}
                  </h1>
                  <div className="flex items-center mt-4 text-gray-700">
                    <h1 className="px-2 text-sm">{profile.coins} Coins</h1>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
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
                </div>
              </Card>
            </div>
            <div className="w-3/4"></div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
