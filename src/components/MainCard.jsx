import { images } from "../constants";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";

const MainCard = ({ data, type }) => {
  const { DeleteVolunteer, fetchVolunteersList, DeletePlantStore, fetchPlantStoresList } = useStore();
  console.log(data);
  const handleDelete = async () => {
    if(type === "volunteer"){
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("هل أنت متأكد من حذف المتطوع ؟");
      if (!result) return;
      const response = await DeleteVolunteer(data?.id);
      if (response?.status === 200) {
        await fetchVolunteersList();
        toast.success("نم حذف المتطوع بنجاح ");
      }
    }
    else if(type === "plantStore"){
         // eslint-disable-next-line no-restricted-globals
         const result = confirm("هل أنت متأكد من حذف المشتل ؟");
         if (!result) return;
         const response = await DeletePlantStore(data?.id);
         if (response?.status === 200) {
           await fetchPlantStoresList();
           toast.success("نم حذف المشتل بنجاح ");
         }
    }
  };
  return (
    <div className="w-64 h-96 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] hover:bg-yellow-50 flex flex-col justify-start items-center m-2 md:my-4 float-right pb-2">
      <img
        src={data.logo === "no image" ? images.homeImage : data.logo}
        className="w-56 h-28 bg-no-repeat bg-center bg-cover m-5 rounded-t-lg"
        alt=""
      />
      <div className="w-full flex justify-between items-center">
        <Link to={`${type === "volunteer" ? `/green_syria/dashboard/volunteers/${data.id}` : `/green_syria/dashboard/plant_stores/${data.id}`} `}>
          <IoArrowUndoOutline className="text-xl md:text-3xl ml-5 text-green-600 cursor-pointer hover:text-yellow-500" />
        </Link>
        <p className="text-right w-full text-green-700 text-lg md:text-2xl pr-5">
          {data?.name}
        </p>
      </div>
      <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-3"></div>
      <p className="text-right min-h-28 w-full text-green-600 text-sm md:text-lg px-5 pb-3 overflow-auto">
        {data?.desc}
      </p>
      <div className="w-full flex justify-center items-center mt-4">
        <button onClick={handleDelete}>
          <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 text-red-600 cursor-pointer hover:text-yellow-500" />
        </button>
        <p className="text-green-600"> | </p>
        <Link to={`${type === "volunteer" ? `/green_syria/dashboard/volunteers/edit/${data.id}` : `/green_syria/dashboard/plant_stores/edit/${data.id}`} `}>
          <CiEdit className="text-xl md:text-2xl mx-4 text-blue-600 cursor-pointer hover:text-yellow-500" />
        </Link>
      </div>
    </div>
  );
};

export default MainCard;
