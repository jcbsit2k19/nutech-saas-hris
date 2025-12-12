import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import RCBCLogo from "@assets/logos/rcbc.svg";
import { navRoutes } from "@utils/nav-routes";
import ThemeSwitch from "@components/switches/theme-switch";
import { HiMenuAlt2 } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
import Popup from "@components/addons/popup";
import Typography from "@components/typography/typography";

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const toggleSideBar = () => setShowSideBar(!showSideBar);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar Container */}
      <div
        className={`z-40 fixed inset-y-0 left-0 w-72 
        bg-linear-to-b from-[#4892cf] to-[#005b9f] 
        dark:from-slate-800 dark:to-slate-950
        
        ${showSideBar ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 transition-transform duration-300 overflow-y-auto shadow-xl flex flex-col`}
      >
        {/* Changed bg to transparent so it adopts the parent gradient */}
        <div className="w-full min-h-20 flex items-center px-4 space-x-3 bg-transparent border-b border-white/10">
          {/* <img
            src={RCBCLogo}
            alt="RCBC Logo"
            className="h-10 filter invert brightness-0 drop-shadow-md"
          /> */}
          <p className="text-white font-medium text-base drop-shadow-md leading-tight">
            System Name <br />{" "}
            <span className="text-xs opacity-80">DESCRIPTION</span>
          </p>
        </div>

        {/* Navigation List */}
        <ul className="p-2 mt-4 space-y-2 flex-1">
          {navRoutes.map((section, index) => (
            <div key={section.id || index}>
              {/* Top Level Section */}
              <li
                className={`flex items-center gap-3 text-sm text-white font-medium transition-colors ease-in-out duration-300 
                hover:bg-white/20 dark:hover:bg-white/5 rounded-md p-3 cursor-pointer 
                ${
                  selectedMenu === section.id ? "bg-white/20 shadow-inner" : ""
                }`}
                onClick={() => {
                  if (section.menu?.length > 0) {
                    setSelectedMenu(
                      selectedMenu === section.id ? null : section.id
                    );
                  } else if (section.path) {
                    navigate(section.path);
                    if (window.innerWidth < 768) setShowSideBar(false);
                  }
                }}
              >
                {/* Section Icon */}
                {section.icon && <section.icon className="text-xl" />}

                <span className="flex-1">{section.title}</span>

                {/* Dropdown Indicator */}
                {section.menu?.length > 0 && (
                  <BiChevronDown
                    className={`transition-transform duration-300 text-xl ${
                      selectedMenu === section.id ? "-rotate-180" : ""
                    }`}
                  />
                )}
              </li>

              {/* Sub Menu Items */}
              {section.menu?.length > 0 && (
                <ul
                  className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    selectedMenu === section.id
                      ? "max-h-[1000px] opacity-100 py-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {section.menu.map((subItem, subIndex) => (
                    <li
                      key={subItem.id || subIndex}
                      className="flex items-center gap-3 text-xs text-blue-50 dark:text-slate-300 font-medium 
                      hover:bg-white/20 hover:text-white dark:hover:bg-white/10 
                      rounded-md p-2.5 cursor-pointer ml-3 border-l border-white/20"
                      onClick={() => {
                        if (subItem.path) {
                          navigate(subItem.path);
                          if (window.innerWidth < 768) setShowSideBar(false);
                        }
                      }}
                    >
                      {subItem.icon && <subItem.icon className="text-lg" />}
                      <span>{subItem.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Sign Out Button */}
          <div className="pt-4 mt-2 border-t border-white/10">
            <li
              className="flex items-center gap-3 text-sm text-white font-medium transition-colors ease-in-out duration-300 hover:bg-red-500/80 rounded-md p-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FaSignOutAlt className="text-xl" />
              <span>Sign Out</span>
            </li>
          </div>
        </ul>
      </div>

      {/* Mobile Overlay */}
      {showSideBar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={toggleSideBar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <div
          className="min-h-20 shadow-sm flex items-center px-2 z-20 justify-between md:justify-end transition-colors duration-300
        bg-white dark:bg-slate-900"
        >
          <button
            onClick={toggleSideBar}
            className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300"
          >
            <HiMenuAlt2 className="text-2xl" />
          </button>
          <div className="flex-1">
            <Typography variant="header"></Typography>
          </div>

          <UserProfile />
        </div>

        {/* Dynamic Children */}
        <div className="flex-1 p-2 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-slate-800 dark:text-slate-200 transition-colors duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}

function UserProfile() {
  const navigate = useNavigate();

  return (
    <Popup
      content={
        /* Added bg-white and dark:bg-slate-800 for the container */
        <div className="rounded-md overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-transparent dark:border-slate-700">
          <div className="bg-[#4892cf] dark:bg-slate-900 p-3">
            <h1 className="text-base font-semibold text-white">DEMO USER</h1>
            <h2 className="text-xs font-medium text-blue-100">ADMIN</h2>
          </div>

          <ul className="space-y-1 min-w-72 p-2">
            <li
              onClick={() => {
                navigate("/");
              }}
              /* Added dark mode red hover effects */
              className="transition-all ease-in-out duration-300 flex items-center p-2 gap-2 rounded-md cursor-pointer
              bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600
              dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <GoSignOut className="text-lg" />
              <span className="text-xs">Signout</span>
            </li>

            <li
              className="transition-all ease-in-out duration-300 flex items-center justify-between p-2 gap-2 rounded-md cursor-pointer
              bg-slate-50 text-slate-600 hover:bg-slate-100
              dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <span className="text-xs">Mode</span>
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      }
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <div className="flex items-center justify-center rounded-full h-12 w-12 bg-[#4892cf] shadow-md">
          <span className="text-white font-bold text-base drop-shadow-md">
            D
          </span>
        </div>
        <div className="flex-1 hidden sm:block text-left">
          <h1 className="text-base font-semibold text-slate-500 dark:text-white">
            DEMO USER
          </h1>
          <h2 className="text-xs font-medium text-slate-400">ADMIN</h2>
        </div>
      </div>
    </Popup>
  );
}
