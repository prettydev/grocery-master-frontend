import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  Modal,
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Button,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { root } from "../constants/categories";
import DynamicFields from "./DynamicFields";
import ImagePicker from "../components/ImagePicker";
import { PRODUCT_ADD_MUTATION } from "../apis/mutations";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function ProductSingleAddModal(props) {
  const router = useRouter();

  const [form] = Form.useForm();

  const [addProduct] = useMutation(PRODUCT_ADD_MUTATION);

  const setMainImage = (url) => {
    form.setFieldsValue({
      main_image: url.replace("http://", "https://"),
    });
  };

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const product = {
      asin: values.asin,
      title: values.title,
      model_number: values.model_number,
      link: values.link ? values.link : "",
      categories: [{ name: values.categories, link: "" }],
      delivery_message: values.delivery_message,
      description: values.description,
      main_image: { link: values.main_image },
      images,
      feature_bullets: values.feature_bullets
        ? values.feature_bullets.map((f) => f.value)
        : [],
      attributes: values.attributes,
      specifications: values.specifications,
      buybox_winner: {
        condision: {
          is_new: values.is_new,
        },
        price: {
          value: values.price,
          currency: "USD",
        },
        shipping: {
          value: values.shipping ? values.shipping : 0,
          currency: "USD",
        },
      },
    };

    console.log("product:", product);

    const res = await addProduct({
      variables: {
        product,
      },
    });

    console.log("res.data:", res.data);

    if (res.data && res.data.admin_add_product) {
      message.success("Success to add product!");
      props.onOk();
    } else {
      message.error("Failed to add product!");
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = ({ fileList, file, event }) => {
    setFiles(fileList);

    if (!file.response) {
      console.error("Upload failed.");
      return;
    }
    console.log(file);

    setImages((images) => [
      ...images,
      { link: file.response.url, variant: "" },
    ]);
  };

  const onAttributesChange = (attributes_cnt) => {
    console.log("current attributes:", attributes_cnt);
    form.setFieldsValue({
      attributes_cnt,
    });
  };

  const onSpecificationsChange = (specifications_cnt) => {
    console.log("current specifications:", specifications_cnt);
    form.setFieldsValue({
      specifications_cnt,
    });
  };

  return (
    <Modal
      title="Add Single Product"
      centered
      visible={props.visible}
      footer={[]}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width="60%"
    >
      <Form
        name="validate_other"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          ["is_new"]: true,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please type a product title!" }]}
        >
          <Input />
        </Form.Item>

        <div className="flex flex-row justify-around px-40">
          <Form.Item
            label="Model"
            name="model_number"
            rules={[
              {
                required: true,
                message: "Please type a product model number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ASIN"
            name="asin"
            rules={[{ required: true, message: "Please type a product asin!" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="Link" name="link">
          <Input />
        </Form.Item>
        <Form.Item
          name="categories"
          label="Category"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a category">
            {root.map((c, idx) => (
              <Option key={idx} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Delivery message" name="delivery_message">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <div className="flex flex-row justify-around w-full px-40">
          <Form.Item
            label="Price"
            name="price"
            labelCol={{ span: 8 }}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={1000} />
          </Form.Item>
          <Form.Item label="Shipping" name="shipping" labelCol={{ span: 10 }}>
            <InputNumber min={0} max={1000} defaultValue={0} />
          </Form.Item>
          <Form.Item
            name="is_new"
            label="Is New"
            valuePropName="checked"
            labelCol={{ span: 12 }}
          >
            <Switch checked />
          </Form.Item>
        </div>
        <Form.Item
          label="Main Image"
          name="main_image"
          rules={[{ required: true, message: "Please select product image!" }]}
        >
          <ImagePicker image={""} upload={setMainImage} />
        </Form.Item>

        <Form.Item
          name="images"
          label="images"
          valuePropName="files"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            action={process.env.UPLOAD_URL}
            data={{ upload_preset: process.env.CLOUDINARY_PRESET }}
            listType="picture"
            onChange={onChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Features">
          <DynamicFields name="feature_bullets" />
        </Form.Item>
        <Form.Item
          label="Attributes"
          name="attributes_cnt"
          rules={[
            {
              required: true,
              message: "Please add attributes!",
            },
          ]}
        >
          <DynamicFields name="attributes" onChange={onAttributesChange} />
        </Form.Item>
        <Form.Item
          label="Specifications"
          name="specifications_cnt"
          rules={[
            {
              required: true,
              message: "Please add specifications!",
            },
          ]}
        >
          <DynamicFields
            name="specifications"
            onChange={onSpecificationsChange}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
