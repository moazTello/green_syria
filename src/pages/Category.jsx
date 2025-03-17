import React, { useEffect } from "react";
import { BiSolidMessageCheck } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import useStore from "../zustand/useStore";
import ArticleItem from "../components/ArticleItem";
const Category = () => {
  const { categoryid } = useParams();
  const { fetchArticlesList, articlesList } = useStore();
  useEffect(() => {
    fetchArticlesList(categoryid);
  }, [fetchArticlesList, categoryid]);
  const value = 4;
  return (
    <div className="bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex justify-between items-center mt-10 px-5 md:px-10">
          <BiSolidMessageCheck className="text-white text-2xl md:text-6xl" />
          <p className="text-white text-right w-full text-xl md:text-4xl">
            هنا المقالات
          </p>
        </div>
        <p className="text-slate-50 text-sm w-full px-8 md:px-16 my-2 md:my-4 md:text-lg text-right">
          يمكن لكادر العمل إضافة المقالات التوعوية لتظهر في التطبيق لدى
          المستخدمين
        </p>
      </div>
      <Link
        to={`/green_syria/dashboard/categories/${categoryid}/addArticle`}
        className="my-2 md:my-5 bg-slate-50 w-[80%] text-center rounded-lg p-2 md:p-4 text-sm md:text-lg text-green-600 hover:bg-yellow-50"
      >
        إضافة مقال جديد
      </Link>
      <div className="w-full flex justify-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${value}`}
        >
          {articlesList?.length > 0 &&
            articlesList?.map((article, index) => (
              <ArticleItem key={index} data={article} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
