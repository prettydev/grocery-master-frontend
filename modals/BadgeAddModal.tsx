import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { Button, Form, Input, message, Modal, Select, Space } from "antd";

import Uploader from "../components/Uploader";

import { useMapState } from "../context/store";
import { BADGE_ADD_MUTATION } from "../apis/mutations";

import {
  badge_kinds,
  badge_types,
  badge_difficulties,
  badge_points,
} from "../constants/menu";

const { Option } = Select;

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
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const BadgeAddModal = (props) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [form] = Form.useForm();

  const [defaultLogo, setDefaultLogo] = useState(
    "https://res.cloudinary.com/djetned9h/image/upload/v1595582391/logo_nlcdbh.png"
  );
  const [addBadge] = useMutation(BADGE_ADD_MUTATION);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: defaultLogo,
    },
  ]);

  const onFinish = async (values) => {
    const res = await addBadge({
      variables: {
        input: values,
      },
    });

    if (res.data && res.data.addBadge) {
      setMapState({
        type: "addBadge",
        badge: res.data.addBadge.badge,
      });
      message.success("Success to add badge!");
      props.onOk();
    } else {
      message.error(res.data.addBadge.message);
    }
  };

  return (
    <Modal
      title="Add Badge"
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
          name="kind"
          label="Kind"
          rules={[{ required: true, message: "Please select the badge kind!" }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
              console.log(value);
            }}
            allowClear
          >
            {badge_kinds.map((b, idx) => (
              <Option value={b.value} key={idx}>
                {b.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            { required: true, message: "Please select the badge image!" },
          ]}
          initialValue={defaultLogo}
        >
          <Uploader
            fileList={fileList}
            upload={(url) => {
              form.setFieldsValue({
                image: url.replace("http://", "https://"),
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the badge title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="details"
          label="Details"
          rules={[
            {
              required: true,
              message: "Please input the badge details!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="points"
          label="Points"
          rules={[
            {
              required: true,
              message: "Please input the badge points!",
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
              console.log(value);
            }}
            allowClear
          >
            {badge_points.map((b, idx) => (
              <Option value={b} key={idx}>
                {b}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please select the badge type!",
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
              console.log(value);
            }}
            allowClear
          >
            {badge_types.map((b, idx) => (
              <Option value={b.value} key={idx}>
                {b.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="rewards"
          label="Rewards"
          rules={[
            {
              required: true,
              message: "Please input the badge rewards!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="difficulty"
          label="Difficulty"
          rules={[
            {
              required: true,
              message: "Please input the badge difficulty!",
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
              console.log(value);
            }}
            allowClear
          >
            {badge_difficulties.map((b, idx) => (
              <Option value={b.value} key={idx}>
                {b.label}
              </Option>
            ))}
          </Select>
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

export default BadgeAddModal;
