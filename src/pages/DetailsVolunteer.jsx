import { useParams, Link } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import ImageUploader from "../components/fields/ImageUploader";
import { useEffect } from "react";

const DetailsVolunteer = () => {
  const { volid } = useParams();
  const { register, setValue, watch } = useForm();
  const { fetchElement } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchElement(volid, "volun");
      if (!response) {
        return;
      }
      setValue("name", response.name);
      setValue("phone", response.phone);
      setValue("address", response.address);
      setValue("email", response.email);
      setValue("desc", response.desc);
      setValue("LogoImage", response?.logo);
      setValue("userName", response.userName);
    };
    fetch();
  }, [fetchElement, volid, setValue]);
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:flex-row-reverse md:justify-center items-start py-8`}
    >
      <div className="w-full md:w-[40%] md:m-10 flex flex-col justify-center items-center">
        <img
          src={images.pink_tree}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] mt-4 md:my-0"
        />
        <p className="text-right fontBold w-[80%] md:w-[90%] my-5 text-white text-sm md:text-lg">
          تظهر لك تفاصيل المتطوع إذا أردت تعديل معلومات المتطوع فانتقل إلى تعديل
     المتطوع
        </p>
        <Link
          to={`/green_syria/dashboard/volunteers/edit/${volid}`}
          className="mb-10 md:my-5 bg-slate-50 w-[80%] text-center rounded-lg p-2 md:p-4 text-sm md:text-lg text-green-600 hover:bg-yellow-50"
        >
          تعديل المتطوع
        </Link>
      </div>
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          تفاصيل المتطوع
        </p>
        <form className="w-full">
          <div className="w-full flex items-start justify-center">
          <InputField
              headerText="اسم المستخدم"
              register={register("userName")}
              customStyleComponent="mr-2"
              disable={true}
            />
            <InputField
              headerText="الإسم"
              register={register("name")}
              disable={true}
            />
          </div>
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="البريد الالكتروني"
              register={register("email")}
              disable={true}
              type="email"
              customStyleComponent="mr-2"
            />
            <InputField
              headerText="رقم الجوال"
              register={register("phone")}
              disable={true}
              type="number"
            />
          </div>
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="العنوان"
              register={register("address")}
              disable={true}
            />
          </div>
          <textarea
            className="w-full fontReg outline-none min-h-40 resize-none rounded-xl bg-[#1a202c] bg-opacity-80 text-right p-4 text-green-300 text-sm md:text-lg"
            {...register("desc")}
            disabled={true}
          />
          {watch("LogoImage") && watch("LogoImage").length > 0 && (
            <div className="w-full border-t-[3px] border-amber-700 mt-2 pt-1 flex flex-col items-center">
              <div className="w-full flex shadow-3xl shadow-amber-400">
                <p className="text-sm fontReg md:text-lg text-white bg-amber-700 w-full rounded-b-lg text-center mb-2 ">
                  اللوغو
                </p>
              </div>
              <img
                className="w-64 h-64 object-cover rounded-lg my-5"
                src={
                  typeof watch("LogoImage") === "string"
                    ? watch("LogoImage")
                    : watch("LogoImage") instanceof HTMLImageElement
                    ? watch("LogoImage")
                    : watch("LogoImage").length &&
                      URL.createObjectURL(watch("LogoImage")[0])
                }
                alt="logo"
              />
            </div>
          )}
          <ImageUploader
            register={register}
            watch={watch}
            setValue={setValue}
            details={true}
          />
        </form>
      </div>
    </div>
  );
};

export default DetailsVolunteer;
