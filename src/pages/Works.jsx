import React, { useEffect, useState } from "react";
import { BiSolidMessageCheck } from "react-icons/bi";
import useStore from "../zustand/useStore";
import WorkItem from "../components/WorkItem";

const Works = () => {
  const { fetchWorksList, worksList } = useStore();
  useEffect(() => {
    fetchWorksList();
  }, [fetchWorksList]);
  const [tag, setTag] = useState(0);
  const value = 4;
  console.log(worksList);
  return (
    <div className="bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex justify-between items-center mt-10 px-5 md:px-10">
          <BiSolidMessageCheck className="text-white text-2xl md:text-6xl" />
          <p className="text-white fontReg text-right w-full text-xl md:text-4xl">
            {" "}
            الأعمال ⚒️
          </p>
        </div>
        <p className="text-slate-50 fontReg text-sm w-full px-8 md:px-16 my-2 md:my-4 md:text-lg text-right">
          {" "}
          هنا يمكنك رؤية كافة الأعمال
        </p>
      </div>
      {/* <Link
        to="/green_syria/dashboard/volunteers/addvolunteer"
        className="my-2 md:my-5 fontReg bg-slate-50 w-[80%] text-center rounded-lg p-2 md:p-4 text-sm md:text-lg text-green-600 hover:bg-yellow-50"
      >
        إضافة عمل جديد
      </Link> */}
      <div className="flex fontReg text-sm md:text-lg items-center border-t-2 border-yellow-200 w-[90%] justify-center my-5">
        <button
          onClick={() => setTag(0)}
          className={` p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 0
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          قيد الانتظار
        </button>
        <button
          onClick={() => setTag(1)}
          className={`p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 1
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          غير منجزة
        </button>
        <button
          onClick={() => setTag(2)}
          className={`p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 2
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          قيد الانجاز
        </button>
        <button
          onClick={() => setTag(3)}
          className={`p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 3
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          المنجزة
        </button>
      </div>

      {tag === 3 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك الأعمال المسندة الى متطوع و هي اعمال منجزة و التي لا
            يمكنك حذفها
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {worksList?.done_works?.length > 0 &&
                worksList?.done_works?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )}

      {tag === 2 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك الأعمال المسندة الى متطوع و هي غير منجزة بعد و التي لا
            يمكنك حذفها
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {worksList?.false_works?.length > 0 &&
                worksList?.false_works?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )}

      {tag === 1 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك الأعمال المسندة الى متطوع و في انتظار قبولها من قبله او
            رفضها وهي غير منجزة و التي لا يمكنك حذفها
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {worksList?.pindding_works?.length > 0 &&
                worksList?.pindding_works?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )}

      {tag === 0 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك الأعمال الغير منجزة و الغير مسندة الى اي متطوع و التي
            يمكنك حذفها
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {worksList?.waiting_works?.length > 0 &&
                worksList?.waiting_works?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Works;
