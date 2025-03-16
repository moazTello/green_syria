import { images } from "../constants";
import { IoArrowUndoOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
const WaitingPlantVolun = ({ data, type }) => {
  return (
    <div className="w-64 h-96 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] flex flex-col justify-start items-center m-2 md:my-4 float-right shadow-3xl shadow-gray-300">
      <img
        src={data.logo === "no image" ? images.homeImage : data.logo}
        className={`${
          type === "volunteer"
            ? "w-36 h-36 bg-no-repeat bg-center bg-cover m-2 rounded-full"
            : type === "admin"
            ? "w-36 h-36 bg-no-repeat bg-center bg-cover mt-5 mb-3 rounded-full"
            : "w-56 h-28 bg-no-repeat bg-center bg-cover m-5 rounded-t-lg"
        }`}
        alt=""
      />
      <div className="w-full flex justify-between items-center">
        <Link
          // to={`${
          //   type === "volunteer"
          //     ? `/green_syria/dashboard/volunteers/${data.id}`
          //     : type === "admin"
          //     ? `/green_syria/dashboard/institutions/${data.id}`
          //     : `/green_syria/dashboard/plant_stores/${data.id}`
          // } `}
          to={`${data?.role === "plan" ? `/green_syria/dashboard/join_requests/${data?.id}` : `/green_syria/dashboard/join_requests/volunteer/${data?.id}`}`}
          className="bg-white text-green-600 hover:text-white border-[1px] border-green-600 hover:bg-green-600 p-1 rounded-r-xl"
        >
          <IoArrowUndoOutline className="text-xl md:text-3xl ml-5 cursor-pointer" />
        </Link>
        <p className="text-right fontReg w-full text-green-700 text-lg pr-5">
          {data?.name}
        </p>
      </div>
      <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-3"></div>
      {data?.orgName && (
        <p className="text-right fontReg w-full text-green-600 text-sm md:text-lg px-5 pb-1 overflow-auto">
          {data?.orgName} 🏢
        </p>
      )}
      {data?.email && (
        <div className="flex justify-end items-center w-full px-5">
          <p className="text-right fontReg w-full text-green-600 text-sm md:text-lg px-2 overflow-auto">
            {data?.email}
          </p>
          <MdOutlineMailOutline className="w-6 h-4 md:w-7 md:h-6 text-green-700" />
        </div>
      )}
      {data?.phone && (
        <div className="flex justify-end items-center w-full px-5">
          <p className="text-right fontReg w-full text-green-600 text-sm md:text-lg px-2 overflow-auto">
            {data?.phone}
          </p>
          <FaPhone className="w-6 h-3 md:w-7 md:h-4 text-green-700" />
        </div>
      )}
    </div>
  );
};

export default WaitingPlantVolun;
