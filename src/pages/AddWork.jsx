// import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";
import ImageUploader from "../components/fields/ImageUploader";
import imageCompression from "browser-image-compression";

const AddWork = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { isLoading, addWork } = useStore();
  // const navigate = useNavigate();
  const onSubmit = async (data) => {
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("desc", data.desc);
    formData.append("mac", "00000000000000000");
    if (data?.Images && data.Images.length > 0) {
      toast.success("يتم الآن ضغط الصور");
      const imageArray = Array.isArray(data.Images)
        ? data.Images
        : Array.from(data.Images);
      for (const [index, file] of imageArray.entries()) {
        if (file.size > 800 * 1024) {
          const compressedImage = await imageCompression(
            file,
            compressionOptions
          );
          formData.append(`images[${index}]`, compressedImage);
        } else {
          formData.append(`images[${index}]`, file);
        }
      }
    }

    try {
      const response = await addWork(formData);
      if (response?.status === 201) {
        toast.success("تم إضافة عمل جديد بنجاح");
        setValue("name", "");
        setValue("address", "");
        setValue("desc", "");
        setValue("mac", "");
      }
    } catch (error) {
      console.log(error);
      toast.error("تأكد من كافة المعلومات");
    }
  };
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:flex-row md:justify-center items-center py-8`}
    >
      <div className="w-full md:w-[40%] md:m-10 flex flex-col justify-center items-center">
        <img
          src={images.volunteer}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] mt-4 md:my-0"
        />
        <p className="text-right fontReg w-[80%] md:w-[90%] my-10 text-white text-sm md:text-lg">
          من المفضل ان تكون قياسات الصورة المرفقة للعمل بقياس العرض يساوي الطول
          لتتناسب مع قياس واجهات التطبيق
        </p>
        <img
          src={images.explain_image_3}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] my-4 md:my-0"
        />
      </div>
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          إضافة عمل جديد
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="إسم العمل"
              error={errors?.name?.message}
              register={register("name", {
                required: "إسم العمل مطلوب",
              })}
              isRequired={true}
            />
          </div>
          <InputField
            headerText="العنوان"
            error={errors?.address?.message}
            register={register("address", {
              required: "العنوان مطلوب",
            })}
            isRequired={true}
          />
          <textarea
            className="w-full fontReg outline-none min-h-40 resize-none rounded-xl bg-[#1a202c] bg-opacity-80 text-right p-4 text-green-300 text-sm md:text-lg"
            {...register("desc")}
            required={true}
            placeholder="إضافة وصف مختصر"
          />
          <ImageUploader
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
            images={true}
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

export default AddWork;
