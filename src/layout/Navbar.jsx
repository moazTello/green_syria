import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPersonFillGear } from "react-icons/bs";
import { PiGearFineFill } from "react-icons/pi";
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";

// import { images } from '../../constants/index';
import { RxHamburgerMenu } from "react-icons/rx";
import useStore from "../zustand/useStore";
const Navbar = () => {
  const { user, logoutMaster, logoutOrg } = useStore();
  const navigate = useNavigate();
  const path = useLocation();
  const customPathStyle = "border-green-500";
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleFull, setToggleFull] = useState(false);

  const logout = async () => {
    user.role === "Master" ? await logoutMaster() : await logoutOrg();
    sessionStorage.setItem("accessT", null);
    sessionStorage.setItem("user", null);
    sessionStorage.setItem("organization", null);
    navigate("/");
  };

  return (
    <div
      className="z-50 w-full flex flex-col items-center 
     top-0 rounded-b-lg
     bg-opacity-45 backdrop-blur-sm bg-[#ffffff] pt-0 md:py-2"
    >
      <div className="w-full flex flex-col items-end md:items-center justify-center md:pr-8">
        <div className="hidden md:flex transition delay-150 duration-300 ease-in-out hover:scale-105">
          {/* {user?.role === 'Master' && ( */}
          <>
            <Link
              to="/syria_green/volunteers"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname.includes("/syria_green/volunteers")
                  ? customPathStyle
                  : ""
              }`}
            >
              المتطوعين
            </Link>
            <Link
              to="/syria_green/plant_stores"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname.includes("/syria_green/plant_stores")
                  ? customPathStyle
                  : ""
              }`}
            >
              المشاتل
            </Link>
            <Link
              to="/syria_green/join_requests"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname.includes("/syria_green/join_requests")
                  ? customPathStyle
                  : ""
              }`}
            >
              طلبات الانضمام
            </Link>
            <Link
              to="/syria_green/institutions"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname === "/syria_green/institutions" ? customPathStyle : ""
              }`}
            >
              المؤسسات
            </Link>
          </>
          {/* )} */}

          <button
            onClick={() => setToggleFull((old) => !old)}
            className={`text-green-500 text-3xl ml-5 py-3  cursor-pointer hover:text-green-300`}
          >
            <MdOutlineUnfoldMoreDouble />
          </button>

          {/* {user?.role === 'Master' && ( */}
          <>
            <Link
              to="/syria_green/profile"
              className={`text-green-500 hidden md:flex text-3xl py-3 px-3 ml-5 border-b-2 hover:text-green-300 border-transparent cursor-pointer ${
                path.pathname === "/syria_green/profile"
                  ? customPathStyle
                  : ""
              }`}
            >
              <PiGearFineFill />
            </Link>
          </>
          {/* )} */}
          <button
            onClick={logout}
            className={`text-green-500 text-3xl ml-5 py-3  cursor-pointer hover:text-green-300`}
          >
            <HiOutlineLogout />
          </button>
        </div>
        <div
          className={`hidden ${
            toggleFull ? "md:flex translate-y-1" : ""
          } transition delay-150 duration-300 ease-in-out hover:scale-105`}
        >
          {/* {user?.role === 'Master' && ( */}
          <>
            <Link
              to="/syria_green/traffics"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname.includes("/syria_green/traffics")
                  ? customPathStyle
                  : ""
              }`}
            >
              الزيارات
            </Link>
            <Link
              to="/syria_green/addmasteradmin"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname.includes("/syria_green/addmasteradmin")
                  ? customPathStyle
                  : ""
              }`}
            >
              إضافة آدمن
            </Link>
            <Link
              to="/syria_green/categories"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname.includes("/syria_green/categories")
                  ? customPathStyle
                  : ""
              }`}
            >
              المدونة
            </Link>
            <Link
              to="/syria_green/works"
              className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
                path.pathname === "/syria_green/works" ? customPathStyle : ""
              }`}
            >
              الأعمال
            </Link>
          </>
          {/* )} */}
        </div>
        <button
          onClick={() => setToggleNav((old) => !old)}
          className="mx-3 rounded-lg hover:bg-white p-2 hover:text-primary text-green-500 flex md:hidden"
        >
          <RxHamburgerMenu size={18} />
        </button>
      </div>
      <div
        className={`flex-col w-full items-center z-10 md:hidden ${
          toggleNav ? "flex" : "hidden"
        }`}
      >
        <>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/traffics"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname.includes("/syria_green/traffics")
                ? customPathStyle
                : ""
            }`}
          >
            الزيارات
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/addmasteradmin"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname.includes("/syria_green/addmasteradmin")
                ? customPathStyle
                : ""
            }`}
          >
            إضافة آدمن
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/join_requests"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname.includes("/syria_green/join_requests")
                ? customPathStyle
                : ""
            }`}
          >
            طلبات الانضمام
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/institutions"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname === "/syria_green/institutions" ? customPathStyle : ""
            }`}
          >
            المؤسسات
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/plant_stores"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname === "/syria_green/plant_stores" ? customPathStyle : ""
            }`}
          >
            المشاتل
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/volunteers"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname === "/syria_green/volunteers" ? customPathStyle : ""
            }`}
          >
            المتطوعين
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/categories"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname === "/syria_green/categories" ? customPathStyle : ""
            }`}
          >
            المدونة
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/works"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname === "/syria_green/works" ? customPathStyle : ""
            }`}
          >
            الأعمال
          </Link>
          <Link
            onClick={() => setToggleNav((old) => !old)}
            to="/syria_green/profile"
            className={`text-green-500 text-sm md:text-lg mx-3 my-2 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
              path.pathname === "/syria_green/profile" ? customPathStyle : ""
            }`}
          >
            الملف الشخصي
          </Link>
        </>
        {/* )} */}
        <button
          onClick={logout}
          className={`text-green-500 text-sm md:text-lg mx-3 my-2 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300`}
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Navbar;
