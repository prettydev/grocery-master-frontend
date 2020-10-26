import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { signIn } from "next-auth/client";
import { Button } from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const FacebookButton = ({ loading, text = "Associate with Facebook" }) => {
  return (
    <Button
      icon={<FacebookOutlined />}
      block
      style={{ background: "#2b78e4", color: "white" }}
      onClick={() => {
        signIn("facebook");
      }}
      loading={loading}
    >
      {text}
    </Button>
  );
};

const GoogleButton = ({ loading, text = "Associate with Google" }) => {
  return (
    <Button
      icon={<GoogleOutlined />}
      block
      danger
      style={{ background: "#cf2a27", color: "white" }}
      onClick={() => {
        signIn("google");
      }}
      loading={loading}
    >
      {text}
    </Button>
  );
};

const TwitterButton = ({ loading, text = "Associate with Twitter" }) => {
  return (
    <Button
      icon={<TwitterOutlined />}
      block
      danger
      style={{ background: "#cf2a27", color: "white" }}
      onClick={() => {
        signIn("twitter");
      }}
      loading={loading}
    >
      {text}
    </Button>
  );
};

export { FacebookButton, GoogleButton, TwitterButton };
