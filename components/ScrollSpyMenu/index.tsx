import React from "react";
import Scrollspy from "react-scrollspy";
import AnchorLink from "react-anchor-link-smooth-scroll";

const ScrollSpyMenu = ({ className, menuItems, drawerClose, ...props }) => {
  const scrollItems = [];

  menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const addAllClasses = ["scrollspy__menu"];

  if (className) {
    addAllClasses.push(className);
  }

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
          {menu.staticLink ? (
            <a href={menu.path}>{menu.label}</a>
          ) : (
            <div className="p-4 sm:text-xl">
              <AnchorLink href={menu.path} offset={0}>
                {menu.label}
              </AnchorLink>
            </div>
          )}
        </li>
      ))}
    </Scrollspy>
  );
};

export default ScrollSpyMenu;
