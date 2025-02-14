import React, { useEffect, useState } from "react";
import { BiSolidMessageCheck } from "react-icons/bi";
import { useParams } from "react-router-dom";
import useStore from "../zustand/useStore";
import WorkItem from "../components/WorkItem";

const VolunteerWorks = () => {
  const { fetchVolunteerWorksList, volunteerWorksList } = useStore();
  const {volid} = useParams();
    const [tag, setTag] = useState(0);
  useEffect(() => {
    fetchVolunteerWorksList(volid);
  }, [fetchVolunteerWorksList, volid]);
  const value = 4;
  return (
    <div className="bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex justify-between items-center mt-10 px-5 md:px-10">
          <BiSolidMessageCheck className="text-white text-2xl md:text-6xl" />
          <p className="text-white fontReg text-right w-full text-xl md:text-4xl">
            {" "}
            الأعمال <span className="p-2 mx-1"> ⚒️ </span>
          </p>
        </div>
        <p className="text-slate-50 fontReg text-sm w-full px-8 md:px-16 my-4 md:my-4 md:text-lg text-right">
          {" "}
          هنا يمكنك رؤية كافة الأعمال الخاصة بالمتطوع
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
          قيد الانتظار
        </button>
        {/* <button
          onClick={() => setTag(1)}
          className={`p-2 rounded-b-lg hover:bg-orange-700 hover:text-yellow-200 mx-1 ${
            tag === 1
              ? "shadow-2xl shadow-yellow-50 bg-orange-700 text-yellow-200"
              : "bg-yellow-200 text-green-700"
          }`}
        >
          غير منجزة
        </button> */}
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
            هنا تظهر لك الأعمال و الأشجار المسندة الى المتطوع و هي اعمال منجزة
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {volunteerWorksList?.doneTrees?.length > 0 &&
                volunteerWorksList?.doneTrees?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {volunteerWorksList?.doneWorks?.length > 0 &&
                volunteerWorksList?.doneWorks?.map((work, index) => (
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
            هنا تظهر لك الأعمال و الأشجار المسندة الى المتطوع و هي غير منجزة بعد
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {volunteerWorksList?.loadingTrees?.length > 0 &&
                volunteerWorksList?.loadingTrees?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {volunteerWorksList?.loadingWorks?.length > 0 &&
                volunteerWorksList?.loadingWorks?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )}

      {/* {tag === 1 && (
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
              {volunteerWorksList?.pindding_works?.length > 0 &&
                volunteerWorksList?.pindding_works?.map((work, index) => (
                  <WorkItem deleted={false} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )} */}

      {tag === 0 && (
        <>
          <p className="text-white text-right fontReg m-5 text-sm md:text-lg">
            {" "}
            هنا تظهر لك الأعمال الغير منجزة و الأشجار الغير مزروعة الغير مسندة الى المتطوع بعد وفي انتظار الموافقة عليها
          </p>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {volunteerWorksList?.trees_Que?.length > 0 &&
                volunteerWorksList?.trees_Que?.map((work, index) => (
                  <WorkItem deleted={true} key={index} data={work} />
                ))}
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
            >
              {volunteerWorksList?.works_Que?.length > 0 &&
                volunteerWorksList?.works_Que?.map((work, index) => (
                  <WorkItem deleted={true} key={index} data={work} />
                ))}
            </div>
          </div>
        </>
      )}


    </div>
  );
};

export default VolunteerWorks;
