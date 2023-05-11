import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function App() {
  const [options, setOptions] = useState({
    Chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "a",
      data: [10, 20, 30, 40, 50],
    },
    {
      name: "b",
      data: [55, 45, 35, 25, 15],
    },
  ]);

  useEffect(() => {
    const sDate = new Date()
    const day = sDate.getDate() - 7
    console.log(day);
    console.log(sDate);
    sDate.setDate(day)
    const startDateStr = sDate.toISOString().slice(0,10)
    fetch("https://www.melivecode.com/api/pets/7days/" + startDateStr)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setOptions({
          ...options,
          xaxis: {
            categories: result.categories
          }
        })
        setSeries(result.series)
      });
  }, []);

  return (
    <div>
      <p>My Chart</p>
      <Chart options={options} series={series} type="bar" />
    </div>
  );
}

export default App;
