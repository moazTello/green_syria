import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";
import ImageUploader from "../components/fields/ImageUploader";
import imageCompression from "browser-image-compression";

const AddAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { isLoading, addAdmin, addAdminAssisstent } = useStore();
  // const navigate = useNavigate();
  const [type, setType] = useState(false);
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
    formData.append("orgName", data.orgName);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("desc", data.desc);
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
      let response = "";
      if (type) {
        response = await addAdmin(formData);
      } else {
        response = await addAdminAssisstent(formData);
      }
      if (response?.status === 201) {
        toast.success("تم إضافة آدمن جديد بنجاح");
        setValue("name", "");
        setValue("orgName", "");
        setValue("password", "");
        setValue("password_confirmation", "");
        setValue("email", "");
        setValue("address", "");
        setValue("phone", "");
        setValue("desc", "");
        // navigate("/green_syria/dashboard");
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
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col  md:flex-row-reverse md:justify-center items-center py-8`}
    >
      <div className="w-full md:w-[40%] md:m-10 flex flex-col justify-center items-center">
        <img
          src={images.admin_image}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] mt-4 md:my-0"
        />
        <p className="text-right fontReg w-[80%] md:w-[90%] mt-5 text-white text-sm md:text-lg">
          هنا يمكنك إضافة آدمن رئيسي او مؤسسة (آدمن مساعد) قم بتفعيل خيار آدمن
          رئيسي ليستطيع من الإطلاع على الزيارات و إضافة آدمن، يجب ان تكون قياسات
          الصور المرفقة للمتطوع بقياس العرض يساوي الطول لتتناسب مع قياس واجهات
          التطبيق
        </p>
        <img
          src={images.explain_image_3}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] mt-6 mb-4"
        />
      </div>
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          إضافة آدمن جديد
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="اسم المنظمة"
              error={errors?.orgName?.message}
              register={register("orgName", {
                required: "اسم المنظمة مطلوب",
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
              headerText="البريد الالكتروني"
              error={errors?.email?.message}
              register={register("email", {
                required: "البريد الالكتروني مطلوب",
              })}
              isRequired={true}
              type="email"
              customStyleComponent="mr-2"
            />
            <InputField
              type="number"
              headerText="رقم الجوال"
              error={errors?.phone?.message}
              register={register("phone", {
                required: "رقم الجوال مطلوب",
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
          />
          <div className="w-full flex justify-end items-center px-2">
            <p className="text-white fontReg text-sm md:text-lg px-3">
              إضافة كآدمن رئيسي ؟
            </p>
            <input
              onChange={(e) => setType(e.target.checked)}
              type="checkbox"
              className="w-4 h-4 mr-2 md:w-6 md:h-6"
            />
          </div>
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

export default AddAdmin;
