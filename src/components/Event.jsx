import { images } from "../constants";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";

const Event = ({ data}) => {
  const { DeleteEvent, fetchEventsList } = useStore();
  console.log(data);
  const handleDelete = async () => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("هل أنت متأكد من حذف الحدث ؟");
      if (!result) return;
      const response = await DeleteEvent(data?.id);
      if (response?.status === 200) {
        await fetchEventsList();
        toast.success("نم حذف الحدث بنجاح ");
      }
  };
  return (
    <div className="w-64 h-96 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] hover:bg-yellow-50 flex flex-col justify-start items-center m-2 md:my-4 float-right pb-2">
      <img
        src={data?.images?.length > 0 ? images.homeImage : data.images[0]}
        className="w-56 h-28 bg-no-repeat bg-center bg-cover m-5 rounded-t-lg"
        alt=""
      />
      <div className="w-full flex justify-between items-center">
        <Link to={`/green_syria/dashboard/events/${data.id}`}>
          <IoArrowUndoOutline className="text-xl md:text-3xl ml-5 text-green-600 cursor-pointer hover:text-yellow-500" />
        </Link>
        <p className="text-right w-full text-green-700 text-lg md:text-2xl pr-5">
          {data?.title}
        </p>
      </div>
      <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-3"></div>
      <p className="text-right min-h-10 w-full text-green-600 text-sm md:text-lg px-5 overflow-auto">
        {data?.orgName}  🏢
      </p>
      <p className="text-right min-h-20 w-full text-green-600 text-sm md:text-lg px-5 pb-3 overflow-auto">
        {data?.desc}
      </p>
      <div className="w-full flex justify-center items-center mt-4">
        <button onClick={handleDelete}>
          <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 text-red-600 cursor-pointer hover:text-yellow-500" />
        </button>
      </div>
    </div>
  );
};

export default Event;
