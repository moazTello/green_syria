import React, { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { BiSolidMessageCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import useStore from "../zustand/useStore";
import MainCard from "../components/MainCard";

const Volunteers = () => {
  const { fetchVolunteersList, volunteersList } = useStore();
  useEffect(() => {
    fetchVolunteersList();
  },[fetchVolunteersList])
  useEffect(() => {
    console.log(volunteersList)
  },[volunteersList])
  const value = 4;
  return (
    <div className="bg-gradient-to-t from-[#f9f9f9] to-[#4CA871] min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex justify-between items-center mt-10 px-5 md:px-10">
          <BiSolidMessageCheck className="text-white text-2xl md:text-6xl"/>
          <p className="text-white text-right w-full text-xl md:text-4xl">
            {" "}
            المتطوعين 👷🏻‍♂️
          </p>
        </div>
        <p className="text-slate-50 text-sm w-full px-8 md:px-16 my-2 md:my-4 md:text-lg text-right">
          {" "}
         هنا يمكنك رؤية كافة المتطوعين و يمكنك إضافة متطوع جديد من خلال إضافة متطوع جديد
        </p>
      </div>
      <Link to="/green_syria/dashboard/addvolunteer" className="my-2 md:my-5 bg-slate-50 w-[80%] text-center rounded-lg p-2 md:p-4 text-sm md:text-lg text-green-600 hover:bg-yellow-50">
       إضافة متطوع جديد 
      </Link>
      <div className="w-full flex justify-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
        >
         {volunteersList.map((volunteer, index) => <MainCard key={index} data={volunteer}/>)}
        </div>
      </div>
    </div>
  );
}

export default Volunteers