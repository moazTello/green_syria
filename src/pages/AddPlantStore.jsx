import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";
import ImageUploader from "../components/fields/ImageUploader";
import imageCompression from "browser-image-compression";

const AddPlantStore = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { isLoading, addPlantStore } = useStore();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (data.password !== data.password_confirmation) {
      return toast.error("تأكد من كلمة المرور");
    }
    if (data.password.length < 8) {
      return toast.error("كلمة المرور يجب ان تكون ٨ أحرف على الأقل");
    }
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("ownerName", data.ownerName);
    formData.append("userName", data.userName);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("desc", data.desc);
    formData.append("openTime", data.openTime);
    formData.append("closeTime", data.closeTime);

    if (data?.LogoImage) {
      const logoFile = data.LogoImage;
      if (logoFile.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        if (logoFile.size > 400 * 1024) {
          toast.success("يتم الآن ضغط الصور");
          const compressedLogo = await imageCompression(
            logoFile,
            compressionOptions
          );
          formData.append("logo", compressedLogo);
        } else {
          formData.append("logo", logoFile);
        }
      } else {
        return toast.error(
          "يجب ان يكون نوع الصورة من هذه الأنواع فقط  jpeg, jpg, png, gif"
        );
      }
    } else {
      return toast.error("الصورة مطلوبة");
    }

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
          formData.append(`imgs[${index}]`, compressedImage);
        } else {
          formData.append(`imgs[${index}]`, file);
        }
      }
    }
    try {
      const response = await addPlantStore(formData);
      if (response?.status === 201) {
        toast.success("تم إضافة مشتل جديد بنجاح");
        navigate("/green_syria/dashboard");
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
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:flex-row-reverse md:justify-center items-center py-8`}
    >
      <div className="w-full md:w-[40%] md:m-10 flex flex-col justify-start items-center">
        <img
          src={images.plant_store}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] mt-4 md:my-0"
        />
        <p className="text-right fontBold w-[80%] md:w-[90%] my-10 text-white text-sm md:text-lg">
          من المفضل ان تكون قياسات الصورة المرفقة للمشتل بقياس العرض ضعفي الطول
          لتتناسب مع قياس واجهات التطبيق
        </p>
        <img
          src={images.explain_image_2}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] my-4 md:my-0"
        />
      </div>
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          إضافة مشتل جديد
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="اسم المستخدم"
              error={errors?.userName?.message}
              register={register("userName", {
                required: "اسم المستخدم مطلوب",
              })}
              isRequired={true}
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
              register={register("password_confirmation", {
                required: " تأكيد كلمة المرور مطلوبة",
              })}
              type="password"
              isRequired={true}
              customStyleComponent="mr-2"
            />
            <InputField
              headerText="كلمة المرور"
              error={errors?.password?.message}
              register={register("password", {
                required: "كلمة المرور مطلوبة",
              })}
              type="password"
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
              headerText="البريد الالكتروني"
              error={errors?.email?.message}
              register={register("email")}
              type="email"
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
            required={true}
            placeholder="إضافة وصف مختصر"
          />
          <ImageUploader
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
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

export default AddPlantStore;
