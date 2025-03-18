import React, { useEffect } from "react";
import { images } from "../constants";
import useStore from "../zustand/useStore";
const Home = () => {
  const { fetchHomeDataStatistics, homeDataStatistics } = useStore();
  useEffect(() => {
    fetchHomeDataStatistics();
  }, [fetchHomeDataStatistics]);
  return (
    <div className="bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh]">
      <div className="w-full flex flex-col md:flex-row items-start justify-between pt-10">
        <div className="w-full md:w-[50%] flex flex-col justify-center items-center mt-5 md:mt-36">
          <p className="text-white fontBold text-xl md:text-4xl mb-5">شكراً</p>
          <p className="text-slate-50 fontBold text-sm md:text-lg mb-5">
            للكادر الداعم لهذا المشروع
          </p>
          <p className="text-right fontReg w-[80%] md:w-[80%] my-2 text-white text-sm md:text-lg">
            يهدف هذا المشروع إلى تعزيز الوعي البيئي والمساهمة في تحسين البيئة
            المحلية من خلال تطبيق موبايل مبتكر وداش بورد للتحكم والإدارة. يقوم
            هذا التطبيق بربط بين ثلاثة أطراف رئيسية: المشاتل التي تتبرع
            بالأشجار، المتطوعين الذين يشاركون في الأنشطة البيئية، والمستخدمين
            الذين يساهمون بإضافة أماكن تحتاج إلى زراعة الأشجار أو تنظيف المناطق
            العامة
          </p>
          <p className="text-slate-50 fontBold text-sm md:text-lg my-16">
            إحصائيات
          </p>
          <div className="flex w-full flex-col items-center">
            <div className="w-[60%] flex flex-col p-10 bg-blue-500 rounded-2xl justify-center items-center border-white border-2 my-2">
              <p className="text-white fontBold text-sm md:text-lg my-1">
                عدد المشاتل
              </p>
              <p className="text-white fontBold text-sm md:text-lg my-1">{homeDataStatistics.planstores}</p>
            </div>
            <div className="w-[60%] flex flex-col p-10 bg-violet-500 rounded-2xl justify-center items-center border-white border-2 my-2">
              <p className="text-white fontBold text-sm md:text-lg my-1">
                عدد المتطوعين
              </p>
              <p className="text-white fontBold text-sm md:text-lg my-1">{homeDataStatistics.volunteers}</p>
            </div>
            <div className="w-[60%] flex flex-col p-10 bg-orange-500 rounded-2xl justify-center items-center border-white border-2 my-2">
              <p className="text-white fontBold text-sm md:text-lg my-1">
                عدد الأعمال المكتملة
              </p>
              <p className="text-white fontBold text-sm md:text-lg my-1">{homeDataStatistics.doneWork}</p>
            </div>
            <div className="w-[60%] flex flex-col p-10 bg-red-500 rounded-2xl justify-center items-center border-white border-2 my-2">
              <p className="text-white fontBold text-sm md:text-lg my-1">
                عدد الأشجار المزروعة
              </p>
              <p className="text-white fontBold text-sm md:text-lg my-1">{homeDataStatistics.doneTree}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] md:m-10 flex flex-col justify-center items-center">
          <img
            src={images.plant_store_hight}
            alt="logo"
            className="rounded-[5%] w-[50%] md:w-[80%] mt-4 md:my-0"
          />
          <p className="text-center fontBold w-[80%] md:w-[90%] my-5 text-white text-lg md:text-xl">
            سوريا الخضراء
          </p>
          <p className="text-right fontReg w-[80%] md:w-[100%] my-2 text-white text-sm md:text-lg">
            <strong> : المكونات الرئيسية للمشروع</strong>
            <br />
            <strong> : المشاتل</strong>
            <ul>
              <li>
                توفر المشاتل الأشجار كتبرعات، مما يساهم في نشر الوعي حول أهمية
                الزراعة والحفاظ على البيئة
              </li>
              <li>
                يتم تسجيل المشاتل في التطبيق وتتمكن من متابعة عمليات التبرع
                بالأشجار وتنظيم توزيعاتها على المهام المحددة
              </li>
            </ul>
            <br />
            <strong> : المتطوعون</strong>
            <ul>
              <li>
                يقوم المتطوعون بالتسجيل في التطبيق والمشاركة في الأنشطة
                الميدانية مثل زراعة الأشجار وتنظيف الأماكن العامة
              </li>
              <li>
                يتم تحديد المهام وفقًا للمناطق التي تحتاج إلى العمل، ويتلقى
                المتطوعون إشعارات بالمهام المتاحة لهم
              </li>
            </ul>
            <br />
            <strong> : المستخدمون</strong>
            <ul>
              <li>
                يتيح التطبيق للمستخدمين إضافة أماكن تحتاج إلى تنظيف أو زراعة
                الأشجار، مما يعزز من دورهم في تحسين البيئة المحيطة بهم
              </li>
              <li>
                يمكن للمستخدمين رؤية التقدم الذي يتم إحرازه في تنفيذ المهام
                وإضافة مقترحات جديدة للمساعدة في تحديد الأماكن التي تحتاج إلى
                اهتمام
              </li>
            </ul>
            <br />
            <strong> : الداش بورد</strong>
            <ul>
              <li>
                يوفر الداش بورد لوحة تحكم متكاملة للإدارة والمراقبة، حيث يمكن
                لمشرفي التطبيق تتبع التبرعات، إدارة المهام، والتأكد من سير العمل
                بكفاءة
              </li>
              <li>
                يتضمن الداش بورد أيضًا تقارير تفصيلية حول عدد الأشجار المزروعة،
                الأنشطة التي تمت، وعدد المتطوعين المشاركين
              </li>
            </ul>
            <br />
            <strong> : الرؤية</strong>
            <p>
              يطمح هذا المشروع إلى خلق شبكة من المتطوعين والمشاتل والمستخدمين
              الذين يعملون معًا لتعزيز الاستدامة البيئية، مما يسهم في تحسين
              جمالية البيئة وتقليل التلوث وزيادة المساحات الخضراء في المدن
              والمناطق الحضرية
            </p>
            <br />
            <strong> : الفائدة المجتمعية</strong>
            <ul>
              <li>تحسين البيئة وزيادة المساحات الخضراء</li>
              <li>
                تحفيز المشاركة المجتمعية من خلال تعزيز دور الأفراد في الحفاظ على
                البيئة
              </li>
              <li>توفير منصة مهنية لربط المتطوعين بالمشاريع البيئية المحلية</li>
            </ul>
            <br />
            <strong> : التقنية</strong>
            <p>
              يتم استخدام تطبيق موبايل سهل الاستخدام وداش بورد قوي يتيح إدارة
              وتنظيم كافة الأنشطة والمهام البيئية بكفاءة عالية
            </p>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
