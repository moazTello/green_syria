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
    <div className="w-64 h-96 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] hover:bg-yellow-50 flex flex-col justify-start items-center m-2 md:my-4 float-right">
      <img
        src={data?.images?.length > 0 ? data?.images[0]?.img : images.desk_image}
        className="w-56 h-28 bg-no-repeat bg-center bg-cover m-5 rounded-t-lg"
        alt=""
      />
      <div className="w-full flex justify-between items-center">
        <Link to={`/green_syria/dashboard/events/${data.id}`}
          className="bg-white text-green-600 hover:text-white border-[1px] border-green-600 hover:bg-green-600 p-1 rounded-r-xl"
        >
          <IoArrowUndoOutline className="text-xl md:text-3xl ml-5 cursor-pointer" />
        </Link>
        <p className="text-right fontReg w-full text-green-700 text-lg pr-5">
          {data?.title}
        </p>
      </div>
      <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-3"></div>
      <p className="text-right fontReg min-h-10 w-full text-green-600 text-sm md:text-lg px-5 overflow-auto no-scrollbar">
        {data?.orgName}  🏢
      </p>
      <p className="text-right fontReg min-h-20 max-h-20 w-full text-green-600 text-sm md:text-lg px-5 pb-3 overflow-auto no-scrollbar">
        {data?.desc}
      </p>
      <div className="w-full flex justify-center items-center mt-auto">
        <button className={`rounded-b-lg bg-red-500 w-full text-white  py-2 flex justify-center hover:text-yellow-500`} onClick={handleDelete}>
          <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default Event;
