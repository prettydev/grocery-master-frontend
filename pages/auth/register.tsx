import React, { useState, useEffect } from "react";
import { Alert, Form, Input, Button, message, Space } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import Uploader from "../../components/Uploader";
import { ADD_USER } from "../../apis/mutations";
import MainLayout from "../../layouts/MainLayout";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const [ref, setRef] = useState("");

  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const onFinish = async (values) => {
    delete values.confirm;

    console.log("registering values are ", values);

    const res = await addUser({ variables: { user: values, ref } });
    console.log(res.data);
    if (res.data.register) {
      message.success("Registration Success!");
      router.push("/auth/login");
    } else {
      message.error("Registration Failed!");
    }
  };

  useEffect(() => {
    console.log(router);
    if (router.query.ref) {
      setRef(router.query.ref.toString());
    }
  }, [router]);

  return (
    <MainLayout>
      <div className="w-full flex justify-center">
        <div className="w-1/3 mt-24">
          {error && (
            <Alert message={error.message} type="error" showIcon closable />
          )}
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please select your image!" }]}
            >
              <Uploader
                upload={(url) => {
                  form.setFieldsValue({
                    image: url,
                  });
                }}
              />
            </Form.Item>

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
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
