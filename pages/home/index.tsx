import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import TopGroceries from "../../containers/TopGroceries";
import Pricing from "../../containers/Pricing";
import AboutUs from "../../containers/AboutUs";
import Impress from "../../containers/Impress";

import ScrollSpyMenu from "../../components/ScrollSpyMenu";

import { Icon } from "@iconify/react";
import menuSharp from "@iconify/icons-ion/menu-sharp";
import closeIcon from "@iconify/icons-ion/close";
import { BackTop } from "antd";
import { FaArrowAltCircleUp } from "react-icons/fa";
import FooterBar from "../../containers/FooterBar";

const menuData = [
  {
    label: "Login",
    path: "/auth/login",
    staticLink: true,
  },
  {
    label: "Register",
    path: "/auth/register",
    staticLink: true,
  },
  {
    label: "Create Grocery",
    path: "/groceries",
    staticLink: true,
  },
  {
    label: "Groceries",
    path: "#top_groceries",
  },
  {
    label: "Pricing",
    path: "#pricing",
  },
  {
    label: "About Us",
    path: "#about",
  },
  {
    label: "Contact us",
    path: "#contact",
  },
];

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="overflow-hidden flex flex-col min-h-screen overflow-x-hidden">
        <TopGroceries key="top_groceries" />
        <AboutUs key="about" />
        <Pricing key="plan" />
        <Impress key="impress" />
        <FooterBar key="footer" />
      </div>
      <BackTop>
        <FaArrowAltCircleUp size={56} className="text-red-500" />
      </BackTop>
      <button
        className="fixed top-8 left-8 text-4xl z-10 text-gray-300 hover:text-white transition ease-in-out duration-150"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? <Icon icon={closeIcon} /> : <Icon icon={menuSharp} />}
      </button>
      <section className="absolute inset-y-0 left-0 max-w-full flex">
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              ref={ref}
              className="py-auto origin-top-right fixed left-0 sm:w-80 min-h-screen rounded-md shadow-xl"
              style={{ backgroundColor: "#b8c11cdd" }}
            >
              <ScrollSpyMenu
                className="mt-24 sm:mt-48 text-white ml-2 sm:ml-8"
                menuItems={menuData}
                drawerClose={true}
              />
            </div>
          )}
        </Transition>
      </section>
    </>
  );
};

export default Home;
