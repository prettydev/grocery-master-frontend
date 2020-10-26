import React from "react";
import { Col, Row, List, Typography, Collapse } from "antd";
import ImageGallery from "react-image-gallery";
import ImageMagnifier from "./ImageMagnifier";
import { IProduct } from "../constants/types";

const { Panel } = Collapse;
const { Text } = Typography;
const { Item } = List;

export default function ProductView({
  product,
  price,
  type = "normal",
}: {
  product: IProduct;
  price: string;
  type?: string;
}) {
  const Attributes = () => {
    return (
      <>
        {type !== "simple" && (
          <Collapse className="mt-8">
            <Panel header="Product Summary" key="1">
              <Row>
                <Col span={12}>{"Price"}</Col>
                <Col span={12}>
                  <Text strong>{price}</Text>
                </Col>
              </Row>
              {product.specifications.map((spec, idx) => (
                <Row key={idx}>
                  <Col span={12}>{spec.name}</Col>
                  <Col span={12}>{spec.value}</Col>
                </Row>
              ))}
            </Panel>
            <Panel header="Product Description" key="2">
              <List
                size="small"
                dataSource={product.feature_bullets}
                renderItem={(item) => <Item>{item}</Item>}
              />
            </Panel>
          </Collapse>
        )}
      </>
    );
  };

  const properties = {
    thumbnailPosition: "bottom",
    useBrowserFullscreen: false,
    showPlayButton: false,
    showNav: false,
    autoPlay: true,
    // renderItem: (item) => <ImageMagnifier {...item} />,
    renderItem: (item) => (
      <img
        src={item.original}
        style={{ height: "50vh" }}
        className="object-cover w-full border-green-700 border border-dashed rounded-md"
      />
    ),
    renderThumbInner: (item) => (
      <img src={item.thumbnail} className="object-cover w-full h-16" />
    ),
    items: product.images.map((image) => ({
      original: image.link,
      thumbnail: image.link,
    })),
    sizes: "(max-width: 600px) 200px, 50vw",
  };

  return (
    <div className="flex flex-col mt-4">
      <ImageGallery {...properties} />
      <Attributes />
    </div>
  );
}
