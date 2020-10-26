import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export default function TrackingInputBox(props) {
  const { id, tracking, proc } = props;

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);

    const res: boolean = await proc(id, value);
    if (!res) {
      setValue("");
    }

    setLoading(false);
  };

  useEffect(() => {
    setValue(tracking);
  }, [tracking]);

  return (
    <div className="flex flex-row">
      <Input
        placeholder="..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-0 w-20"
      />
      <Button
        disabled={!value}
        onClick={onClick}
        loading={loading}
        className="border-0 "
      >
        <CheckOutlined />
      </Button>
    </div>
  );
}
