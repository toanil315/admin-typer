import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ MenuIcon, title, pathName, isActive }) {

  return (
    <Link to={pathName}>
      <div
        className={`flex items-end h-14 py-4 px-4 cursor-pointer ${
            isActive ? "text-red-400 ml-3" : "text-gray-700"
        }`}
      >
        <MenuIcon className="h-6 pr-4" />
        <span className="font-semibold">{title}</span>
      </div>
    </Link>
  );
}
