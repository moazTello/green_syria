import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import ImageUploader from "../components/fields/ImageUploader";
import { useEffect } from "react";
import moment from "moment";
const DetailsArticle = () => {
  const { articleid } = useParams();
  const { register, setValue, watch } = useForm();
  const { fetchElement } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchElement(articleid, "art");
      if (!response) {
        return;
      }
      setValue("title", response.title);
      setValue("desc", response.desc);
      setValue("createdAt", moment(response.createdAt).format("YYYY-MM-DDTHH:mm:ss.SSS"));
      let imar = response?.images?.map((item) => item.img);
      setValue("Images", imar);
    };
    fetch();
  }, [fetchElement, articleid, setValue]);
  return (
    <div
      className={`bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] w-full flex flex-col md:flex-row-reverse md:justify-center items-start py-8`}
    >
      <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
        <p className="fontBold text-white text-lg md:text-2xl my-6">
          تفاصيل المقال
        </p>
        <form className="w-full">
          <InputField
            headerText="عنوان المقال"
            register={register("title")}
            disable={true}
          />
          <InputField
            type="datetime-local"
            headerText="تاريخ الانشاء"
            register={register("createdAt")}
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

export default DetailsArticle;
