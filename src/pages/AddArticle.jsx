import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";
import ImageUploader from "../components/fields/ImageUploader";
import imageCompression from "browser-image-compression";
import { images } from "../constants";
const AddArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { categoryid } = useParams();
  const { isLoading, addArticle } = useStore();
  // const navigate = useNavigate();
  const onSubmit = async (data) => {
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
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
      const response = await addArticle(formData, categoryid);
      if (response?.status === 201) {
        toast.success("تم إضافة مقال جديد بنجاح");
        setValue("title", "");
        setValue("desc", "");
        // navigate(`/green_syria/dashboard/categories/${categoryid}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("تأكد من كافة المعلومات");
    }
  };
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex justify-center py-8`}
    >
      <div className="w-full md:w-[80%] h-auto flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-start items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          إضافة مقال جديد
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="عنوان المقال"
              error={errors?.title?.message}
              register={register("title", {
                required: "عنوان المقال مطلوب",
              })}
              isRequired={true}
            />
          </div>
          <textarea
            className="w-full fontReg outline-none min-h-40 md:min-h-80 resize-none rounded-xl bg-[#1a202c] bg-opacity-80 text-right p-4 text-green-300 text-sm md:text-lg"
            {...register("desc")}
            required={true}
            placeholder="المقال"
          />
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-right fontReg w-[80%] md:w-[90%] mt-5 text-white text-sm md:text-lg">
              يجب ان تكون قياسات الصور المرفقة مع المقال بقياس العرض يساوي ضعفي
              الطول لتتناسب مع التطبيق
            </p>
            <img
              src={images.explain_image_4}
              alt="logo"
              className="rounded-[5%] w-[60%] md:w-[50%] mt-6 mb-4"
            />
          </div>
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

export default AddArticle;
