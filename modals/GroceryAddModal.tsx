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
import LocationPicker from "../components/LocationPicker";
import { languages } from "../constants/categories";
import ImagePicker from "../components/ImagePicker";
import { GROCERY_ADD_MUTATION } from "../apis/mutations";
import useScript from "../hooks/useScript";
import CreditCardInput from "../components/CreditCardInput";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function grocerySingleAddModal(props) {
  const status = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNngJXCYcFAM9lRwcF3-lHJzWThZb8nGs&libraries=places"
  );

  const router = useRouter();

  const [form] = Form.useForm();

  const [addgrocery, { loading }] = useMutation(GROCERY_ADD_MUTATION);

  const setLogo = (url) => {
    form.setFieldsValue({
      logo: url.replace("http://", "https://"),
    });
  };

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [show_second, setShowSecond] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const grocery = {
      name: values.name,
      second_lang: values.second_lang,
      opening_hours: values.opening_hours,
      logo: {
        link: values.logo,
      },
      images,
      description: [
        {
          lang: "en",
          value: values.description,
        },
        {
          lang: values.second_lang,
          value: values.description2,
        },
      ],
      location: values.location,
      mobile: values.mobile,
      owner_email: values.owner_email,
      credit_card: values.credit_card,
      delivery_policy: [
        {
          lang: "en",
          value: values.delivery_policy,
        },
        {
          lang: values.second_lang,
          value: values.delivery_policy2,
        },
      ],
      about_us: [
        {
          lang: "en",
          value: values.about_us,
        },
        {
          lang: values.second_lang,
          value: values.about_us2,
        },
      ],
      contact_email: values.contact_email,
      contact_phone: values.contact_phone,
      delivery_radius: values.delivery_radius,
      min_order: values.min_order,
      first_offer_discount: values.first_offer_discount,
      is_collect: values.is_collect,
      bank_account: values.bank_account,
    };

    console.log("grocery:", grocery);

    const res = await addgrocery({
      variables: {
        grocery: grocery,
      },
    });

    console.log("res.data:", res.data);

    if (res.data && res.data.add_grocery) {
      message.success("Success to add grocery!");
      props.onOk();
    } else {
      message.error("Failed to add grocery!");
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

  const setLocation = (location) => {
    console.log("location from the picker:", location);

    if (!location || !location.address || !location.lat || !location.lng) {
      return;
    }

    form.setFieldsValue({
      location,
    });
  };

  const onCreditCardChange = (credit_card) => {
    form.setFieldsValue({
      credit_card,
    });
  };

  const onSecondLangChange = (v) => {
    setShowSecond(v !== "none");
  };

  return (
    <Modal
      title="Add Grocery"
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please type a grocery name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Logo"
          name="logo"
          rules={[{ required: true, message: "Please select grocery image!" }]}
        >
          <ImagePicker image={""} upload={setLogo} />
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

        <Form.Item
          name={"location"}
          label="Location"
          rules={[
            {
              required: true,
              message: "Please type a grocery location!",
            },
          ]}
        >
          <LocationPicker
            location={{
              address: "",
              lat: 0,
              lng: 0,
            }}
            onChange={setLocation}
          />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            {
              required: true,
              message: "Please type a grocery owner's mobile number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Owner Email"
          name="owner_email"
          rules={[
            {
              required: true,
              message: "Please type a grocery owner's email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Bank Account" name="bank_account">
          <Input />
        </Form.Item>

        <Form.Item
          label="Credit Card Number"
          name="credit_card"
          rules={[
            {
              required: true,
              message: "Please type a credit card details!",
            },
          ]}
        >
          <CreditCardInput onChange={onCreditCardChange} />
        </Form.Item>

        <Form.Item
          name="second_lang"
          label="Second Language"
          hasFeedback
          rules={[
            { required: true, message: "Please select a second language!" },
          ]}
        >
          <Select
            placeholder="Please select a second language!"
            defaultValue={""}
            onChange={onSecondLangChange}
          >
            <Option key={-1} value={"none"}>
              {"None"}
            </Option>
            {languages.map((c, idx) => (
              <Option key={idx} value={c.value}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        {show_second && (
          <Form.Item label="Description2" name="description2">
            <Input.TextArea />
          </Form.Item>
        )}

        <Form.Item label="Delivery Policy" name="delivery_policy">
          <Input.TextArea />
        </Form.Item>

        {show_second && (
          <Form.Item label="Delivery Policy2" name="delivery_policy2">
            <Input.TextArea />
          </Form.Item>
        )}

        <Form.Item label="About Us" name="about_us">
          <Input.TextArea />
        </Form.Item>

        {show_second && (
          <Form.Item label="About Us2" name="about_us2">
            <Input.TextArea />
          </Form.Item>
        )}

        <Form.Item label="Contact Email" name="contact_email">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Phone" name="contact_phone">
          <Input />
        </Form.Item>

        <Form.Item
          label="Opening hours"
          name="opening_hours"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={24} />
        </Form.Item>

        <Form.Item label="Delivery Radius" name="delivery_radius">
          <InputNumber min={0} max={1000} defaultValue={0} />
        </Form.Item>

        <Form.Item label="Minimum Order" name="min_order">
          <InputNumber min={0} max={1000} defaultValue={0} />
        </Form.Item>

        <Form.Item label="First Offer Discount" name="first_offer_discount">
          <InputNumber min={0} max={1000} defaultValue={0} />
        </Form.Item>

        <Form.Item
          name="is_collect"
          label="Click and Collect"
          valuePropName="checked"
        >
          <Switch checked />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
