import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import { Avatar, Typography } from "antd";
import {
  LogoutOutlined,
  LoginOutlined,
  MenuOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { menu } from "../constants/menu";
import { useMapState } from "../context/store";
import AnimatedText from "../components/AnimatedText";
import Logo from "../components/Logo";

const SecureLS = require("secure-ls");
const { Text } = Typography;

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

  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between navbar-expand-lg px-12 border border-b-1 mb-2">
        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href={"/"}>
              <a className="text-sm font-bold leading-relaxed inline-block py-2 whitespace-no-wrap uppercase text-white">
                <Logo />
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
                // user.role === "admin" &&
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
              {!user && (
                <li className="nav-item mx-4" key={"/login"}>
                  <Link href={"/auth/login"}>
                    <a className="flex flex-row items-center gap-2">
                      <LoginOutlined />
                      Login
                    </a>
                  </Link>
                </li>
              )}
              {!user && (
                <li className="nav-item mx-4" key={"/register"}>
                  <Link href={"/auth/register"}>
                    <a className="flex flex-row items-center gap-2">
                      <UserAddOutlined />
                      Register
                    </a>
                  </Link>
                </li>
              )}
            </ul>
            {user && (
              <div className="flex flex-row items-center gap-2">
                <LogoutOutlined
                  onClick={logout}
                  className="font-bold text-xl cursor-pointer pl-4"
                />
                Logout
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
