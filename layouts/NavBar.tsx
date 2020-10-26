import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import { Avatar, Typography } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";

import { menu } from "../constants/menu";
import { useMapState } from "../context/store";
import AnimatedText from "../components/AnimatedText";

const SecureLS = require("secure-ls");
const { Text } = Typography;

const Logo = require("../images/logo.png");
const Win = require("../images/win.png");
const Coin = require("../images/coin.png");
const Point = require("../images/point.png");

const Fortune = ({ src, amount }) => (
  <div className="flex-1 h-12">
    <div className="flex items-center mr-2">
      <img className="w-6 h-6 rounded-full mr-2" src={src} />
      <div className="text-sm mr-4">
        <p className="text-gray-900 leading-none">
          <AnimatedText value={amount} />
        </p>
      </div>
    </div>
  </div>
);

export default function NavBar() {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const logout = async () => {
    signOut();
    setMapState({
      type: "setUser",
      user: null,
    });

    new SecureLS().remove("user");
  };

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
    <div>
      <nav className="relative flex flex-wrap items-center justify-between navbar-expand-lg px-12 border border-b-1 mb-2">
        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href={"/"}>
              <a className="text-sm font-bold leading-relaxed inline-block py-2 whitespace-no-wrap uppercase text-white">
                <img
                  alt="Exhibia"
                  src={Logo}
                  className="element object-contain w-56 h-auto px-2"
                />
              </a>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuOutlined />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {menu
                .filter((m) => m.role === "user")
                .map((m) => (
                  <li className="nav-item" key={m.path}>
                    <Link href={m.path}>
                      <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                        <Text strong>{m.label}</Text>
                      </a>
                    </Link>
                  </li>
                ))}
              {user &&
                user.role === "admin" &&
                menu
                  .filter((m) => m.role === "admin")
                  .map((m) => (
                    <li className="nav-item" key={m.path}>
                      <Link href={m.path}>
                        <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                          <Text strong>{m.label}</Text>
                        </a>
                      </Link>
                    </li>
                  ))}
            </ul>
            {user && (
              <LogoutOutlined
                onClick={logout}
                className="font-bold text-xl cursor-pointer pl-4"
              />
            )}
          </div>
        </div>
      </nav>

      {user ? (
        <div className="flex flex-row-reverse items-center text-right gap-4">
          <div className="flex">
            <Fortune src={Coin} amount={user.coins} />
            <Fortune src={Point} amount={user.points} />
            <Fortune src={Win} amount={user.wins} />
          </div>
          <Link href={"/profile"}>
            <a>
              <Avatar
                src={user.avatar}
                className="cursor-pointer -mt-6"
                shape={user && user.role === "admin" ? "square" : "circle"}
              />
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
