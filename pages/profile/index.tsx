import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";

import {
  Button,
  Input,
  message,
  Progress,
  Space,
  Tabs,
  Typography,
} from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";

import Uploader from "../../components/Uploader";
import {
  FacebookButton,
  GoogleButton,
} from "../../components/buttons/SocialButton";
import PassModal from "../../modals/PassModal";

import { GET_USER_BONUS_QUERY } from "../../apis/queries";

import {
  ADD_SOCIAL_MUTATION,
  CHANGE_AVATAR_MUTATION,
  SEND_AUTH_EMAIL_MUTATION,
  SEND_SMS_MUTATION,
  VERIFY_SMS_MUTATION,
} from "../../apis/mutations";

const { TabPane } = Tabs;

const Win = require("../../images/win.png");
const Coin = require("../../images/coin.png");
const Point = require("../../images/point.png");
const Bonus = require("../../images/bonus.png");

const { Title, Text } = Typography;

const Fortune = ({ src, amount, text }) => (
  <Space>
    <img src={src} style={{ width: 25 }} />
    {amount}
    {text}
  </Space>
);

export default function Profile() {
  const {
    mapState: { user },
  } = useMapState();

  const router = useRouter();

  const [session, loading] = useSession();
  const [social, setSocial] = useState("none");

  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [bonus, setBonus] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [phoneVisible, setPhoneVisible] = useState(true);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: user ? user.avatar : "",
    },
  ]);

  const [profile_rate, setProfileRate] = useState(0);

  const { data: bonusData } = useQuery(GET_USER_BONUS_QUERY, {
    variables: { user_id: user ? user.id : "" },
  });
  const [changeAvatar] = useMutation(CHANGE_AVATAR_MUTATION);
  const [passDlgVisible, setPassDlgVisible] = useState(false);

  const [addSocial, { loading: addSocialLoading, error }] = useMutation(
    ADD_SOCIAL_MUTATION
  );

  const addSocialProc = async (key) => {
    if (!user) {
      console.log("addSocialProc, no user...");
      return;
    }
    const social_obj = {
      key,
      value: session.user,
    };

    const res = await addSocial({
      variables: {
        user_id: user.id,
        social: social_obj,
      },
    });

    setFacebookLoading(false);
    setGoogleLoading(false);
    console.log("addSocial result...", res.data);

    if (res.data.addSocial) {
      message.success("Success to add social!");
    } else {
      message.error("Failed to add social!");
    }
  };

  const [sendAuthEmail] = useMutation(SEND_AUTH_EMAIL_MUTATION);
  const [sendSMS, { loading: smsLoading }] = useMutation(SEND_SMS_MUTATION);
  const [verifySMS, { loading: otpLoading }] = useMutation(VERIFY_SMS_MUTATION);

  const sendAutheMailProc = async () => {
    if (!email) {
      message.error("Input email address!");
      return;
    }
    const res = await sendAuthEmail({
      variables: {
        user_id: user.id,
        email,
      },
    });
    try {
      if (res.data.sendAuthEmail) {
        message.info("Sent the verification link to your email inbox.");
      } else {
        message.error("Failed to send the email to you!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendSMSProc = async () => {
    if (!phone) {
      message.error("Input phone number!");
      return;
    }
    const res = await sendSMS({
      variables: {
        user_id: user.id,
        phone,
      },
    });
    try {
      if (res.data.sendSMS.code === "success") {
        message.info("Sent the verification code to your phone number!");
      } else {
        message.error(res.data.sendSMS.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const verifyCode = async () => {
    if (!phone) {
      message.error("Input verification code!");
      return;
    }
    const res = await verifySMS({
      variables: {
        user_id: user.id,
        token: otp,
      },
    });
    try {
      if (res.data.verifySMS.code === "success") {
        message.info("Success to verify the code!");
      } else {
        message.error(res.data.verifySMS.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    console.log("session from the social...", session);

    if (
      session.user.image.indexOf("fbsbx.com") > -1 ||
      session.user.image.indexOf("fbcdn.net") > -1
    ) {
      //facebook
      console.log("session from the facebook...", session.user);

      setSocial("facebook");
      setFacebookLoading(true);
      addSocialProc("facebook");
    } else if (session.user.image.indexOf("googleusercontent.com") > -1) {
      //google
      console.log("session from the google...", session.user);
      setSocial("google");
      setGoogleLoading(true);
      addSocialProc("google");
    }
  }, [session]);

  useEffect(() => {
    if (!bonusData || !bonusData.getBonus) {
      return;
    }
    setBonus(bonusData.getBonus);
  }, [bonusData]);

  useEffect(() => {
    if (!user || (user && phone === user.phone)) {
      return;
    }
    setPhoneVisible(true);
  }, [phone]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPhone(user.phone);
      setPhoneVisible(!user.phone_verified);

      const verified_ratio =
        (user.phone_verified ? 25 : 0) +
        (user.email_verified ? 25 : 0) +
        (user.google && user.google.email ? 25 : 0) +
        (user.facebook && user.facebook.email ? 25 : 0);
      setProfileRate(verified_ratio);
    }
  }, [user]);

  useEffect(() => {
    setFacebookLoading(false);
    setGoogleLoading(false);
  }, []);

  return (
    <MainLayout>
      {user && (
        <div className="flex">
          <div>
            <Space direction="vertical" className="text-center">
              <Uploader
                fileList={fileList}
                upload={async (url) => {
                  const res = await changeAvatar({
                    variables: {
                      user_id: user.id,
                      avatar: url.replace("http://", "https://"),
                    },
                  });

                  console.log("changeAvatar result...", res.data);

                  if (res.data.changeAvatar) {
                    message.success("Success to update avatar!");
                  } else {
                    message.error("Failed to update avatar!");
                  }
                }}
              />

              <Title level={3}>{user.username}</Title>
              <Text strong>{user.plan}</Text>
              <Text>
                member since {new Date(user.created_at).toLocaleDateString()}
              </Text>
              <Button
                type="link"
                block
                style={{ textAlign: "left" }}
                onClick={() => {
                  setPassDlgVisible(true);
                }}
              >
                change password
              </Button>
            </Space>
            <Space direction={"vertical"}>
              <Button
                block
                type="primary"
                onClick={() => {
                  router.push("/profile/orders");
                }}
              >
                MY ORDERS
              </Button>
              <Button
                block
                type="primary"
                onClick={() => {
                  router.push("/profile/badges");
                }}
              >
                MY BADGES
              </Button>
              <Button
                block
                type="primary"
                onClick={() => {
                  router.push("/profile/notes");
                }}
              >
                MY NOTIFICATIONS
              </Button>
              <Button
                block
                type="primary"
                onClick={() => {
                  router.push("/profile/listings");
                }}
              >
                MY LISTINGS
              </Button>
              <Button
                block
                type="primary"
                onClick={() => {
                  router.push("/profile/friends");
                }}
              >
                MY FRIENDS
              </Button>
            </Space>
          </div>
          <div className="w-full">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Statistics" key="1">
                <Space direction={"vertical"}>
                  <Fortune src={Coin} amount={user.coins} text={"Bids paid"} />
                  <Fortune src={Bonus} amount={bonus} text={"Bonus paid"} />
                  <Fortune src={Win} amount={user.wins} text={"Wins"} />
                  <Fortune src={Point} amount={user.points} text={"Points"} />
                </Space>
              </TabPane>
              <TabPane tab="Verify Account" key="2">
                <div className="flex flex-row">
                  <Space direction={"vertical"} className="w-1/3">
                    {user &&
                      (!user.facebook ||
                        (user.facebook && !user.facebook.name)) && (
                        <FacebookButton loading={facebookLoading} />
                      )}
                    {user && user.facebook && user.facebook.name && (
                      <Title level={4}>Associated with Facebook</Title>
                    )}
                    {user &&
                      (!user.google || (user.google && !user.google.name)) && (
                        <GoogleButton loading={googleLoading} />
                      )}
                    {user && user.google && user.google.name && (
                      <Title level={4}>Associated with Google</Title>
                    )}
                    <Input
                      size="large"
                      placeholder="Email"
                      value={email}
                      prefix={<MailOutlined />}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    {user && !user.email_verified && (
                      <Button
                        icon={<MailOutlined />}
                        block
                        style={{ background: "#ff00ff", color: "white" }}
                        onClick={() => sendAutheMailProc()}
                      >
                        Verify Email
                      </Button>
                    )}
                    {user && user.email_verified && (
                      <Title level={4}>Associated with Email</Title>
                    )}
                    <Input
                      size="large"
                      placeholder="Phone Number"
                      value={phone}
                      prefix={<PhoneOutlined />}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    {user && phoneVisible && (
                      <Button
                        icon={<PhoneOutlined />}
                        block
                        style={{ background: "#6aa84f", color: "white" }}
                        onClick={() => sendSMSProc()}
                        loading={smsLoading}
                      >
                        Send SMS
                      </Button>
                    )}
                    <Input
                      size="large"
                      placeholder="Phone Vericiation code"
                      value={otp}
                      prefix={<PhoneOutlined />}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                    {user && phoneVisible && (
                      <Button
                        icon={<PhoneOutlined />}
                        block
                        style={{ background: "#6aa84f", color: "white" }}
                        onClick={() => verifyCode()}
                        loading={otpLoading}
                      >
                        Verify Phone
                      </Button>
                    )}
                    {user && user.phone_verified && (
                      <Title level={4}>Associated with Phone</Title>
                    )}
                  </Space>
                  <div className="flex flex-row gap-16 items-center justify-center w-full">
                    <div className="flex flex-col">
                      <Progress
                        type="circle"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        width={200}
                        percent={profile_rate}
                      />
                      <span className="text-center text-2xl mt-4">
                        Profile Completeness
                      </span>
                    </div>
                    <div className="flex flex-col">
                      {user.email_verified && (
                        <span className="text-lg text-green-600">
                          ✓ Email Verified
                        </span>
                      )}
                      {!user.email_verified && (
                        <span className="text-lg text-gray-600">
                          ✗ Email Unverified
                        </span>
                      )}
                      {user.phone_verified && (
                        <span className="text-lg text-green-600">
                          ✓ Phone Verified
                        </span>
                      )}
                      {!user.phone_verified && (
                        <span className="text-lg text-gray-600">
                          ✗ Phone Unverified
                        </span>
                      )}
                      {user.google && user.google.email && (
                        <span className="text-lg text-green-600">
                          ✓ Google Verified
                        </span>
                      )}
                      {(!user.google || !user.google.email) && (
                        <span className="text-lg text-green-600">
                          ✗ Google Unverified
                        </span>
                      )}
                      {user.facebook && user.facebook.email && (
                        <span className="text-lg text-green-600">
                          ✓ Facebook Verified
                        </span>
                      )}
                      {(!user.facebook || !user.facebook.email) && (
                        <span className="text-lg text-gray-600">
                          ✗ Facebook unverified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}

      <PassModal
        visible={passDlgVisible}
        onOk={() => setPassDlgVisible(false)}
        onCancel={() => setPassDlgVisible(false)}
      ></PassModal>
    </MainLayout>
  );
}
