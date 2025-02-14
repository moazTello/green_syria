import React, { useState } from "react";
import { FaBook } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import useStore from "../zustand/useStore";
import toast from "react-hot-toast";
import CustomButton from "./fields/CustomButton";
import { useForm } from "react-hook-form";
import InputField from "./fields/InputField";
const CategoryItem = ({ data }) => {
  const { DeleteCategory, fetchCategoriesList, isLoading, EditCategory } =
    useStore();
  const [editToggle, setEditToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(
      "هل أنت متأكد من حذف النوع من المقالات مع كافة المقالات التي داخله ؟"
    );
    if (!result) return;
    const response = await DeleteCategory(data?.id);
    if (response?.status === 200) {
      await fetchCategoriesList();
      toast.success("نم حذف النوع بنجاح ");
    }
  };
  const onSubmit = async (form) => {
    const formData = new FormData();
    console.log(form.name)
    formData.append("name", form.name);
    try {
      const response = await EditCategory(formData, data?.id);
      console.log(response);
      if (response?.status === 200) {
        setEditToggle((old) => !old);
        toast.success("تم تعديل نوع مقالات جديد بنجاح");
        setValue("name", "");
        await fetchCategoriesList();
      }
    } catch (error) {
      console.log(error);
      toast.error("تأكد من كافة المعلومات");
    }
  };
  return (
    <div className="w-52 h-auto min-h-24 rounded-lg bg-gradient-to-t from-[#ffffff] to-[#f5f6dd] hover:bg-yellow-50 flex flex-col justify-start items-center m-2 md:my-4 float-right">
      <div className="w-full flex justify-between items-center">
        <p className="text-center fontReg w-full text-green-700 text-lg pt-1">
          {data?.category}
        </p>
      </div>
      {editToggle && (
        <div className="w-full flex flex-col px-1 md:px-1 py-1 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
          <div className="border-t-[0.5px] border-slate-300 h-1 w-[90%] my-3"></div>
          <p className="fontBold text-orange-700 text-sm md:text-sm my-1">
            تعديل نوع مقالات
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <InputField
              headerText="نوع المقال"
              error={errors?.name?.message}
              register={register("name", {
                required: "نوع المقال مطلوب",
              })}
              isRequired={true}
              customStyleHeader="text-green-600 md:text-xs"
            />
            <CustomButton
              buttonText="تعديل"
              customStyle="text-sm md:text-sm h-8"
              type="submit"
              loading={isLoading}
            />
          </form>
        </div>
      )}
      <div className="w-full flex justify-center items-center mt-auto">
        <button
          className={`${"rounded-bl-lg"} bg-red-500 w-full text-white py-1 flex justify-center hover:bg-white hover:text-red-500`}
          onClick={handleDelete}
        >
          <RiDeleteBin5Line className="text-lg md:text-xl mx-4 cursor-pointer " />
        </button>
        <Link
          to={`/green_syria/dashboard/categories/${data?.id}`}
          className="w-full bg-green-500 text-white py-1 flex justify-center hover:bg-white hover:text-green-500"
        >
          <FaBook className="text-lg md:text-xl mx-4 cursor-pointer " />
        </Link>
        <button
          className="w-full bg-orange-900 text-white rounded-br-lg py-1 flex justify-center hover:bg-white hover:text-orange-900"
          onClick={() => setEditToggle((old) => !old)}
        >
          <CiEdit className="text-lg md:text-xl mx-4 cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
