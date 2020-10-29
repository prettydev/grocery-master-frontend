import React, { useEffect } from "react";
import { Alert, Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../apis/queries";

const SecureLS = require("secure-ls");

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [form] = Form.useForm();

  const [loginUser, { called, loading, data, error, refetch }] = useLazyQuery(
    LOGIN_QUERY
  );

  const onFinish = async (values) => {
    loginUser({ variables: { user: values } });
  };

  useEffect(() => {
    if (data && data.login && data.login.user) {
      message.success("Succss to login!");
      setMapState({
        type: "setUser",
        user: data.login.user,
      });
      new SecureLS().set("user", data.login.user);
      router.push("/groceries");
    } else if (data && data.login && !data.login.user) {
      message.error("Failed to login!");
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (error) console.log(JSON.stringify(error));
  }, [error]);

  return (
    <MainLayout>
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          {...layout}
          name="control-hooks"
          form={form}
          onFinish={onFinish}
          style={{ width: "30%" }}
        >
          <Form.Item
            label="Email"
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Login;
