import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "antd";

import NavBar from "./NavBar";
import { useMapState } from "../context/store";
import FooterBar from "../containers/FooterBar";

const SecureLS = require("secure-ls");

const { Content } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  useEffect(() => {
    if (!user) {
      if (
        router.pathname !== "/auth/login" &&
        router.pathname !== "/auth/register"
      ) {
        router.push("/auth/login");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      return;
    }
    const secureUser = new SecureLS().get("user");
    if (!secureUser) {
      return;
    }
    setMapState({
      type: "setUser",
      user: secureUser,
    });
  }, []);

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
