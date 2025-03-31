import React from "react";
// import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="z-50 w-full fontReg min-h-28 bg-[#1a202c] relative text-white shadow-lg backdrop-blur-s flex flex-col justify-center items-center py-5">
      {/* <p className='m-2 text-sm md:text-lg text-center'>&#9426; جميع الحقوق محفوظة لتطبيق غرين سيريا &nbsp; &nbsp;   2024 - 2025</p> */}
      <div className="flex items-center justify-center flex-col md:flex-row-reverse">
        <p className="m-2 text-sm md:text-lg text-center">
          جميع الحقوق محفوظة لتطبيق غرين سيريا
        </p>
        <p className="m-2 text-sm md:text-lg text-center">
          &#9426; &nbsp; 2025
        </p>
      </div>
      <a
        href="https://totolmedia.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover:text-orange-500 justify-center flex-col md:flex-row-reverse pb-1"
      >
        <p className="m-2 text-sm md:text-lg text-center">تصميم و تنفيذ</p>
        <p className="m-2 text-sm md:text-lg text-center">
          شركة توتول ميديا للخدمات البرمجية
        </p>
      </a>
      {/* <a className='pb-1 hover:text-orange-500 text-sm md:text-lg text-center' href="https://totolmedia.com/" target="_blank" rel="noopener noreferrer">تصميم و تنفيذ شركة توتول ميديا للخدمات البرمجية </a> */}
    </div>
  );
};

export default Footer;
