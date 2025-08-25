import React from "react";
import { Clipboard, Users2, BarChart2, Settings, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveClass } from "../redux/navbar";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: <Clipboard className="size-5 text-blue-500" />,
    to: "/"
  },
  {
    label: "Leads",
    icon: <Users2 className="size-5 text-green-500" />,
    to: "/leads"
  },
  {
    label: "New Lead Form",
    icon: <UserPlus className="size-5 text-orange-500" />,
    to: "/create"
  },
  {
    label: "Account & Settings",
    icon: <Settings className="size-5 text-gray-500" />,
    to: "/profile"
  }
];

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-gray-100 text-black rounded-lg"
      : "hover:bg-base-200 rounded-lg transition";

  return (
    <div className="h-screen border-r border-gray-200 shadow-xl py-10 min-w-[70px] md:min-w-[230px] flex flex-col items-center md:items-stretch">
      <div className="mb-10 hidden md:block">
        <h1 className="text-xl font-semibold text-center leading-tight">
          Lead Management<br />System
        </h1>
      </div>
      <ul className="space-y-1 px-1 md:px-5 gap-3 flex-col flex w-full">
        {sidebarLinks.map(({ label, icon, to }) => (
          <li key={label}>
            <Link
              onClick={() => dispatch(setActiveClass(label))}
              to={to}
              className={`flex items-center gap-0 justify-center md:justify-start p-3 ${activeClass(to)}`}
            >
              {icon}
              <span className="hidden md:inline ml-3">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
