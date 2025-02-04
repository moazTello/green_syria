import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../components/fields/InputField";
import useStore from "../zustand/useStore";
import CustomButton from "../components/fields/CustomButton";
import ImageUploader from "../components/fields/ImageUploader";

const AddVolunteer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
      } = useForm();
      const { isLoading, addVolunteer } = useStore();
      const navigate = useNavigate();
      const onSubmit = async (data) => {
        if (data.password !== data.password_confirmation) {
          return toast.error("تأكد من كلمة المرور");
        }
        if(data.password.length < 8){
          return toast.error("كلمة المرور يجب ان تكون ٨ أحرف على الأقل");
        }
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("email", data.email);
        formData.append("address", data.address);
        formData.append("phone", data.phone);
        formData.append("desc", data.desc);
        data.LogoImage && formData.append("logo", data.LogoImage);
        try {
          const response = await addVolunteer(formData);
          if (response?.status === 201) {
            toast.success("تم إضافة متطوع جديد بنجاح");
            navigate("/green_syria/dashboard");
          }
          if(response?.response?.data?.message === "The email has already been taken."){
            toast.error("البريد الالكتروني مستخدم مسبقاً يرجى اختيار بريد الكتروني آخر ");
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
              src={images.admin_image}
              alt="logo"
              className="rounded-[5%] w-[50%] md:w-[80%] mt-4 md:my-0"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col px-2 md:px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
            <p className="fontBold text-white text-lg md:text-2xl my-6">
              إضافة متطوع جديد
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
              <InputField
                headerText="الوصف"
                error={errors?.desc?.message}
                register={register("desc", {
                  required: "الوصف مطلوب",
                })}
                placeholder="إضافة وصف مختصر"
                isRequired={true}
              />
              <ImageUploader
                register={register}
                watch={watch}
                errors={errors}
                setValue={setValue}
                logo={true}
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
}

export default AddVolunteer