import DateNavHeader from "components/DateNavHeader/DateNavHeader";
import Card from "components/common/Card";
import moment from "moment-jalaali";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

export const MyDiagram = () => {
  // Data for the pie chart
  const today = new Date();

  const [date, setDate] = useState(moment(today).format("jYYYY-jMM-jDD"));

  const x = JSON.parse(localStorage.getItem("users"));
  const Users = x?.filter((res) => res?.Date == date)[0]?.persons;
  const Attendance = Users.map((el) => el.Attendance);
  console.log("infoinfo", Attendance);
  const navigate = useNavigate();
  let leave = 0;
  let presence = 0;
  let mission = 0;
  let absence = 0;
  for (let index = 0; index < Attendance.length; index++) {
    if (Attendance[index] === "مرخصی") {
      leave++;
      continue;
    }
    if (Attendance[index] === "حضور") {
      presence++;
      continue;
    }
    if (Attendance[index] === "ماموریت") {
      mission++;
      continue;
    }
    if (Attendance[index] === "غیبت") {
      absence++;
      continue;
    }
  }

  const chartData = {
    // series: [leave, presence, mission, absence],
    series: [absence, presence, leave, mission],
    options: {
      chart: {
        type: "donut",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const clickedSeriesValue =
              chartData.options.labels[config.dataPointIndex];
            console.log(`Clicked series value: ${clickedSeriesValue}`);
            if (clickedSeriesValue == "مرخصی") {
              navigate("/diagram/leave", {
                state: { Title: "مرخصی", date: date },
              });
            } else if (clickedSeriesValue == "ماموریت") {
              navigate("/diagram/mission", {
                state: { Title: "ماموریت", date: date },
              });
            } else if (clickedSeriesValue == "حضور") {
              navigate("/diagram/present", {
                state: { Title: "حضور", date: date },
              });
            } else if (clickedSeriesValue == "غیبت") {
              navigate("/diagram/absence", {
                state: { Title: "غیبت", date: date },
              });
            }
          },
        },
        style: {
          fontFamily: "Yekan Bach", // Specify your font family
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "55%",
          },
          dataLabels: {
            formatter: function (val) {
              return val + " نفر"; // Add ' نفر' to the label
            },
          },
          style: {
            fontFamily: "Yekan Bach", // Specify your font family
          },
        },
      },

      labels: ["غیبت", "حضور", "مرخصی", "ماموریت"],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          console.log("opts.w.config", opts.w.config.series[opts.seriesIndex]);
          return (
            opts.w.config.labels[opts.seriesIndex] +
            ": " +
            `${opts.w.config.series[opts.seriesIndex]} نفر`
          );
        },
        style: {
          fontFamily: "Yekan Bach", // Specify your font family
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  const getDate = (date) => {
    console.log("date", date);
    setDate(date);
    localStorage.setItem("date",date);
  };
  return (
    <div>
      <DateNavHeader getDate={getDate} />

      <Card height="calc(100vh - 400px)" margin="24px 0 0 0">
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={350}
          />
        </div>
      </Card>
    </div>
  );
};
