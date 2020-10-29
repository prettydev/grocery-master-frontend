import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import { message, Space, Typography } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import {
  FacebookButton,
  GoogleButton,
} from "../../components/buttons/SocialButton";

import { SOCIAL_REGISTER_LOGIN_MUTATION } from "../../apis/mutations";

const SecureLS = require("secure-ls");

const Logo = require("../../images/logo.png");

const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Social = () => {
  const { setMapState } = useMapState();

  const router = useRouter();

  const [session, loading] = useSession();
  const [social, setSocial] = useState("none");
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [socialRegisterLogin, { loading: socialLoading, error }] = useMutation(
    SOCIAL_REGISTER_LOGIN_MUTATION
  );

  const addSocialProc = async () => {
    const social_obj = {
      key: social,
      value: session.user,
    };

    console.log("calling socialRegisterLogin ...", social_obj);

    const { data } = await socialRegisterLogin({
      variables: {
        social: social_obj,
      },
    });

    console.log("finished calling...", data);

    setFacebookLoading(false);
    setGoogleLoading(false);

    console.log("addSocial result...", data);

    if (data && data.socialRegisterLogin && data.socialRegisterLogin.user) {
      setMapState({
        type: "setUser",
        user: data.socialRegisterLogin.user,
      });

      new SecureLS().set("user", data.socialRegisterLogin.user);
    } else if (data && data.login && !data.socialRegisterLogin.user) {
      message.error("Login failed!");
    }
  };

  useEffect(() => {
    if (!session) return;

    console.log("session from the social login...", session);

    if (
      session.user.image.indexOf("fbsbx.com") > -1 ||
      session.user.image.indexOf("fbcdn.net") > -1
    ) {
      setSocial("facebook");
      setFacebookLoading(true);
      addSocialProc();
    } else if (session.user.image.indexOf("googleusercontent.com") > -1) {
      setSocial("google");
      setGoogleLoading(true);
      addSocialProc();
    }
  }, [session]);

  useEffect(() => {
    setFacebookLoading(false);
    setGoogleLoading(false);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#eee" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* {error && (
          <Alert message={"User not exist!"} type="error" showIcon closable />
        )} */}

        <Space
          size="large"
          direction="vertical"
          style={{ textAlign: "center", background: "white", padding: 50 }}
        >
          <span className="text-2xl">byebyeGROCERY</span>
          <img src={Logo} />
          <FacebookButton
            text="Continue With Facebook"
            loading={facebookLoading}
          />
          <GoogleButton text="Continue With Google" loading={googleLoading} />
          <Text>
            By continue you agree with byebyeGROCERY's Terms of service, privacy
            policy
          </Text>
        </Space>
      </div>
    </div>
  );
};

export default Social;
