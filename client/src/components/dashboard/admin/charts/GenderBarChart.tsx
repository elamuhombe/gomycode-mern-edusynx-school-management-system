import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js/auto';

const GenderBarChart: React.FC = () => {
  const [genderData, setGenderData] = useState<{ boys: number; girls: number }>({ boys: 0, girls: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const response = await fetch('http://localhost:5100/student'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const students = await response.json();

        // Aggregate data based on gender
        const boysCount = students.filter((student: any) => student.gender === 'boys').length;
        const girlsCount = students.filter((student: any) => student.gender === 'girls').length;

        // Update the state with aggregated data
        setGenderData({ boys: boysCount, girls: girlsCount });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data: ChartData<'bar', number[], string> = {
    labels: ['Boys', 'Girls'],
    datasets: [
      {
        label: 'Number of Students',
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [genderData.boys, genderData.girls],
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      y: {
        type: 'linear',
        min: 10, // Start y-axis from 100
      },
      x: {
        type: 'category', // Use category scale for labels
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GenderBarChart;
