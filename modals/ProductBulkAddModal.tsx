import React, { useState } from "react";
import { useRouter } from "next/router";
import { Modal, Form, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function ProductBulkAddModal(props) {
  const router = useRouter();

  const [form] = Form.useForm();

  const [files, setFiles] = useState([]);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = ({ fileList, file, event }) => {
    setFiles([file]);

    if (file.response && file.response.code) {
      if (file.response.code === "success")
        message.success(file.response.message);
      else if (file.response.code === "error")
        message.error(file.response.message);
    }

    console.log(file);
  };

  return (
    <Modal
      title="Add Bulk Products"
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
        initialValues={{
          ["is_new"]: true,
        }}
      >
        <Form.Item
          name="file"
          label="file"
          valuePropName="file"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            fileList={files}
            action={`${process.env.API_URL}upload`}
            onChange={onChange}
            multiple={false}
            accept=".json"
          >
            <Button icon={<UploadOutlined />}>
              Click to upload ( *.json )
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" onClick={props.onOk}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
