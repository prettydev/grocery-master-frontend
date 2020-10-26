import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";

import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";

import { useMapState } from "../../context/store";
import {
  FacebookButton,
  GoogleButton,
} from "../../components/buttons/SocialButton";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../apis/queries";
import { SOCIAL_REGISTER_LOGIN_MUTATION } from "../../apis/mutations";

const SecureLS = require("secure-ls");

const Logo = require("../../images/logo.png");

const { Text } = Typography;

export default function Auth() {
  const { setMapState } = useMapState();

  const router = useRouter();

  const [form] = Form.useForm();

  const [loginUser, { loading, data, error }] = useLazyQuery(LOGIN_QUERY);

  const onFinish = async (values) => {
    console.log("continued with email...");
    loginUser({ variables: { user: values } });
  };

  const [session, sessionLoading] = useSession();
  const [social, setSocial] = useState("none");
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [socialRegisterLogin] = useMutation(SOCIAL_REGISTER_LOGIN_MUTATION);

  const addSocialProc = async (key) => {
    const social_obj = {
      key,
      value: session.user,
    };

    console.log("calling socialRegisterLogin ...", social_obj);

    const { data: socialData } = await socialRegisterLogin({
      variables: {
        social: social_obj,
      },
    });

    console.log("finished calling...", socialData);

    setFacebookLoading(false);
    setGoogleLoading(false);

    if (
      socialData &&
      socialData.socialRegisterLogin &&
      socialData.socialRegisterLogin.user
    ) {
      message.success("Login success!");
      setMapState({
        type: "setUser",
        user: socialData.socialRegisterLogin.user,
      });
      new SecureLS().set("user", socialData.socialRegisterLogin.user);
    } else if (
      socialData &&
      socialData.login &&
      !socialData.socialRegisterLogin.user
    ) {
      message.error("Login failed!");
    }
  };

  useEffect(() => {
    if (data && data.login && data.login.user) {
      setMapState({
        type: "setUser",
        user: data.login.user,
      });
      new SecureLS().set("user", data.login.user);
    } else if (data && data.login && !data.login.user) {
      message.error("Login failed!");
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (error) console.log(JSON.stringify(error));
  }, [error]);

  useEffect(() => {
    if (!session) return;

    console.log("session from the social login...", session);

    if (
      session.user.image.indexOf("fbsbx.com") > -1 ||
      session.user.image.indexOf("fbcdn.net") > -1
    ) {
      setSocial("facebook");
      setFacebookLoading(true);
      addSocialProc("facebook");
    } else if (session.user.image.indexOf("googleusercontent.com") > -1) {
      setSocial("google");
      setGoogleLoading(true);
      addSocialProc("google");
    }
  }, []);

  useEffect(() => {
    setFacebookLoading(false);
    setGoogleLoading(false);
  }, []);

  return (
    <div
      className={
        router.pathname === "/auth"
          ? "w-full h-screen bg-gray-200 flex justify-center items-center"
          : ""
      }
    >
      <Space
        size="large"
        direction="vertical"
        className="bg-white p-12 text-center"
      >
        <Text>Exhibia Online Auctions</Text>
        <img src={Logo} className="ml-auto mr-auto w-64 h-auto" />

        {error && (
          <Alert message={error.message} type="error" showIcon closable />
        )}
        <Form name="control-hooks" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Continue With Email
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ marginTop: -20 }}>or</Divider>
        <FacebookButton
          text="Continue With Facebook"
          loading={facebookLoading}
        />
        <GoogleButton text="Continue With Google" loading={googleLoading} />
        <Text>
          By continue you agree with Exhibia's Terms of service, privacy policy
        </Text>
      </Space>
    </div>
  );
}
