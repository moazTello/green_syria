import { images } from "../constants";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";
const ArticleItem = ({ data}) => {
  const { categoryid } = useParams();
  const {
    DeleteArticle,
    fetchArticlesList,
  } = useStore();
  const handleDelete = async () => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("هل أنت متأكد من حذف المقال ؟");
      if (!result) return;
      const response = await DeleteArticle(data?.id);
      if (response?.status === 200) {
        await fetchArticlesList(categoryid);
        toast.success("نم حذف المقال بنجاح ");
      }
  };
  return (
    <div className="w-64 h-72 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] flex flex-col justify-start items-center m-2 md:my-4 float-right shadow-3xl shadow-gray-300">
      <img
        src={data?.images?.length ? data?.images[0]?.img : images.homeImage }
        className={`${
           "w-56 h-28 bg-no-repeat bg-center bg-cover m-5 rounded-t-lg"
        }`}
        alt=""
      />
      <div className="w-full flex justify-between items-center">
        <p className="text-right fontReg w-full text-green-700 text-lg pr-5">
          {data?.title}
        </p>
      </div>
        <div className="w-full flex justify-center items-center mt-auto ">
          <button
            className={`${"rounded-bl-lg" } bg-red-500 w-full text-white  py-2 flex justify-center hover:bg-white hover:text-red-500`}
            onClick={handleDelete}
          >
            <RiDeleteBin5Line className="text-xl md:text-2xl mx-4 cursor-pointer " />
          </button>
              <Link
                className="w-full bg-orange-900 text-white rounded-br-lg py-2 flex justify-center hover:bg-white hover:text-orange-900"
                to={`/green_syria/dashboard/categories/${categoryid}/details/${data?.id}`}
              >
          <IoArrowUndoOutline className="text-xl md:text-2xl cursor-pointer" />
              </Link>
        </div>
    </div>
  );
};

export default ArticleItem;
