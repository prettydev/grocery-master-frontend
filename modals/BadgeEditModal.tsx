import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { Button, Form, Input, message, Modal, Select, Space } from "antd";

import Uploader from "../components/Uploader";

import { useMapState } from "../context/store";
import { BADGE_EDIT_MUTATION } from "../apis/mutations";

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

const BadgeEditModal = (props) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [form] = Form.useForm();

  const [editBadge] = useMutation(BADGE_EDIT_MUTATION);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: props.badge ? props.badge.image : "",
    },
  ]);

  const onFinish = async (values) => {
    console.log(values);
    const res = await editBadge({
      variables: {
        badge_id: props.badge.id,
        input: values,
      },
    });

    console.log("waiting for the mutation result...");

    if (res.data && res.data.editBadge) {
      console.log(res.data.editBadge.badge);

      setMapState({
        type: "editBadge",
        badge: res.data.editBadge.badge,
      });

      message.success("Badge updated!");
      props.onOk();
    } else {
      message.error(res.data.editBadge.message);
    }
  };

  return (
    <Modal
      title="Edit Badge"
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
          initialValue={props.badge.kind}
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
          initialValue={props.badge.image}
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
          initialValue={props.badge.title}
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
          initialValue={props.badge.details}
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
          initialValue={props.badge.points}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
              console.log(value);
            }}
            allowClear
          >
            {[5, 10, 25, 50].map((b, idx) => (
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
          initialValue={props.badge.type}
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
          initialValue={props.badge.rewards}
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
          initialValue={props.badge.difficulty}
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

export default BadgeEditModal;
