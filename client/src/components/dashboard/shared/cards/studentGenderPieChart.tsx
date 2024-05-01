import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const StudentGenderPieChart: React.FC = () => {
  const [boysCount, setBoysCount] = useState<number>(0);
  const [girlsCount, setGirlsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/students/countStudentsByGender`
        );
        const data = await response.json();
        setBoysCount(data.boys);
        setGirlsCount(data.girls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && chartRef.current) {
      const ctx = chartRef.current;
      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Boys", "Girls"],
          datasets: [
            {
              data: [boysCount, girlsCount],
              backgroundColor: ["blue", "pink"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [boysCount, girlsCount, loading]);

  return (
    <div id="chartContainer" style={{ maxWidth: "400px", margin: "auto" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <canvas
          id="myPieChart"
          width="400"
          height="400"
          ref={chartRef}></canvas>
      )}
    </div>
  );
};

export default StudentGenderPieChart;
