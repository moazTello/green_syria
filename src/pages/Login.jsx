// import React, { useState } from "react";
// import { images } from "../constants";
// import InputField from "../components/fields/InputField";
// import CustomButton from "../components/fields/CustomButton";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { axiosPrivate } from "../api/DataTransfer";
// import useStore from "../zustand/useStore";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { setUser, setToken } = useStore();
//   const [loading, setLoading] = useState();
//   const navigate = useNavigate();
//   const [type, setType] = useState(false);
//   const onSubmit = async (data) => {
//     setLoading(true);
//     if (data.userName !== "" && data.password !== "") {
//       try {
//         const response = type
//           ? await axiosPrivate.post("/api/admin/login", {
//               email: data.userName,
//               password: data.password,
//             })
//           : await axiosPrivate.post("/api/admin/assAdmin/login", {
//               email: data.userName,
//               password: data.password,
//             });
//         setToken(response?.data?.token);
//         const user = {
//           user: response?.data?.response?.profile,
//         };
//         setUser(user);
//         sessionStorage.setItem("accessT", response.data.token);
//         sessionStorage.setItem("user", JSON.stringify(user));
//         toast.success("تم تسجيل الدخول بنجاح");
//         navigate("/green_syria/dashboard");
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//         toast.error("البريد أو كلمة المرور غير صحيحة");
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       className={`bg-[#55B063] min-h-[100vh] w-full flex flex-col  md:flex-row md:justify-center items-center`}
//     >
//       <div className="w-full md:w-[40%] md:m-10 flex justify-center items-center">
//         <img
//           src={images.loginLogo}
//           alt="logo"
//           className="rounded-[5%] w-[50%] md:w-[80%] my-8 md:my-0"
//         />
//       </div>
//       <div className="w-full md:w-[50%] flex flex-col px-10 hover:shadow-3xl py-5 hover:shadow-yellow-50 justify-center items-center bg-[rgba(255,255,255,20%)] rounded-2xl">
//         <p className="fontBold text-white text-lg md:text-2xl my-10">
//           تسجيل الدخول
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full">
//           <InputField
//             headerText="البريد الالكتروني"
//             // placeholder="ادخل البريد الإلكتروني"
//             error={errors?.userName?.message}
//             register={register("userName", {
//               required: "البريد الالكتروني مطلوب",
//             })}
//             isRequired={true}
//             type="email"
//           />
//           <InputField
//             headerText="كلمة المرور"
//             //   placeholder="ادخل البريد الإلكتروني"
//             error={errors?.password?.message}
//             register={register("password", { required: "كلمة المرور مطلوبة" })}
//             type="password"
//             isRequired={true}
//           />
//           <div className="w-full flex justify-end items-center px-2 py-4">
//             <p className="text-white fontReg text-sm md:text-lg px-3">هل انت الآدمن الرئيسي ؟</p>
//             <input
//               onChange={(e) => setType(e.target.checked)}
//               type="checkbox"
//               className="w-4 h-4 mr-2 md:w-6 md:h-6"
//             />
//           </div>
//           <CustomButton
//             buttonText="تسجيل الدخول"
//             customStyle
//             type="submit"
//             loading={loading}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { images } from "../constants";
import InputField from "../components/fields/InputField";
import CustomButton from "../components/fields/CustomButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosPrivate } from "../api/DataTransfer";
import useStore from "../zustand/useStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser, setToken } = useStore();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [type, setType] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.userName !== "" && data.password !== "") {
      try {
        const response = type
          ? await axiosPrivate.post("/api/admin/login", {
              email: data.userName,
              password: data.password,
            })
          : await axiosPrivate.post("/api/admin/assAdmin/login", {
              email: data.userName,
              password: data.password,
            });
        setToken(response?.data?.token);
        const user = {
          user: response?.data?.response?.profile,
        };
        setUser(user);
        sessionStorage.setItem("accessT", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("تم تسجيل الدخول بنجاح");
        navigate("/green_syria/dashboard");
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error("البريد أو كلمة المرور غير صحيحة");
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-green-300 to-green-800 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl mx-4 md:mx-0 p-4 md:p-8 max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <img
            src={images.loginLogo}
            alt="logo"
            className="w-40 md:w-56"
          />
        </div>
        {/* <p className="text-center text-xl font-semibold text-green-700 mb-8">
          تسجيل الدخول
        </p> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            headerText="البريد الالكتروني"
            error={errors?.userName?.message}
            register={register("userName", {
              required: "البريد الالكتروني مطلوب",
            })}
            type="email"
            customStyleHeader="text-orange-700"
            isRequired={true}
            customStyleInput="border-[1px] border-orange-700"
          />
          <InputField
            headerText="كلمة المرور"
            error={errors?.password?.message}
            register={register("password", { required: "كلمة المرور مطلوبة" })}
            type="password"
            isRequired={true}
            customStyleHeader="text-orange-700"
            customStyleInput="border-[1px] border-orange-700"
          />
            <div className="flex items-center justify-end">
              <p className="text-gray-500 text-sm md:text-base mr-2">
                هل انت الآدمن الرئيسي ؟
              </p>
              <input
                type="checkbox"
                onChange={(e) => setType(e.target.checked)}
                className="w-4 h-4 md:w-5 md:h-5 text-green-500 focus:ring-0"
              />
            </div>
          <CustomButton
            buttonText="تسجيل الدخول"
            customStyle="w-full bg-green-600 hover:bg-green-700 focus:outline-none text-white font-semibold rounded-md"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

