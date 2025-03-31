import { images } from "../constants";
// import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import CustomButton from "./fields/CustomButton";
const WorkItem = ({ data, deleted, assigned }) => {
  const { plantstoreid } = useParams();
  const {
    DeletePlantStoreTree,
    fetchPlantStoreTreesList,
    volunteersList,
    isLoading,
    assignTreeOrWorkVolunteer,
    fetchWorksList,
    fetchTreesAllList,
  } = useStore();

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("هل أنت متأكد من حذف الشجرة ؟");
    if (!result) return;
    const response = await DeletePlantStoreTree(data?.id);
    if (response?.status === 200) {
      plantstoreid
        ? await fetchPlantStoreTreesList(plantstoreid)
        : await fetchTreesAllList();
      toast.success("نم حذف الشجرة بنجاح ");
    }
  };

  const assign = async () => {
    if (selectedVolunteerId === "") {
      return toast.error("إختر متطوعاً لإرسال طلب التوجيه");
    }
    const formData = new FormData();
    formData.append("type", assigned === "workAssign" ? "work" : "adv");
    formData.append("volunteer_id", selectedVolunteerId);
    formData.append("id", data?.id);
    try {
      const response = await assignTreeOrWorkVolunteer(formData);
      if (response?.status === 200) {
        assigned === "workAssign"
          ? await fetchWorksList()
          : await fetchTreesAllList();
        plantstoreid && (await fetchPlantStoreTreesList(plantstoreid));
        toast.success("تم التوجيه الى المتطوع بنجاح");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedVolunteerId, setSelectedVolunteerId] = useState("");

  const handleVolunteerChange = (e) => {
    setSelectedVolunteerId(e.target.value);
  };

  return (
    <div className="w-64  rounded-lg bg-gradient-to-t from-[#ffffff] pt-5 to-[#f5f6dd] flex flex-col justify-start items-center m-2 md:my-4 float-right shadow-3xl shadow-gray-300 no-scrollbar">
      <img
        src={data?.images?.length ? data?.images[0]?.img : images.homeImage}
        className={`${"w-52 h-52 bg-no-repeat mb-5 bg-center bg-cover rounded-lg"}`}
        alt=""
      />
      <div className="w-full flex flex-col justify-start items-center px-4 pb-5">
        <p className="text-right fontBold w-full text-green-700 text-sm md:text-lg ">
          {data?.name}
        </p>
        <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-2"></div>
        <div className="w-full flex justify-end items-center">
          <p className="text-right fontReg w-full text-green-700 text-sm md:text-lg ">
            {data?.address || data?.plantsStoreName}
          </p>
          <span className="ml-2 text-lg md:text-2xl text-orange-700">
            {data?.plantsStoreName ? "🌿" : <FaLocationDot />}
          </span>
        </div>
        {data?.volunterrName && (
          <div className="w-full flex justify-end items-center">
            <p className="text-right fontReg w-full text-green-700 text-sm md:text-lg ">
              {data?.volunterrName}
            </p>
            <span className="ml-2 text-lg md:text-2xl text-orange-700">
              👷🏻️
            </span>
          </div>
        )}
        <p className="text-right bg-slate-600 px-2 h-24 fontReg w-full rounded-b-lg text-yellow-50 text-sm md:text-lg mt-3 py-1 overflow-auto no-scrollbar">
          {data?.desc}
        </p>
        {assigned && (
          <>
            <div className="w-full flex justify-center mt-3">
              <select
                className="w-full p-2 rounded-lg bg-slate-600 text-white fontReg"
                value={selectedVolunteerId}
                onChange={handleVolunteerChange}
              >
                <option className="text-right" value="">
                  اختر متطوعًا
                </option>
                {volunteersList?.map((volunteer) => (
                  <option
                    className="text-right"
                    key={volunteer.volun_id}
                    value={volunteer.volun_id}
                  >
                    {volunteer.name}
                  </option>
                ))}
              </select>
            </div>
            <CustomButton
              customStyle={`rounded-b-lg fontReg bg-orange-500 border-orange-500 border-[1px] w-full text-white pt-1 flex justify-center hover:bg-orange-700 hover:text-orange-500 mt-3 mb-0`}
              onClick={assign}
              buttonText="توجيه"
              type="button"
              loading={isLoading}
            />
          </>
        )}
      </div>
      {deleted && (
        <div className="w-full flex justify-center items-center mt-auto ">
          <button
            className={`${"rounded-b-lg"} bg-red-500 w-full text-white  py-2 flex justify-center hover:bg-white hover:text-red-500`}
            onClick={handleDelete}
          >
            <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 cursor-pointer " />
          </button>
          {/* <Link
          className="w-full bg-orange-900 text-white rounded-br-lg py-2 flex justify-center hover:bg-white hover:text-orange-900"
          to={`/green_syria/dashboard/categories/${categoryid}/details/${data?.id}`}
        >
          <IoArrowUndoOutline className="text-xl md:text-2xl cursor-pointer" />
        </Link> */}
        </div>
      )}
    </div>
  );
};

export default WorkItem;
