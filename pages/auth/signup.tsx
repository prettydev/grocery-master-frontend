import React from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";

import MainLayout from "../../layouts/MainLayout";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Index = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
      <h2 style={{ textAlign: "center" }}>Exhibía Online Auctions</h2>
      <h1 style={{ textAlign: "center" }}>IEI</h1>

      <p style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit">
          Continue with Facebook
        </Button>
      </p>
      <p style={{ textAlign: "center" }}>
        <Button type="primary" danger htmlType="submit">
          Continue with Google
        </Button>
      </p>
      <h3 style={{ textAlign: "center" }}>
        By continue you agreee with Exhibia's Terms of sevice, Privacy Policy
      </h3>
    </MainLayout>
  );
};

export default Index;
