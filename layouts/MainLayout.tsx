import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMeasure } from "react-use";
import { Layout } from "antd";
import Overlay from "react-overlay-component";

import { useMapState } from "../context/store";
import NavBar from "./NavBar";
import FooterBar from "./FooterBar";
import FundCarousel from "../layouts/FundCarousel";
import ExhibiaChat from "../components/ExhibiaChatBox";
import Particles from "../components/Particles";
import Auth from "../pages/auth";
import useUser from "../hooks/useUser";

const { Content } = Layout;

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const user = useUser();

  const [isOpen, setOverlay] = useState(false);
  const closeOverlay = () => setOverlay(false);

  const configs = {
    animate: true,
    clickDismiss: false,
    escapeDismiss: false,
    showCloseIcon: false,
    focusOutline: true,
  };

  useEffect(() => {
    setOverlay(user ? false : true);
  }, [user]);

  return (
    <Layout className="bg-white">
      <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
        <Auth />
      </Overlay>
      <NavBar />
      <Content
        className="w-11/12 pt-5 mx-auto -mt-8"
        style={{ minHeight: 500 }}
      >
        {children}
      </Content>
      {(!user ||
        (user &&
          router.pathname !== "/products" &&
          router.pathname !== "/completed")) && (
        <div className="w-11/12 mx-auto">
          <FundCarousel />
        </div>
      )}
      <FooterBar />
      {user && <ExhibiaChat channel="Exhibia" />}
    </Layout>
  );
}
