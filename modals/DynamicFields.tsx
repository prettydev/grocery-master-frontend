import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";

export default function DynamicField({ name, onChange = null }) {
  const [fields_cnt, setFieldsCnt] = useState(0);

  const increaseFieldsCnt = () => {
    setFieldsCnt(fields_cnt + 1);
  };

  const decreaseFieldsCnt = () => {
    setFieldsCnt(fields_cnt - 1);
  };

  useEffect(() => {
    if (!onChange) {
      return;
    }
    onChange(fields_cnt ? "ok" : null);
  }, [fields_cnt]);

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <div className="flex flex-row justify-between">
                  {/* <Divider>Field {index + 1}</Divider> */}

                  <>
                    {name === "feature_bullets" && (
                      <Form.Item
                        name={[index, "value"]}
                        rules={[{ required: true }]}
                        className="w-full"
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    )}
                    {name !== "feature_bullets" && (
                      <div className="flex flex-col w-full">
                        <Form.Item
                          name={[index, "name"]}
                          label="Name"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="" />
                        </Form.Item>
                        <Form.Item
                          name={[index, "value"]}
                          label="Value"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="" />
                        </Form.Item>
                      </div>
                    )}
                  </>

                  {fields.length > 0 ? (
                    <Button
                      className="dynamic-delete-button ml-2"
                      onClick={() => {
                        remove(field.name);
                        decreaseFieldsCnt();
                      }}
                      icon={<MinusCircleOutlined />}
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
                <hr className="border-dashed mb-6" />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  increaseFieldsCnt();
                }}
                style={{ width: "60%" }}
              >
                <PlusOutlined /> Add {name}
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}
