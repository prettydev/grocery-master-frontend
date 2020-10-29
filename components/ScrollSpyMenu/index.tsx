import React from "react";
import { useRouter } from "next/router";
import Scrollspy from "react-scrollspy";
import AnchorLink from "react-anchor-link-smooth-scroll";

const ScrollSpyMenu = ({ className, menuItems, drawerClose, ...props }) => {
  const router = useRouter();

  const scrollItems = [];

  menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const addAllClasses = ["scrollspy__menu"];

  if (className) {
    addAllClasses.push(className);
  }

  const onClick = (path) => {
    router.push(path);
  };

  return (
    <Scrollspy
      items={scrollItems}
      className={addAllClasses.join(" ")}
      componentTag="ul"
      currentClassName="is-current"
      {...props}
    >
      {menuItems.map((menu, index) => (
        <li key={`menu-item-${index}`}>
          <div className="p-4 sm:text-xl">
            {menu.staticLink ? (
              <a onClick={() => onClick(menu.path)}>{menu.label}</a>
            ) : (
              <AnchorLink href={menu.path} offset={0}>
                {menu.label}
              </AnchorLink>
            )}
          </div>
        </li>
      ))}
    </Scrollspy>
  );
};

export default ScrollSpyMenu;
