import { Space, Spin } from "antd";

export const Spinner = ({ loading }) => {
  return loading ? (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  ) : null;
};
