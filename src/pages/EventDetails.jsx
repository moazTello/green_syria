import { Link, useNavigate, useParams } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import ImageUploader from "../components/fields/ImageUploader";
import { useEffect } from "react";
const EventDetails = () => {
  const { eventid } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { isLoading, fetchElement } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchElement(eventid, "event");
      if (!response) {
        return;
      }
      setValue("title", response.title);
      setValue("startDate", response.startDate);
      setValue("endDate", response.endDate);
      setValue("address", response.address);
      setValue("orgName", response.orgName);
      setValue("desc", response.desc);
      setValue("orgOwnerName", response.orgOwnerName);
      setValue("LogoImage", response.logo);
      let imar = response?.images?.map((item) => item.img);
      setValue("Images", imar);
    };
    fetch();
  }, [fetchElement, eventid, setValue]);
  const navigate = useNavigate();
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:flex-row md:justify-center items-center py-8`}
    >
      <div className="w-full md:w-[40%] md:m-10 flex flex-col justify-center items-center">
        <img
          src={images.admin_image}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] mb-8 md:mt-0"
        />
        <p className="text-right fontBold w-[80%] md:w-[90%] mb-5 text-white text-sm md:text-lg">
          تظهر لك تفاصيل الحدث، الحدث سيلغى تلقائياً عند انقطاع مدة الحدث، يمكنك
          حذف الحدث و لا يمكنك تعديله
        </p>
      </div>
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          تفاصيل الحدث
        </p>
        <form className="w-full">
          <div className="w-full flex items-start justify-center">
            <InputField
              headerText="اسم منظم الحدث"
              register={register("orgOwnerName")}
              disable={true}
              customStyleComponent="mr-2"
            />
            <InputField
              headerText="اسم الحدث"
              register={register("title")}
              disable={true}
            />
          </div>
          <InputField
            headerText="اسم المنظمة"
            register={register("orgName")}
            disable={true}
          />
          <InputField
            type="datetime-local"
            headerText="بداية الحدث"
            register={register("startDate")}
            disable={true}
          />
          <InputField
            type="datetime-local"
            headerText="نهاية الحدث "
            register={register("endDate")}
            disable={true}
          />

          <InputField
            headerText="العنوان"
            register={register("address")}
            disable={true}
          />
          <textarea
            className="w-full fontReg outline-none min-h-40 resize-none rounded-xl bg-[#1a202c] bg-opacity-80 text-right p-4 text-green-300 text-sm md:text-lg"
            {...register("desc")}
            disabled={true}
          />
          {watch("Images") && watch("Images").length > 0 && (
            <div className="w-full border-t-[3px] border-orange-400 mt-2 pt-1 flex flex-col items-center">
              <p className="text-sm fontReg md:text-lg text-white bg-orange-400 w-full rounded-b-lg text-center mb-2">
                الصور
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
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
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
