import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Space,
  Typography,
} from "antd";

import { useMapState } from "../context/store";
import { CHANGE_PASSWORD_MUTATION } from "../apis/mutations";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const PassModal = (props) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [form] = Form.useForm();

  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION);

  const onFinish = async (values) => {
    const input = {
      user_id: user.id,
      current_password: values.current_password,
      password: values.password,
    };

    console.log(input);

    const res = await changePassword({
      variables: {
        ...input,
      },
    });

    console.log("change password result ", res.data);
    if (res.data.changePassword.code === "success") {
      message.success(res.data.changePassword.message);
      props.onOk();
    } else {
      message.error(res.data.changePassword.message);
    }
  };

  return (
    <Modal
      title="Change Password"
      centered
      visible={props.visible}
      footer={[]}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="current_password"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm New Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
            <Button onClick={() => props.onCancel()}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PassModal;
