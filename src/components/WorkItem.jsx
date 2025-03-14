import { images } from "../constants";
// import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
const WorkItem = ({ data, deleted }) => {
  const { plantstoreid } = useParams();
  const { DeletePlantStoreTree, fetchPlantStoreTreesList } = useStore();
  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("هل أنت متأكد من حذف الشجرة ؟");
    if (!result) return;
    const response = await DeletePlantStoreTree(data?.id);
    if (response?.status === 200) {
      await fetchPlantStoreTreesList(plantstoreid);
      toast.success("نم حذف الشجرة بنجاح ");
    }
  };
  return (
    <div className="w-64 h-96 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] flex flex-col justify-start items-center m-2 md:my-4 float-right shadow-3xl shadow-gray-300">
      <img
        src={data?.images?.length ? data?.images[0]?.img : images.homeImage}
        className={`${"w-56 h-28 bg-no-repeat bg-center bg-cover m-5 rounded-t-lg"}`}
        alt=""
      />
      <div className="w-full flex flex-col justify-start items-center px-4">
        <p className="text-right fontBold w-full text-green-700 text-sm md:text-lg ">
          {data?.name}
        </p>
        <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-2"></div>
        <div className="w-full flex justify-end items-center">

        <p className="text-right fontReg w-full text-green-700 text-sm md:text-lg ">
          {data?.address || data?.plantsStoreName}
        </p>
          <span className="ml-2 text-sm md:text-lg text-orange-700">
            <FaLocationDot/>
          </span>
        </div>
        <p className="text-right bg-slate-600 px-2 h-24 fontReg w-full rounded-b-lg text-yellow-50 text-sm md:text-lg mt-3 py-1 overflow-auto">
          {data?.desc}
        </p>
      </div>
      {deleted && <div className="w-full flex justify-center items-center mt-auto ">
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
      </div>}
    </div>
  );
};

export default WorkItem;
