import React, { useEffect } from "react";
import { BiSolidMessageCheck } from "react-icons/bi";
import useStore from "../zustand/useStore";
import MainCard from "../components/MainCard";

const Admins = () => {
  const { fetchAdminsList, AdminsList } = useStore();
  useEffect(() => {
    fetchAdminsList();
  }, [fetchAdminsList]);
  
  const value = 4;
  return (
    <div className="bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex justify-between items-center mt-10 px-5 md:px-10">
          <BiSolidMessageCheck className="text-white text-2xl md:text-6xl" />
          <p className="text-white fontReg text-right w-full text-xl md:text-4xl">
            المؤسسات 🏢
          </p>
        </div>
        <p className="text-slate-50 fontReg text-sm w-full px-8 md:px-16 my-2 md:my-4 md:text-lg text-right">
          هنا يمكنك رؤية كافة المؤسسات
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
        >
          {/* {AdminsList?.allAdminAss?.length > 0 &&
           AdminsList?.allAdminAss?.map((admin, index) => (
              <MainCard type="admin" key={index} data={admin} />
            ))} */}
            {AdminsList?.allAdmin?.length > 0 &&
           AdminsList?.allAdmin?.map((admin, index) => (
              <MainCard type="adminmaster" key={index} data={admin} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admins;
