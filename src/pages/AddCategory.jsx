// import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isLoading, addCategory } = useStore();
  // const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    try {
      const response = await addCategory(formData);
      if (response?.status === 201) {
        toast.success("تم إضافة نوع مقالات جديد بنجاح");
        setValue("name", "");
        // navigate("/green_syria/dashboard/categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("تأكد من كافة المعلومات");
    }
  };
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:justify-start items-center py-8`}
    >
      <div className="w-full md:w-[40%]  flex flex-col justify-center items-center">
        <img
          src={images.reading}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%]"
        />
        <p className="text-center fontReg w-[80%] md:w-[90%] my-10 text-white text-sm md:text-lg">
          هنا يمكنك إضافة نوع مقالات جديد
        </p>
      </div>
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          إضافة نوع مقالات جديد
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputField
            headerText="نوع المقال"
            error={errors?.name?.message}
            register={register("name", {
              required: "نوع المقال مطلوب",
            })}
            isRequired={true}
            customStyleComponent="mr-2"
          />
          <CustomButton
            buttonText="إضافة"
            customStyle
            type="submit"
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
