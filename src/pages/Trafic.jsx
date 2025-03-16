import React, { useEffect, useRef, useMemo, useState } from "react";
import { Chart } from "chart.js/auto";
import useStore from "../zustand/useStore";
import { images } from "../constants";
import CustomButton from "../components/fields/CustomButton";
const Trafic = () => {
  const { getTrafics, trafics } = useStore();
  const [statisticsType, setStatisticsType] = useState(0);
  const [statisticsTypeColor, setStatisticsTypeColor] = useState("#6BC775");
  const [statisticsTypeColorBack, setStatisticsTypeColorBack] =
    useState("#ffffff");
  const [statisticsTypeColorShadow, setStatisticsTypeColorShadow] =
    useState("#DDF1E5");
  const [statisticsTypeWidth, setStatisticsTypeWidth] = useState(1);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [traficYearData, setTraficYearData] = useState([]);
  const [traficMonthData, setTraficMonthData] = useState([]);

  const arabicMonths = {
    "01": "يناير",
    "02": "فبراير",
    "03": "مارس",
    "04": "أبريل",
    "05": "مايو",
    "06": "يونيو",
    "07": "يوليو",
    "08": "أغسطس",
    "09": "سبتمبر",
    10: "أكتوبر",
    11: "نوفمبر",
    12: "ديسمبر",
  };

  useEffect(() => {
    getTrafics();
  }, [getTrafics]);

  useEffect(() => {
    if (!trafics || trafics.length === 0) return;

    const years = trafics.map((item) => `20${item.year}`);
    setAvailableYears(years);
    setSelectedYear(years[0]);

    if (trafics[0]?.months) {
      const months = trafics[0].months.map((month) => ({
        value: month.month,
        label:
          arabicMonths[month.month.toString().padStart(2, "0")] || month.month,
      }));
      setAvailableMonths(months);
      setSelectedMonth(months[0]?.value);
    }
    // eslint-disable-next-line
  }, [trafics]);

  useEffect(() => {
    if (!selectedYear || !trafics) return;

    const yearData = trafics.find((item) => `20${item.year}` === selectedYear);
    if (yearData) {
      const monthsData = yearData.months;
      setTraficYearData({
        labels: monthsData.map(
          (month) =>
            arabicMonths[month.month.toString().padStart(2, "0")] || month.month
        ),
        unique: monthsData.map((month) => month.firstTime),
        total: monthsData.map((month) => month.allTime),
      });

      const selectedMonthData = monthsData.find(
        (month) => month.month === selectedMonth
      );
      if (selectedMonthData) {
        setTraficMonthData({
          labels: selectedMonthData.days.map((day) => day.day),
          unique: selectedMonthData.days.map((day) => day.firstTime),
          total: selectedMonthData.days.map((day) => day.allTime),
        });
      }
    }
    // eslint-disable-next-line
  }, [selectedYear, selectedMonth, trafics]);

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const chartRefs = useRef([]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: statisticsTypeColor,
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: statisticsTypeColor,
          },
        },
      },
    }),
    [statisticsTypeColor]
  );

  const chartData = useMemo(
    () => [
      {
        title: "المستخدمين الجدد خلال شهر على التطبيق",
        subtitle: `الزيارات للسنة ${selectedYear ? selectedYear : ""}`,
        // labels: traficYearData.labels,
        labels: [
          23, 34, 45, 56, 67, 78, 89, 90, 34, 67, 43, 98, 32, 34, 45, 67, 89,
          87, 89, 54, 12, 45, 67, 78, 54, 67, 89, 87, 65, 43, 32,
        ],
        datasets: [
          {
            label: "المستخدمين الجدد",
            data: [
              23, 34, 45, 56, 67, 78, 89, 90, 34, 67, 43, 98, 32, 34, 45, 67,
              89, 87, 89, 54, 12, 45, 67, 78, 54, 67, 89, 87, 65, 43, 32,
            ],
            // data: traficYearData.unique,
            borderColor: statisticsTypeColor,
            backgroundColor: statisticsTypeColorShadow,
            borderWidth: statisticsTypeWidth,
            tension: 0.3,
            fill: true,
            // borderRadius: 9,
          },
        ],
      },
      {
        title: "الزيارات الشهرية على التطبيق",
        subtitle: `الزيارات للسنة ${selectedYear ? selectedYear : ""}`,
        labels: traficYearData.labels,
        datasets: [
          {
            label: "الزيارات",
            data: traficYearData.total,
            borderColor: "#EBBF36",
            backgroundColor: "rgba(172, 187, 180, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      {
        title: "المستخدمين الجدد خلال اليوم على التطبيق",
        subtitle: `الزيارات للشهر ${
          availableMonths.find((m) => m.value === selectedMonth)?.label || ""
        }`,
        labels: traficMonthData.labels,
        datasets: [
          {
            label: "المستخدمين الجدد",
            data: traficMonthData.unique,
            borderColor: "#33663b",
            backgroundColor: "rgba(12, 225, 120, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      {
        title: "الزيارات اليومية على التطبيق",
        subtitle: `الزيارات للشهر ${
          availableMonths.find((m) => m.value === selectedMonth)?.label || ""
        }`,
        labels: traficMonthData.labels,
        textColor: "#EBBF36",
        datasets: [
          {
            label: "الزيارات",
            data: traficMonthData.total,
            borderColor: "#EBBF36",
            backgroundColor: "rgba(172, 187, 180, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
    ],
    [
      traficYearData,
      traficMonthData,
      selectedYear,
      selectedMonth,
      availableMonths,
      statisticsTypeColor,
      statisticsTypeColorShadow,
      statisticsTypeWidth,
    ]
  );

  useEffect(() => {
    const charts = chartRefs.current.map((ref, index) => {
      if (ref) {
        const ctx = ref.getContext("2d");
        return new Chart(ctx, {
          type:
            statisticsType === 0
              ? "bar"
              : statisticsType === 1
              ? "line"
              : statisticsType === 2
              ? "pie"
              : statisticsType === 3
              ? "doughnut"
              : "bubble",
          // type: "line",
          // type: "radar",
          // type: "doughnut",
          // type: "pie",
          // type: "polarArea",
          // type: "bubble",
          // type: "scatter",
          data: chartData[index],
          options: chartOptions,
        });
      }
      return null;
    });

    return () => {
      charts.forEach((chart) => chart && chart.destroy());
    };
  }, [chartData, chartOptions, statisticsType]);
  const statValue = () => {
    if (statisticsType === 3) {
      setStatisticsType(0);
    } else {
      setStatisticsType((old) => old + 1);
    }
  };

  const widthValue = () => {
    if (statisticsTypeWidth === 7) {
      setStatisticsTypeWidth(1);
    } else {
      setStatisticsTypeWidth((old) => old + 1);
    }
  };

  return (
    <div className="w-full h-fit py-8  bg-gradient-to-t from-[#33663b] to-[#55B063] min-h-[100vh] flex flex-col-reverse md:flex-row md:items-start items-center">
      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="w-full flex flex-col p-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-2xl p-5 md:p-7 m-2  float-start"
            >
              <div className="mb-5 p-5">
                <div className="flex flex-col items-end">
                  <h2 className="text-lg w-full text-right fontReg font-bold text-green-500 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-green-600 fontReg">{item.subtitle}</p>
                </div>
              </div>
              <div className="w-full min-h-[300px] h-[300px]">
                <canvas
                  // className="bg-orange-100"
                  style={{ backgroundColor: statisticsTypeColorBack }}
                  ref={(el) => (chartRefs.current[index] = el)}
                ></canvas>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[80%] md:w-[30%]  md:m-10 flex flex-col justify-start items-center">
        <p className="text-right fontReg w-[80%] md:w-[90%] my-5 text-white text-sm md:text-lg">
          هنا تظهر لك بعض الإحصائيات لمعدل زيارات المستخدمين على التطبيق، يمكنك
          اختيار الشهر او السنة لرؤية الإحصائيات المتعلقة بها
        </p>
        <div className="w-full md:w-[50%] flex justify-center items-center gap-4 mb-4">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 rounded-md"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="p-2 rounded-md"
          >
            {availableMonths.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <img
          src={images.statistics}
          alt="logo"
          className="rounded-[5%] w-[50%] md:w-[80%] my-4 md:my-0 bg-white"
        />
        <CustomButton
          onClick={statValue}
          buttonText="تغيير نمط الإحصائية"
          customStyle
          type="button"
        />
        <div className="flex flex-row w-[80%] items-center">
          <input
            type="color"
            onChange={(e) => setStatisticsTypeColor(e.target.value)}
            value={statisticsTypeColor}
          />
          <p className="text-right fontReg w-[80%] md:w-[90%] my-5 text-white text-sm md:text-lg">
            لون الأعمدة
          </p>
        </div>
        <div className="flex flex-row w-[80%] items-center">
          <input
            type="color"
            onChange={(e) => setStatisticsTypeColorShadow(e.target.value)}
            value={statisticsTypeColorShadow}
          />
          <p className="text-right fontReg w-[80%] md:w-[90%] my-5 text-white text-sm md:text-lg">
            لون ظل الأعمدة
          </p>
        </div>
        <div className="flex flex-row w-[80%] items-center">
          <input
            type="color"
            onChange={(e) => setStatisticsTypeColorBack(e.target.value)}
            value={statisticsTypeColorBack}
          />
          <p className="text-right fontReg w-[80%] md:w-[90%] my-5 text-white text-sm md:text-lg">
            لون خلفية الإحصائية
          </p>
        </div>
        <CustomButton
          onClick={widthValue}
          buttonText="تغيير سماكة العمود"
          customStyle
          type="button"
        />
      </div>
    </div>
  );
};

export default Trafic;
