import React, { ReactNode } from "react";
import { Layout } from "antd";

import NavBar from "./NavBar";
import FooterBar from "./FooterBar";

const { Content } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className="bg-white">
      <NavBar />
      <Content
        className="w-11/12 pt-5 mx-auto -mt-8"
        style={{ minHeight: 500 }}
      >
        {children}
      </Content>
      <FooterBar />
    </Layout>
  );
};

export default MainLayout;
