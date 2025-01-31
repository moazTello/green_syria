import React from "react";
import { images } from "../constants";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
const CategoryItem = () => {
  return (
    <div className="w-64 h-96 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] hover:bg-yellow-50 flex flex-col justify-start items-center m-2 md:my-4 float-right pb-2">
      <img src={images.homeImage} className="w-56 h-42 m-5 rounded-t-lg" alt="" />
      <div className="w-full flex justify-between items-center">
        <Link to="/syria_green/categories/2">
          <IoArrowUndoOutline className="text-xl md:text-3xl ml-5 text-green-600 cursor-pointer hover:text-yellow-500" />
        </Link>
        <p className="text-right w-full text-green-700 text-lg md:text-2xl pr-5">
          السياسة
        </p>
      </div>
      <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-3"></div>
      <p className="text-right  w-full text-green-600 text-sm md:text-lg px-5 pb-3 overflow-auto">
        مقالات تحمل الطابع السياسي التوعوي الذي يساهم في تثقيف الفئة العاملة
      </p>
      <div className="w-full flex justify-center items-center mt-4">
      <Link to="/syria_green/categories/2">
          <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 text-red-600 cursor-pointer hover:text-yellow-500" />
        </Link>
        <p className="text-green-600">
          | |
        </p>
        <Link to="/syria_green/categories/2">
          <CiEdit className="text-xl md:text-2xl mx-4 text-blue-600 cursor-pointer hover:text-yellow-500" />
        </Link>

      </div>
    </div>
  );
};

export default CategoryItem;
