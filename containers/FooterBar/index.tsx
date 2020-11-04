import React from "react";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Logo from "../../components/Logo";
import { Col, Layout, Row, Space, Typography } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

const FooterBar = () => {
  return (
    <div id="footer" className="flex flex-col-reverse sm:flex-row bg-gray-100">
      <div className="flex flex-col w-4/5 justify-center mx-auto">
        <div className="flex flex-row w-full justify-around gap-8 my-20">
          <div className="w-full mx-auto flex justify-center">
            <div className="w-4/5 flex flex-col gap-4">
              <Logo />
              <p>
                Whether you are running a single grocery store, a food
                supermarket chain or if you are responsible for the IT
                department of a food retailer have a look at our Grosery
                Commerce Software. We think you’ll be impressed.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex flex-col w-1/2 gap-2">
              <div className="text-2xl font-semibold">Pages</div>
              <div>Home</div>
              <div>Join us</div>
              <div>Pricing</div>
              <div>Terms & Conditions</div>
              <div>Privacy Policy</div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center">
            <div className="flex flex-col w-4/5 gap-2">
              <div className="text-2xl font-semibold">Contact</div>
              <div className="text-red-500 flex flex-row text-lg items-center gap-4">
                <AiOutlineMail />
                <span>hello@byebyeGROCERY.com</span>
              </div>
              <div className="text-red-500 flex flex-row text-lg items-center gap-4">
                <FaPhone />
                <span>+44 7920 800082</span>
              </div>
              <div>570 Glenferrie Road</div>
              <div>Hawthorn, Victoria 3143</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-around mb-12 w-full">
          <div>
            <Text>
              <Space size="large">
                <Link href={"/about"}>
                  <a target="_blank">Licenses</a>
                </Link>
                <span>@Copyright powered by byebyeGROCERY</span>
              </Space>
            </Text>
          </div>
          <div>
            <Space size="large">
              <a href={"https://twitter.com/"} target="_new">
                <TwitterSquareFilled style={{ fontSize: 22 }} />
              </a>
              <a href={"https://www.facebook.com/"} target="_new">
                <FacebookFilled style={{ fontSize: 22 }} />
              </a>
              <a href={"https://www.instagram.com/"} target="_new">
                <InstagramFilled style={{ fontSize: 22 }} />
              </a>
              <a href={"https://www.youtube.com/"} target="_new">
                <YoutubeOutlined style={{ fontSize: 22 }} />
              </a>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
