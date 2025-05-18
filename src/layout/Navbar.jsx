// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { HiOutlineLogout } from "react-icons/hi";
// // import { BsPersonFillGear } from "react-icons/bs";
// import { PiGearFineFill } from "react-icons/pi";
// import { MdOutlineUnfoldMoreDouble } from "react-icons/md";

// // import { images } from '../../constants/index';
// import { RxHamburgerMenu } from "react-icons/rx";
// import useStore from "../zustand/useStore";
// const Navbar = () => {
//   const { user, logoutMaster, logoutOrg } = useStore();
//   const navigate = useNavigate();
//   const path = useLocation();
//   const customPathStyle = "border-green-500";
//   const [toggleNav, setToggleNav] = useState(false);
//   const [toggleFull, setToggleFull] = useState(false);

//   const logout = async () => {
//     user.role === "Master" ? await logoutMaster() : await logoutOrg();
//     sessionStorage.setItem("accessT", null);
//     sessionStorage.setItem("user", null);
//     sessionStorage.setItem("organization", null);
//     navigate("/");
//   };

//   return (
//     <div
//       className="z-50 w-full flex flex-col items-center
//      top-0 rounded-b-lg
//      bg-opacity-45 backdrop-blur-sm bg-[#ffffff] pt-0 md:py-2"
//     >
//       <div className="w-full flex flex-col items-end md:items-center justify-center md:pr-8">
//         <div className="hidden md:flex transition delay-150 duration-300 ease-in-out hover:scale-105">
//           {/* {user?.role === 'Master' && ( */}
//           <>
//             <Link
//               to="/green_syria/dashboard/volunteers"
//               className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                 path.pathname.includes("/green_syria/dashboard/volunteers")
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               المتطوعين
//             </Link>
//             <Link
//               to="/green_syria/dashboard/plant_stores"
//               className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                 path.pathname.includes("/green_syria/dashboard/plant_stores")
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               المشاتل
//             </Link>
//             <Link
//               to="/green_syria/dashboard/join_requests"
//               className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                 path.pathname.includes("/green_syria/dashboard/join_requests")
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               طلبات الانضمام
//             </Link>
//             <Link
//               to="/green_syria/dashboard/institutions"
//               className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                 path.pathname === "/green_syria/dashboard/institutions"
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               المؤسسات
//             </Link>
//           </>
//           {/* )} */}

//           <button
//             onClick={() => setToggleFull((old) => !old)}
//             className={`text-green-500 text-3xl ml-5 py-3  cursor-pointer hover:text-green-300`}
//           >
//             <MdOutlineUnfoldMoreDouble />
//           </button>

//           {/* {user?.role === 'Master' && ( */}
//           <>
//             <Link
//               to="/green_syria/dashboard/profile"
//               className={`text-green-500 hidden md:flex text-3xl py-3 px-3 ml-5 border-b-2 hover:text-green-300 border-transparent cursor-pointer ${
//                 path.pathname === "/green_syria/dashboard/profile"
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               <PiGearFineFill />
//             </Link>
//           </>
//           {/* )} */}
//           <button
//             onClick={logout}
//             className={`text-green-500 text-3xl ml-5 py-3  cursor-pointer hover:text-green-300`}
//           >
//             <HiOutlineLogout />
//           </button>
//         </div>
//         <div
//           className={`hidden ${
//             toggleFull ? "md:flex translate-y-1" : ""
//           } transition delay-150 duration-300 ease-in-out hover:scale-105`}
//         >
//           {user?.user?.role === "admin" && (
//             <>
//               <Link
//                 to="/green_syria/dashboard/traffics"
//                 className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                   path.pathname.includes("/green_syria/dashboard/traffics")
//                     ? customPathStyle
//                     : ""
//                 }`}
//               >
//                 الزيارات
//               </Link>
//               <Link
//                 to="/green_syria/dashboard/addmasteradmin"
//                 className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                   path.pathname.includes(
//                     "/green_syria/dashboard/addmasteradmin"
//                   )
//                     ? customPathStyle
//                     : ""
//                 }`}
//               >
//                 إضافة آدمن
//               </Link>
//             </>
//           )}
//           <Link
//             to="/green_syria/dashboard/categories"
//             className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//               path.pathname.includes("/green_syria/dashboard/categories")
//                 ? customPathStyle
//                 : ""
//             }`}
//           >
//             المدونة
//           </Link>
//           <Link
//             to="/green_syria/dashboard/works"
//             className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//               path.pathname === "/green_syria/dashboard/works"
//                 ? customPathStyle
//                 : ""
//             }`}
//           >
//             الأعمال
//           </Link>
//           <Link
//             to="/green_syria/dashboard/events"
//             className={`text-green-500 text-sm md:text-lg mx-3 py-3 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//               path.pathname === "/green_syria/dashboard/events"
//                 ? customPathStyle
//                 : ""
//             }`}
//           >
//             الأحداث
//           </Link>
//         </div>
//         <button
//           onClick={() => setToggleNav((old) => !old)}
//           className="mx-3 rounded-lg hover:bg-white p-2 hover:text-primary text-green-500 flex md:hidden"
//         >
//           <RxHamburgerMenu size={18} />
//         </button>
//       </div>
//       <div
//         className={`flex-col w-full items-center z-10 md:hidden ${
//           toggleNav ? "flex" : "hidden"
//         }`}
//       >
//         {user?.user?.role === "admin" && (
//           <>
//             <Link
//               onClick={() => setToggleNav((old) => !old)}
//               to="/green_syria/dashboard/traffics"
//               className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                 path.pathname.includes("/green_syria/dashboard/traffics")
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               الزيارات
//             </Link>
//             <Link
//               onClick={() => setToggleNav((old) => !old)}
//               to="/green_syria/dashboard/addmasteradmin"
//               className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//                 path.pathname.includes("/green_syria/dashboard/addmasteradmin")
//                   ? customPathStyle
//                   : ""
//               }`}
//             >
//               إضافة آدمن
//             </Link>
//           </>
//         )}
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/join_requests"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname.includes("/green_syria/dashboard/join_requests")
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           طلبات الانضمام
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/institutions"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/institutions"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           المؤسسات
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/plant_stores"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/plant_stores"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           المشاتل
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/volunteers"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/volunteers"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           المتطوعين
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/categories"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/categories"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           المدونة
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/works"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/works"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           الأعمال
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/events"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/events"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           الأحداث
//         </Link>
//         <Link
//           onClick={() => setToggleNav((old) => !old)}
//           to="/green_syria/dashboard/profile"
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300 ${
//             path.pathname === "/green_syria/dashboard/profile"
//               ? customPathStyle
//               : ""
//           }`}
//         >
//           الملف الشخصي
//         </Link>
//         <button
//           onClick={logout}
//           className={`text-green-500 text-sm md:text-lg mx-3 my-2 px-2 border-b-2 border-transparent cursor-pointer hover:text-green-300`}
//         >
//           تسجيل الخروج
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { PiGearFineFill } from "react-icons/pi";
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import useStore from "../zustand/useStore";

const Navbar = () => {
  const { user, logoutAdmin } = useStore();
  const navigate = useNavigate();
  const path = useLocation();
  const customPathStyle = "border-green-600 bg-green-500 text-white";
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleFull, setToggleFull] = useState(false);
  const [toggleadv, setToggleadv] = useState(false);

  const logout = async () => {
    // user.role === "Master" ? await logoutMaster() : await logoutOrg();
    await logoutAdmin();
    sessionStorage.setItem("accessT", null);
    sessionStorage.setItem("user", null);
    navigate("/green_syria");
  };

  return (
    <div className="z-50 w-full fontReg bg-[#1a202c] relative text-white shadow-lg backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <Link
            to="/green_syria/dashboard/"
            className="text-2xl font-semibold text-green-400 hover:text-green-300 transition duration-300"
          >
            Green Syria
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/green_syria/dashboard/volunteers"
            className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
              path.pathname.includes("/green_syria/dashboard/volunteers")
                ? customPathStyle
                : "text-green-300"
            }`}
          >
            المتطوعين
          </Link>
          <Link
            to="/green_syria/dashboard/plant_stores"
            className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
              path.pathname.includes("/green_syria/dashboard/plant_stores")
                ? customPathStyle
                : "text-green-300"
            }`}
          >
            المشاتل
          </Link>
          <Link
            to="/green_syria/dashboard/join_requests"
            className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
              path.pathname.includes("/green_syria/dashboard/join_requests")
                ? customPathStyle
                : "text-green-300"
            }`}
          >
            طلبات الانضمام
          </Link>
          <Link
            to="/green_syria/dashboard/institutions"
            className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
              path.pathname.includes("/green_syria/dashboard/institutions")
                ? customPathStyle
                : "text-green-300"
            }`}
          >
            المؤسسات
          </Link>
          <button
            onClick={() => setToggleFull((prev) => !prev)}
            className={`text-2xl px-1 py-2 transition duration-300 hover:text-green-400 rounded-lg ${
              toggleFull ? "text-green-400 bg-white" : "text-orange-500"
            }`}
          >
            <MdOutlineUnfoldMoreDouble />
          </button>
          <Link
            to="/green_syria/dashboard/profile"
            className={`text-3xl transition duration-300 p-2 rounded-md hover:text-green-400 
              ${
                path.pathname === "/green_syria/dashboard/profile"
                  ? customPathStyle
                  : "text-orange-500"
              }
            `}
          >
            <PiGearFineFill />
          </Link>
          <button
            onClick={logout}
            className="text-3xl transition duration-300 hover:text-green-400 text-orange-500"
          >
            <HiOutlineLogout />
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setToggleNav((prev) => !prev)}
            className="text-3xl p-2 text-white hover:bg-green-500 rounded-md"
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
      {toggleFull && (
        <div
          className={`${
            toggleadv
              ? "max-w-screen-xl mx-auto hidden md:flex justify-between items-center py-4 px-6"
              : "w-[20%] absolute z-50 right-0 border-t-4 border-orange-300 rounded-bl-2xl hidden md:flex md:flex-col justify-end items-end py-4 px-6 bg-[#1a202c]"
          }`}
        >
          <div
            className={`${
              toggleadv
                ? "flex items-center justify-center w-32"
                : "flex items-center justify-center w-full"
            } `}
          >
            ⇠
            <button
              onClick={() => setToggleadv((old) => !old)}
              className="text-4xl font-semibold bg-white border-green-500 border-2 p-1 my-3 hover:scale-125 rounded-lg transition duration-300"
            >
              🪴
            </button>
            ⇢
          </div>
          <div
            className={`${
              toggleadv
                ? "hidden md:flex space-x-6 items-center"
                : "hidden md:flex md:flex-col space-y-3 w-full items-center"
            }`}
          >
            {user?.user?.role === "admin" && (
              <>
                <Link
                  // onClick={() => setToggleFull((old) => !old)}
                  to="/green_syria/dashboard/traffics"
                  className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                    path.pathname.includes("/green_syria/dashboard/traffics")
                      ? customPathStyle
                      : "text-green-300"
                  }`}
                >
                  الزيارات
                </Link>
                <Link
                  // onClick={() => setToggleFull((old) => !old)}
                  to="/green_syria/dashboard/addmasteradmin"
                  className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                    path.pathname.includes(
                      "/green_syria/dashboard/addmasteradmin"
                    )
                      ? customPathStyle
                      : "text-green-300"
                  }`}
                >
                  إضافة آدمن
                </Link>
              </>
            )}
            <Link
              // onClick={() => setToggleFull((old) => !old)}
              to="/green_syria/dashboard/categories"
              className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                path.pathname.includes("/green_syria/dashboard/categories")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              المدونة
            </Link>
            <Link
              // onClick={() => setToggleFull((old) => !old)}
              to="/green_syria/dashboard/works"
              className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                path.pathname.includes("/green_syria/dashboard/works")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              الأعمال
            </Link>
            <Link
              // onClick={() => setToggleFull((old) => !old)}
              to="/green_syria/dashboard/addwork"
              className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                path.pathname.includes("/green_syria/dashboard/addwork")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              إضافة عمل
            </Link>
            <Link
              // onClick={() => setToggleFull((old) => !old)}
              to="/green_syria/dashboard/trees"
              className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                path.pathname.includes("/green_syria/dashboard/trees")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              الأشجار
            </Link>
            <Link
              // onClick={() => setToggleFull((old) => !old)}
              to="/green_syria/dashboard/events"
              className={`text-lg font-small px-2 py-2 rounded-md transition-all duration-300 hover:bg-green-500 hover:text-white ${
                path.pathname.includes("/green_syria/dashboard/events")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              الأحداث
            </Link>
          </div>
        </div>
      )}
      <div
        className={`md:hidden ${
          toggleNav ? "block" : "hidden"
        } bg-[#2d3748] text-white p-6 space-y-4 `}
      >
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/institutions"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname === "/green_syria/dashboard/institutions"
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          المؤسسات
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/join_requests"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/join_requests")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          طلبات الانضمام
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/plant_stores"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/plant_stores")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          المشاتل
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/volunteers"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/volunteers")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          المتطوعين
        </Link>
        {user?.user?.role === "admin" && (
          <>
            <Link
              onClick={() => setToggleNav(false)}
              to="/green_syria/dashboard/addmasteradmin"
              className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
                path.pathname.includes("/green_syria/dashboard/addmasteradmin")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              إضافة آدمن
            </Link>
            <Link
              onClick={() => setToggleNav(false)}
              to="/green_syria/dashboard/traffics"
              className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
                path.pathname.includes("/green_syria/dashboard/traffics")
                  ? customPathStyle
                  : "text-green-300"
              }`}
            >
              الزيارات
            </Link>
          </>
        )}
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/events"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/events")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          الأحداث
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/works"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/works")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          الأعمال
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/addwork"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/addwork")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          إضافة عمل
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/trees"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/trees")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          الأشجار
        </Link>

        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/categories"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/categories")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          المدونة
        </Link>
        <Link
          onClick={() => setToggleNav(false)}
          to="/green_syria/dashboard/profile"
          className={`block px-4 py-2 rounded-md transition duration-300 text-right ${
            path.pathname.includes("/green_syria/dashboard/profile")
              ? customPathStyle
              : "text-green-300"
          }`}
        >
          الملف الشخصي
        </Link>
        <button
          onClick={logout}
          className="w-full px-4 py-2 rounded-md transition duration-300 hover:bg-green-500 hover:text-white"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Navbar;
