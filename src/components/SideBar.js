import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import logo from "../assets/img//typer-logo.png";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

const menuItemList = [
  {
    MenuIcon: HomeIcon,
    title: "Dashboard",
    pathName: "/",
  },
  {
    MenuIcon: PlusIcon,
    title: "Create Post",
    pathName: "/createpost",
  },
  {
    MenuIcon: PlusIcon,
    title: "Publish",
    pathName: "/publish",
  },
];

function SideBar(props) {
  const {pathname} = useLocation();
  const [positionActive, setPositionActive] = useState(0);

  useEffect(() => {
    const constuctorPathName = pathname.split("/")
    let pathnamePrefix = "/" + constuctorPathName[1];
    setPositionActive(menuItemList.findIndex(item => item.pathName === pathnamePrefix))
  }, [pathname])

  return (
    <div className="fixed z-30 top-0 w-1/5 min-h-full border-r border-gray-300 shadow-md py-2">
      <Link to="/">
        <div className="p-4 border-b-4 border-gray-50 shadow-sm mb-3">
          <img className="h-11" src={logo} alt="logo" />
        </div>
      </Link>
      <div className="pl-[0.5px] relative">
        <div
          style={{ transform: `translateY(${positionActive * 56}px)` }}
          className="absolute h-14 w-1 bg-red-500 transition duration-200 ease-out"
        ></div>
        {menuItemList?.map((menuItem, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setPositionActive(index);
              }}
            >
              <MenuItem {...menuItem} isActive={positionActive === index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(SideBar);
