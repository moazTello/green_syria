import React, { useEffect, useState } from "react";
import { BiSolidMessageCheck } from "react-icons/bi";
import useStore from "../zustand/useStore";
import WaitingPlantVolun from "../components/WaitingPlantVolun";

const JoinRequests = () => {
  const { fetchPlantStoresWaitingList, plantStoresWaitingList, fetchVolunteersWaitingList, volunteersWaitingList } = useStore();
  useEffect(() => {
    fetchPlantStoresWaitingList();
    fetchVolunteersWaitingList();
  }, [fetchPlantStoresWaitingList, fetchVolunteersWaitingList]);
      const [tag, setTag] = useState(0);
  console.log(plantStoresWaitingList)
  const value = 4;
  return (
    <div className="bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex justify-between items-center mt-10 px-5 md:px-10">
          <BiSolidMessageCheck className="text-white text-2xl md:text-6xl" />
          <p className="text-white fontReg text-right w-full text-xl md:text-4xl">
            {" "}
             طلبات الإنضمام <span className="p-2 rounded-lg mx-1">👷🏻‍♂️</span>
          </p>
        </div>
        <p className="text-slate-50 fontReg text-sm w-full px-8 md:px-16 my-2 md:my-4 md:text-lg text-right">
          {" "}
          هنا يمكنك رؤية كافة طلبات الإنضمام
        </p>
      </div>
 
      <div className="flex fontReg text-sm md:text-lg items-center border-t-2 border-yellow-200 w-[90%] justify-center my-5">
        <button
          onClick={() => setTag(0)}
          className={` p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 0
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          المتطوعين
        </button>
        <button
          onClick={() => setTag(1)}
          className={`p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 1
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          المشاتل
        </button>
      </div>
      {tag === 1 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك طلبات الإنضمام الموجهة من المشاتل و التي يمكنك قبولها او رفضها مع ذكر سبب الرفض
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {plantStoresWaitingList?.length > 0 &&
                plantStoresWaitingList?.map((tree, index) => (
                  <WaitingPlantVolun deleted={true} key={index} data={tree} />
                ))}
            </div>
          </div>
        </>
      )}
      {tag === 0 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك طلبات الإنضمام الموجهة من المتطوعين و التي يمكنك قبولها او رفضها مع ذكر سبب الرفض
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
               {volunteersWaitingList?.length > 0 &&
                volunteersWaitingList?.map((tree, index) => (
                  <WaitingPlantVolun deleted={true} key={index} data={tree} type="volun" />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JoinRequests;
