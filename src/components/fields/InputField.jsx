import React from 'react';

const InputField = ({
  value,
  onChange,
  headerText,
  placeholder,
  error,
  customStyleHeader,
  customStyleInput,
  customStyleComponent,
  register,
  isRequired,
  type,
  disable
}) => {
  return (
    <div className={`w-full fontReg flex flex-col justify-center items-end my-2 ${customStyleComponent}`}>
      {headerText && (
        <p className={`text-[#ffffff] fontReg text-sm md:text-lg mr-2 ${customStyleHeader}`}>
          {isRequired && <span className="text-red-500"> * </span>} {headerText} 
        </p>
      )}
      <input type={type && type} disabled={disable} required={isRequired} placeholder={placeholder} className={`text-sm fontReg md:text-lg text-right p-1 py-2 w-full mt-2 outline-none rounded-lg text-green-600 bg-[#FFFFFF] bg-opacity-80 pr-3 ${customStyleInput}`} {...register} />
      {error && <p className='text-sm fontReg text-red-500 mt-1 rounded-lg bg-slate-100 px-1'>{error}</p>}
    </div>
  );
};

export default InputField;
