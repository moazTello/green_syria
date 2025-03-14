import { images } from "../constants";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { RiTreeFill } from "react-icons/ri";
import { GiDigDug } from "react-icons/gi";
const MainCard = ({ data, type }) => {
  const {
    DeleteVolunteer,
    fetchVolunteersList,
    DeletePlantStore,
    fetchPlantStoresList,
    DeleteAdmin,
    fetchAdminsList,
    user,
  } = useStore();
  console.log(data);
  const handleDelete = async () => {
    if (type === "volunteer") {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("هل أنت متأكد من حذف المتطوع ؟");
      if (!result) return;
      const response = await DeleteVolunteer(data?.id);
      if (response?.status === 200) {
        await fetchVolunteersList();
        toast.success("نم حذف المتطوع بنجاح ");
      }
    } else if (type === "plantStore") {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("هل أنت متأكد من حذف المشتل ؟");
      if (!result) return;
      const response = await DeletePlantStore(data?.id);
      if (response?.status === 200) {
        await fetchPlantStoresList();
        toast.success("نم حذف المشتل بنجاح ");
      }
    } else if (type === "admin") {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("هل أنت متأكد من حذف المؤسسة ؟");
      if (!result) return;
      const response = await DeleteAdmin(data?.id);
      if (response?.status === 200) {
        await fetchAdminsList();
        toast.success("نم حذف المؤسسة بنجاح ");
      }
    }
  };

  const helper = () => {
    if(type === "plantStore"){
      sessionStorage.setItem("plantStore", JSON.stringify(data?.id));
    }
  }
  console.log(data)
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
          to={`${
            type === "volunteer"
              ? `/green_syria/dashboard/volunteers/${data.id}`
              : type === "admin"
              ? `/green_syria/dashboard/institutions/${data.id}`
              : `/green_syria/dashboard/plant_stores/${data.id}`
          } `}
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
      {((user?.user.role === "admin" && type === "admin") ||
        type === "volunteer" ||
        type === "plantStore") && (
        <div className="w-full flex justify-center items-center mt-auto ">
          <button
            className={`${
              type !== "admin" ? "rounded-bl-lg" : "rounded-b-lg"
            } bg-red-500 w-full text-white  py-2 flex justify-center hover:bg-white hover:text-red-500`}
            onClick={handleDelete}
          >
            <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 cursor-pointer " />
          </button>
          {type !== "admin" && (
            <>
              {/* <p className="text-green-600"> | </p> */}
              <Link
                className="w-full bg-green-500 text-white py-2 flex justify-center hover:text-green-500 hover:bg-yellow-50"
                to={`${
                  type === "volunteer"
                    ? `/green_syria/dashboard/volunteers/works/${data.volun_id}`
                    : `/green_syria/dashboard/plant_stores/tree/${data.plan_id}`
                } `}
                onClick={helper}
              >
                {type !== "volunteer" ? (
                  <RiTreeFill className="text-xl md:text-2xl mx-4 cursor-pointer" />
                ) : (
                  <GiDigDug className="text-xl md:text-2xl mx-4 cursor-pointer" />
                )}
              </Link>
              <Link
                className="w-full bg-orange-900 text-white rounded-br-lg py-2 flex justify-center hover:bg-white hover:text-orange-900"
                to={`${
                  type === "volunteer"
                    ? `/green_syria/dashboard/volunteers/edit/${data.id}`
                    : `/green_syria/dashboard/plant_stores/edit/${data.id}`
                } `}
              >
                <CiEdit className="text-xl md:text-2xl mx-4 cursor-pointer" />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MainCard;
