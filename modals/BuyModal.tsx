import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Col, Card, Modal, Radio, Row, Typography } from "antd";

import { useMapState } from "../context/store";

const { Title } = Typography;

const BuyModal = (props) => {
  const { setMapState } = useMapState();
  const [shipping, setShipping] = useState(7);

  return (
    <>
      {props.exhibit && (
        <Modal
          title="Buy product"
          centered
          visible={props.visible}
          okText={"Buy"}
          onOk={() => {
            setMapState({
              type: "setCurrentPayAmount4Buy",
              amount: props.exhibit.product.price + shipping,
            });
            props.onOk();
          }}
          onCancel={() => props.onCancel()}
          width="50%"
        >
          <Row>
            <Col
              span={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Title level={4}>{props.exhibit.product.title}</Title>
              <a href={props.exhibit.product.link} target="_blank">
                {props.exhibit.product.link}
              </a>
              <div>
                <Title level={4}>{"Shipping Method"}</Title>
                <Radio.Group
                  onChange={(e) => setShipping(e.target.value)}
                  value={shipping}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Radio value={7}>Standard - $7</Radio>
                  <Radio value={14}>Priority - $14</Radio>
                </Radio.Group>
              </div>
              <Title level={4}>{`Total amount: $${(
                props.exhibit.product.price + shipping
              ).toFixed(2)}`}</Title>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: "right" }}>
                <Link
                  href={"/exhibits/[exhibit]"}
                  as={`/exhibits/${props.exhibit.id}`}
                >
                  <a>{"Go to Product page"}</a>
                </Link>
              </div>
              <div style={{ textAlign: "center" }}>
                <img
                  src={props.exhibit.product.image}
                  style={{
                    width: "100%",
                    maxHeight: "50vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default BuyModal;
