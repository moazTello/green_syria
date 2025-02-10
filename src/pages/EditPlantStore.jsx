import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";
import imageCompression from "browser-image-compression";

const EditPlantStore = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { editplantstoreid } = useParams();
  const { isLoading, fetchElement, EditPlantStoreApi } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchElement(editplantstoreid, "plan");
      if (!response) {
        return;
      }
      setValue("name", response.name);
      setValue("ownerName", response.ownerName);
      setValue("phone", response.phone);
      setValue("address", response.address);
      setValue("email", response.email);
      setValue("desc", response.desc);
      setValue("closeTime", response.closeTime);
      setValue("openTime", response.openTime);
      setValue("LogoImage", response.logo);
      setValue("userName", response.userName);
      let imar = response?.images?.map((item) => item.img);
      setValue("Images", imar);
    };
    fetch();
  }, [fetchElement, editplantstoreid, setValue]);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (data.password !== data.password_confirmation) {
      return toast.error("تأكد من كلمة المرور");
    }
    if (data?.password?.length !== 0) {
      if (data.password.length < 8) {
        return toast.error("كلمة المرور يجب ان تكون ٨ أحرف على الأقل");
      }
    }
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("ownerName", data.ownerName);
    if (data?.password?.length !== 0) {
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
    }
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("desc", data.desc);
    formData.append("openTime", data.openTime);
    formData.append("closeTime", data.closeTime);
    const appendFile = async (key, file, index = null) => {
      if (typeof file === "string") {
        return;
      }
      if (file?.type?.match(/image\/(jpeg|jpg|png|gif)/)) {
        if (file.size > 800 * 1024) {
          toast.success("يتم الآن ضغط الصور");
          const compressedFile = await imageCompression(
            file,
            compressionOptions
          );
          formData.append(
            index !== null ? `${key}[${index}]` : key,
            compressedFile
          );
        } else {
          formData.append(index !== null ? `${key}[${index}]` : key, file);
        }
      } else if (file?.type?.match(/application\/pdf/)) {
        formData.append(index !== null ? `${key}[${index}]` : key, file);
      } else {
        toast.error("صيغة الملف غير مدعومة");
      }
    };
    if (data?.LogoImage?.length > 0) {
      await appendFile("logo", data.LogoImage[0]);
    }
    if (data?.Images?.length > 0) {
      toast.success("يتم الآن ضغط الصور");
      const imageArray = Array.isArray(data.Images)
        ? data.Images
        : Array.from(data.Images);
      for (const [index, file] of imageArray.entries()) {
        await appendFile("imgs", file, index);
      }
    }
    try {
      const response = await EditPlantStoreApi(formData, editplantstoreid);
      console.log(response);
      if (response?.status === 200) {
        toast.success("تم تعديل المشتل بنجاح");
        navigate("/green_syria/dashboard/plant_stores");
      }
      if (
        response?.response?.data?.message ===
        "The email has already been taken."
      ) {
        toast.error(
          "البريد الالكتروني مستخدم مسبقاً يرجى اختيار بريد الكتروني آخر "
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("تأكد من كافة المعلومات");
    }
  };
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:flex-row md:justify-center items-start py-8`}
    >
      <div className="w-full z-10 md:w-[40%] md:m-10 flex flex-col justify-center items-center">
        <img
          src={images.plant_store_image}
          alt="logo"
          className="rounded-[5%] z-10 w-[50%] md:w-[80%] mt-4 md:my-0 shadow-3xl shadow-yellow-50"
        />
        <p className="text-right z-10 fontBold w-[80%] md:w-[90%] my-7 text-white text-sm md:text-lg">
          تظهر لك تفاصيل المشتل يمكنك تعديل المشتل بإعادة ملأ الحقول المراد
          تعديلها
        </p>
      </div>
      <div className="w-full md:w-[50%] z-10 flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          تعديل المشتل
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="اسم المستخدم ( ثابت )"
              error={errors?.userName?.message}
              register={register("userName")}
              disable={true}
              customStyleComponent="mr-2"
            />
            <InputField
              headerText="الإسم"
              error={errors?.name?.message}
              register={register("name", {
                required: "الإسم مطلوب",
              })}
              isRequired={true}
            />
          </div>
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="تأكيد كلمة المرور"
              error={errors?.password_confirmation?.message}
              register={register("password_confirmation")}
              type="password"
              customStyleComponent="mr-2"
              placeholder="املئ اذا اردت تغييرها"
            />
            <InputField
              headerText="كلمة المرور"
              error={errors?.password?.message}
              register={register("password")}
              type="password"
              placeholder="املئ اذا اردت تغييرها"
            />
          </div>
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="البريد الالكتروني"
              error={errors?.email?.message}
              register={register("email")}
              type="email"
              customStyleComponent="mr-2"
            />
            <InputField
              headerText="رقم الجوال"
              error={errors?.phone?.message}
              register={register("phone", {
                required: "رقم الجوال مطلوب",
              })}
              type="number"
              isRequired={true}
            />
          </div>
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="اسم المالك"
              error={errors?.ownerName?.message}
              register={register("ownerName", {
                required: "اسم المالك مطلوب",
              })}
              isRequired={true}
              customStyleComponent="mr-2"
            />
            <InputField
              headerText="العنوان"
              error={errors?.address?.message}
              register={register("address", {
                required: "العنوان مطلوب",
              })}
              isRequired={true}
            />
          </div>
          <div className="w-full flex items-start justify-center">
            <InputField
              type="Time"
              headerText="نهاية الدوام "
              error={errors?.closeTime?.message}
              register={register("closeTime", {
                required: "نهاية الدوام مطلوب",
              })}
              isRequired={true}
              customStyleComponent="mr-2"
            />
            <InputField
              type="Time"
              headerText="بداية الدوام"
              error={errors?.openTime?.message}
              register={register("openTime", {
                required: "بداية الدوام مطلوب",
              })}
              isRequired={true}
            />
          </div>
             <textarea
            className="w-full fontReg outline-none min-h-40 resize-none rounded-xl bg-[#1a202c] bg-opacity-80 text-right p-4 text-green-300 text-sm md:text-lg"
            {...register("desc")}
          />
          <div className="w-full flex flex-col justify-center items-center my-4">
            <label
              htmlFor="logo-image"
              className="w-full fontReg py-2 rounded-lg text-sm md:text-lg text-center hover:bg-[#ffffff] bg-[#55B063] border-[1px] hover:border-[#55B063] text-white hover:text-[#55B063] cursor-pointer"
            >
              {watch("LogoImage") ? "تعديل اللوغو " : "إضافة لوغو المنظمة"}
            </label>
            <input
              {...register("LogoImage")}
              id="logo-image"
              type="file"
              className="hidden"
            />
            {errors?.LogoImage && <p>{errors?.logo?.message}</p>}
            {watch("LogoImage") && watch("LogoImage")?.length > 0 && (
              <img
                className="w-64 h-32 object-cover rounded-lg my-5"
                src={
                  typeof watch("LogoImage") === "string"
                    ? watch("LogoImage")
                    : watch("LogoImage") instanceof HTMLImageElement
                    ? watch("LogoImage")
                    : watch("LogoImage")?.length &&
                      URL.createObjectURL(watch("LogoImage")[0])
                }
                alt="logo"
              />
            )}
          </div>
          <div className="w-full flex flex-col justify-center items-center mb-4">
            <label
              htmlFor="images"
              className="w-full fontReg py-2 rounded-lg text-sm md:text-lg text-center hover:bg-[#ffffff] bg-[#55B063] border-[1px] hover:border-[#55B063] text-white hover:text-[#55B063] cursor-pointer"
            >
              {watch("Images")?.length > 0 ? "تعديل الصور" : "إضافة صور"}
            </label>
            <input
              {...register("Images")}
              id="images"
              multiple
              type="file"
              className="hidden"
            />
            {watch("Images") && watch("Images")?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                {Array.from(watch("Images")).map((file, index) => {
                  const src =
                    typeof file === "string" ? file : URL.createObjectURL(file);
                  return (
                    <img
                      key={index}
                      src={src}
                      alt={`image-${index}`}
                      className="w-64 h-32 object-cover rounded-lg"
                      onLoad={() =>
                        file instanceof File && URL.revokeObjectURL(src)
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>
          <CustomButton
            buttonText="تعديل المشتل"
            customStyle
            type="submit"
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default EditPlantStore;
